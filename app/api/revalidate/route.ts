import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

// Helper function to verify Contentful webhook signature
function verifyContentfulWebhook(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(rawBody);
  const calculatedSignature = hmac.digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(calculatedSignature)
  );
}

// Helper function to get the path to revalidate based on Contentful entry
function getPathToRevalidate(
  contentType: string,
  slug: string | undefined
): string {
  switch (contentType) {
    case "dynamicPage":
      return slug ? `/${slug}` : "/";
    case "landingPage":
      return "/";
    case "blogPost":
      return slug ? `/blog/${slug}` : "/blog";
    default:
      return "/";
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("🔹 Webhook received");

    // Get the raw body and signature
    const rawBody = await request.text();
    console.log("🔹 Raw body:", rawBody);

    const signature = request.headers.get("x-contentful-signature");
    console.log("🔹 Signature:", signature);

    const webhookSecret = process.env.CONTENTFUL_WEBHOOK_SECRET;
    console.log(
      "🔹 Webhook Secret (env):",
      webhookSecret ? "Loaded" : "Not Found"
    );

    // Verify webhook secret is configured
    if (!webhookSecret) {
      console.error("❌ CONTENTFUL_WEBHOOK_SECRET is not configured");
      return NextResponse.json(
        { message: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Verify signature
    if (!signature) {
      console.error("❌ Missing signature");
      return NextResponse.json(
        { message: "Missing signature" },
        { status: 401 }
      );
    }

    if (!verifyContentfulWebhook(rawBody, signature, webhookSecret)) {
      console.error("❌ Invalid signature");
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    console.log("✅ Signature verified successfully");

    // Parse the webhook payload
    const payload = JSON.parse(rawBody);
    console.log("🔹 Parsed payload:", payload);

    const contentType = payload.sys?.contentType?.sys?.id;
    const slug = payload.fields?.slug?.[payload.sys?.locale || "en-US"];
    console.log("🔹 ContentType:", contentType);
    console.log("🔹 Slug:", slug);

    // Get the path to revalidate
    const path = getPathToRevalidate(contentType, slug);
    console.log("🔹 Revalidating path:", path);

    // Revalidate the path
    revalidatePath(path);
    console.log("✅ Path revalidated:", path);

    // Also revalidate the homepage as it might show excerpts/links
    if (path !== "/") {
      revalidatePath("/");
      console.log("✅ Homepage revalidated");
    }

    return NextResponse.json(
      {
        message: "Revalidation successful",
        revalidated: path,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Revalidation error:", error);
    return NextResponse.json(
      { message: "Error processing webhook", error: String(error) },
      { status: 500 }
    );
  }
}

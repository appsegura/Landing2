import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

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
    // Get the raw body and signature
    const rawBody = await request.text();

    const signature = request.headers.get("x-contentful-signature");

    const webhookSecret = process.env.CONTENTFUL_WEBHOOK_SECRET;

    // Verify webhook secret is configured
    if (!webhookSecret) {
      return NextResponse.json(
        { message: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Verify signature matches the static token
    if (signature !== webhookSecret) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    // Parse the webhook payload
    const payload = JSON.parse(rawBody);

    const contentType = payload.sys?.contentType?.sys?.id;
    const slug = payload.fields?.slug?.[payload.sys?.locale || "en-US"];

    // Get the path to revalidate
    const path = getPathToRevalidate(contentType, slug);

    // Revalidate the path
    revalidatePath(path);

    // Also revalidate the homepage as it might show excerpts/links
    if (path !== "/") {
      revalidatePath("/");
    }

    return NextResponse.json(
      {
        message: "Revalidation successful",
        revalidated: path,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing webhook", error: String(error) },
      { status: 500 }
    );
  }
}

import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { DynamicPage, LegalPage, LandingPage } from "@/types/contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getLandingPage(): Promise<LandingPage | null> {
  try {
    const response = await client.getEntries({
      content_type: "landingPage",
      "fields.slug": "/",
      limit: 1,
      include: 4,
    });

    if (response.items.length === 0) {
      return null;
    }

    return response.items[0].fields as LandingPage;
  } catch (error) {
    console.error("Error fetching landing page:", error);
    return null;
  }
}

export async function getDynamicPage(
  slug: string
): Promise<DynamicPage | null> {
  try {
    const response = await client.getEntries({
      content_type: "dynamicPage",
      "fields.slug": slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    const page = response.items[0].fields as DynamicPage;
    if (page.content) {
      page.content = documentToHtmlString(page.content);
    }

    return page;
  } catch (error) {
    console.error("Error fetching dynamic page:", error);
    return null;
  }
}

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  try {
    const response = await client.getEntries({
      content_type: "legalPage",
      "fields.slug": slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    const page = response.items[0].fields as LegalPage;
    if (page.content) {
      page.content = documentToHtmlString(page.content);
    }

    return page;
  } catch (error) {
    console.error("Error fetching legal page:", error);
    return null;
  }
}

export async function getNavigationPages(): Promise<DynamicPage[]> {
  try {
    const response = await client.getEntries({
      content_type: "dynamicPage",
      "fields.isVisible": true,
      "fields.location[exists]": true,
    });

    return response.items.map((item) => item.fields as DynamicPage);
  } catch (error) {
    console.error("Error fetching navigation pages:", error);
    return [];
  }
}

export async function getLegalPages(): Promise<LegalPage[]> {
  try {
    const response = await client.getEntries({
      content_type: "legalPage",
      "fields.isVisible": true,
    });

    return response.items.map((item) => item.fields as LegalPage);
  } catch (error) {
    console.error("Error fetching legal pages:", error);
    return [];
  }
}

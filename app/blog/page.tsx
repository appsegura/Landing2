import {
  getBlogs,
  getBlogCategories,
  getRecentBlogs,
  getLandingPage,
  getNavigationPages,
  getLegalPages,
} from "@/lib/contentful";
import { BlogList } from "@/components/blog/blog-list";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | ValeIA",
  description: "Explora nuestros artículos sobre IA y automatización",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category;
  const ITEMS_PER_PAGE = 6;

  const [
    { blogs, total },
    categories,
    recentBlogs,
    landingPage,
    navigationPages,
    legalPages,
  ] = await Promise.all([
    getBlogs(page, ITEMS_PER_PAGE),
    getBlogCategories(),
    getRecentBlogs(3),
    getLandingPage(),
    getNavigationPages(),
    getLegalPages(),
  ]);
  if (!landingPage) {
    throw new Error("Required content not found");
  }

  const headerSection = landingPage.sections.find(
    (section) => section.sys.contentType.sys.id === "headerSection"
  );
  const footerSection = landingPage.sections.find(
    (section) => section.sys.contentType.sys.id === "footerSection"
  );

  const filteredBlogs = category
    ? blogs.filter((blog) => blog.tags?.includes(category))
    : blogs;

  return (
    <>
      {headerSection && (
        <Header
          content={headerSection.fields}
          navigationPages={navigationPages}
        />
      )}
      <main className="py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12">Blog</h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <BlogList
                blogs={filteredBlogs}
                total={total}
                currentPage={page}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
            <div className="lg:col-span-4">
              <BlogSidebar
                categories={categories}
                recentBlogs={recentBlogs}
                selectedCategory={category}
              />
            </div>
          </div>
        </div>
      </main>
      {footerSection && (
        <Footer
          content={footerSection.fields}
          navigationPages={navigationPages}
          legalPages={legalPages}
        />
      )}
    </>
  );
}

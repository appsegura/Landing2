"use client";

import { useEffect, useState } from "react";
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
import { DynamicPage } from "@/types/contentful";

// Componente de carga
function LoadingState() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-muted rounded w-1/4 mb-12"></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card-gradient rounded-lg p-6">
              <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-40 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-4">
          <div className="card-gradient rounded-lg p-6">
            <div className="h-6 bg-muted rounded w-1/2 mb-4"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{
    blogs: DynamicPage[];
    total: number;
    categories: string[];
    recentBlogs: DynamicPage[];
    landingPage: any;
    navigationPages: DynamicPage[];
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState<string | undefined>();
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const page = Number(searchParams.get("page")) || 1;
    const category = searchParams.get("category") || undefined;
    setCurrentPage(page);
    setCurrentCategory(category);
  }, []);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [
          blogsData,
          categories,
          recentBlogs,
          landingPage,
          navigationPages,
        ] = await Promise.all([
          getBlogs(currentPage, ITEMS_PER_PAGE),
          getBlogCategories(),
          getRecentBlogs(3),
          getLandingPage(),
          getNavigationPages(),
        ]);

        setData({
          blogs: blogsData.blogs,
          total: blogsData.total,
          categories,
          recentBlogs,
          landingPage,
          navigationPages,
        });
      } catch (error) {
        console.error("Error loading blog data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [currentPage, currentCategory]);

  if (isLoading || !data) {
    return (
      <main className="container mx-auto px-4 py-24">
        <LoadingState />
      </main>
    );
  }

  const {
    blogs,
    total,
    categories,
    recentBlogs,
    landingPage,
    navigationPages,
  } = data;

  const headerSection = landingPage?.sections?.find(
    (section: any) => section.sys.contentType.sys.id === "headerSection"
  );
  const footerSection = landingPage?.sections?.find(
    (section: any) => section.sys.contentType.sys.id === "footerSection"
  );

  const filteredBlogs = currentCategory
    ? blogs.filter((blog) => blog.tags?.includes(currentCategory))
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
                currentPage={currentPage}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
            <div className="lg:col-span-4">
              <BlogSidebar
                categories={categories}
                recentBlogs={recentBlogs}
                selectedCategory={currentCategory}
              />
            </div>
          </div>
        </div>
      </main>
      {footerSection && (
        <Footer
          content={footerSection.fields}
          navigationPages={navigationPages}
        />
      )}
    </>
  );
}

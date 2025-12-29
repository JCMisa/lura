import { isAuthenticated } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import BlogsList from "./_components/BlogsList";
import { Suspense } from "react";
import BlogListFallback from "./_components/BlogListFallback";

const BlogsPage = async () => {
  const isUserAauthenticated = await isAuthenticated();
  if (!isUserAauthenticated) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blogs
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights, thoughts, and trends from our team.
        </p>
      </div>

      <Suspense fallback={<BlogListFallback />}>
        <BlogsList />
      </Suspense>
    </div>
  );
};

export default BlogsPage;

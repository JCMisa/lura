import EmptyPage from "@/components/custom/EmptyPage";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { isAuthenticated } from "@/lib/auth-server";
import { formatTimestamp } from "@/lib/utils";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import CommentSection from "./_components/CommentSection";
import { DeleteBlogButton } from "./_components/DeleteBlogButton";
import { getCurrentUserAction } from "@/lib/actions/auth";

interface BlogDetailsParams {
  params: Promise<{ blogId: Id<"blogs"> }>;
}

const BlogDetails = async ({ params }: BlogDetailsParams) => {
  const { blogId } = await params;

  const [isUserAuthenticated, user] = await Promise.all([
    isAuthenticated(),
    getCurrentUserAction(),
  ]);

  if (!isUserAuthenticated || !user) {
    redirect("/auth/sign-in");
  }

  const [blog, preloadedComments] = await Promise.all([
    fetchQuery(api.blogs.getBlogById, { blogId: blogId }),
    preloadQuery(api.comments.getCommentsByBlogId, { blogId: blogId }),
  ]);

  if (!blog) {
    return (
      <div className="flex items-center justify-center mt-32 flex-col">
        <EmptyPage />
        <h1 className="tracking-tight font-extrabold text-4xl mt-5">
          No Blog Found.
        </h1>
      </div>
    );
  }

  const isOwner = user._id === blog.authorId;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <Link
          href={"/blogs"}
          className={buttonVariants({ variant: "outline" })}
        >
          <ArrowLeftIcon className="size-4" /> Back to blogs
        </Link>

        {isOwner && <DeleteBlogButton blogId={blogId} />}
      </div>

      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={
            blog.imageUrl ??
            "https://images.pexels.com/photos/35163027/pexels-photo-35163027.jpeg"
          }
          alt={blog.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-foreground capitalize">
          {blog.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          Posted on: {formatTimestamp(blog._creationTime)}
        </p>
      </div>

      <Separator className="my-8" />

      <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap wrap-break-word overflow-hidden">
        {blog.content}
      </p>

      <Separator className="my-8" />

      <CommentSection preloadedComments={preloadedComments} />
    </div>
  );
};

export default BlogDetails;

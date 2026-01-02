import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FunctionReturnType } from "convex/server";
import { api } from "@/convex/_generated/api";

type BlogWithImage = FunctionReturnType<typeof api.blogs.getBlogs>[number];

interface BlogCardProps {
  blog: BlogWithImage;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Card key={blog._id} className="pt-0">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={
            blog.imageUrl ??
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
          }
          alt={blog.title}
          fill
          className="rounded-t-lg object-cover"
        />
      </div>

      <CardContent>
        <Link href={`/blogs/${blog._id}`}>
          <h1 className="text-2xl font-bold hover:text-primary transition-colors ease-in-out duration-200 line-clamp-1">
            {blog.title}
          </h1>
        </Link>
        <p className="text-muted-foreground truncate">{blog.content}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/blogs/${blog._id}`}
          className={buttonVariants({
            className: "w-full",
          })}
        >
          Read more
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;

import EmptyPage from "@/components/custom/EmptyPage";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getBlogsAction } from "@/lib/actions/blogs";
import Image from "next/image";
import Link from "next/link";

const BlogsList = async () => {
  // Simulate a slow page load by adding an artificial delay
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const blogs = await getBlogsAction();

  if (!blogs.success && !blogs.data) {
    return (
      <div className="flex items-center justify-center mt-32 flex-col">
        <EmptyPage />
        <h1 className="tracking-tight font-extrabold text-4xl mt-5">
          No Blog Found.
        </h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.data.map((blog) => (
        <Card key={blog._id} className="pt-0">
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
              alt={blog.title}
              fill
              className="rounded-t-lg"
            />
          </div>

          <CardContent>
            <Link href={`/blogs/${blog._id}`}>
              <h1 className="text-2xl font-bold hover:text-primary transition-colors ease-in-out duration-200">
                {blog.title}
              </h1>
            </Link>
            <p className="text-muted-foreground line-clamp-3">{blog.content}</p>
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
      ))}
    </div>
  );
};

export default BlogsList;

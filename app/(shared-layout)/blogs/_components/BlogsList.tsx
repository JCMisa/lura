import EmptyPage from "@/components/custom/EmptyPage";
import { getBlogsAction } from "@/lib/actions/blogs";
import BlogCard from "./BlogCard";

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
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsList;

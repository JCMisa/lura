import { Skeleton } from "@/components/ui/skeleton";

const BlogListFallback = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex flex-col space-y-6 bg-neutral-100 dark:bg-neutral-900 pb-10 rounded-xl"
        >
          <Skeleton className="h-48 w-full rounded-t-xl" />
          <div className="space-y-2 flex flex-col px-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogListFallback;

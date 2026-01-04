const BlogDetailsLoader = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      {/* 1. Back Button Skeleton */}
      <div className="h-10 w-32 bg-neutral-100 dark:bg-neutral-900 rounded-md animate-pulse mb-8" />

      {/* 2. Title Skeleton */}
      <div className="space-y-3 mb-8">
        <div className="h-8 w-3/4 bg-neutral-100 dark:bg-neutral-900 rounded-lg animate-pulse" />
        <div className="h-8 w-1/2 bg-neutral-100 dark:bg-neutral-900 rounded-lg animate-pulse" />
      </div>

      {/* 3. Author / Date Metadata Skeleton */}
      <div className="flex items-center gap-4 mb-10">
        <div className="size-10 bg-neutral-100 dark:bg-neutral-900 rounded-full animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-24 bg-neutral-100 dark:bg-neutral-900 rounded animate-pulse" />
          <div className="h-3 w-16 bg-primary rounded animate-pulse" />
        </div>
      </div>

      {/* 4. Featured Image Skeleton */}
      <div className="w-full aspect-video bg-neutral-100 dark:bg-neutral-900 rounded-xl animate-pulse mb-10" />

      {/* 5. Content Paragraphs Skeletons */}
      <div className="space-y-4">
        <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-900 rounded animate-pulse" />
        <div className="h-4 w-[95%] bg-neutral-100 dark:bg-neutral-900 rounded animate-pulse" />
        <div className="h-4 w-[98%] bg-neutral-100 dark:bg-neutral-900 rounded animate-pulse" />
        <div className="h-4 w-[40%] bg-neutral-100 dark:bg-neutral-900 rounded animate-pulse" />

        <div className="pt-4 space-y-4">
          <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-900 rounded animate-pulse" />
          <div className="h-4 w-[92%] bg-neutral-100 dark:bg-neutral-900 rounded animate-pulse" />
          <div className="h-4 w-[60%] bg-neutral-100 dark:bg-neutral-900 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsLoader;

import { Card, CardContent, CardHeader } from "@/components/ui/card";

const CommentSectionSkeleton = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full">
      {/* 1. Comment Input Card Skeleton */}
      <Card className="bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
        <CardHeader className="flex flex-row items-center gap-2 border-b border-neutral-200 dark:border-neutral-800">
          <div className="size-5 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          <div className="h-5 w-28 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
        </CardHeader>

        <CardContent className="space-y-4 pt-6">
          <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          {/* Textarea Placeholder */}
          <div className="h-20 w-full bg-transparent border border-neutral-200 dark:border-neutral-800 rounded-md animate-pulse" />

          <div className="flex justify-end">
            <div className="h-10 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
          </div>
        </CardContent>
      </Card>

      {/* 2. Comment List Skeleton */}
      <div className="space-y-6 px-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-neutral-100 dark:border-neutral-900 pb-6 last:border-0"
          >
            <div className="flex gap-3">
              {/* Avatar Circle */}
              <div className="size-10 shrink-0 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />

              <div className="space-y-2 w-full">
                {/* Name */}
                <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                {/* Comment Text - Multiple lines for realism */}
                <div className="space-y-1">
                  <div className="h-3 w-full max-w-[300px] bg-neutral-200/60 dark:bg-neutral-800/60 rounded animate-pulse" />
                  <div className="h-3 w-[80%] max-w-[200px] bg-neutral-200/60 dark:bg-neutral-800/60 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Timestamp - Hidden on very small screens or moved below in flex-col */}
            <div className="h-3 w-32 bg-neutral-200/50 dark:bg-neutral-800/50 rounded animate-pulse self-end sm:self-start" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSectionSkeleton;

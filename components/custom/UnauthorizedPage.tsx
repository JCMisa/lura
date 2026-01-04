import Link from "next/link";
import { ShieldAlertIcon, ArrowLeftIcon, HomeIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-transparent">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        {/* Icon & Visual Element */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/50 blur-3xl rounded-full size-32 mx-auto -z-10" />
          <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl shadow-sm">
            <ShieldAlertIcon className="size-12 text-red-500 dark:text-red-400" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
            Access Denied
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Oops! It looks like you don&apos;t have permission to view this
            page. Please sign in with an authorized account or head back to the
            blog.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/blogs"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "w-full sm:w-auto gap-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
            )}
          >
            <ArrowLeftIcon className="size-4" />
            Back to Blogs
          </Link>

          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-auto gap-2 border-neutral-200 dark:border-neutral-800"
            )}
          >
            <HomeIcon className="size-4" />
            Home
          </Link>
        </div>

        {/* Support Link */}
        <p className="text-sm text-neutral-500 dark:text-neutral-500 pt-8">
          If you believe this is an error, please contact your administrator.
        </p>
      </div>
    </div>
  );
}

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { formatTimestamp } from "@/lib/utils";
import { commentSchema } from "@/schemas/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, Preloaded, usePreloadedQuery } from "convex/react";
import { LoaderCircleIcon, MessageSquareIcon, SendIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import CommentSectionSkeleton from "./CommentSectionSkeleton";

const CommentSection = (props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByBlogId>;
}) => {
  const params = useParams<{ blogId: Id<"blogs"> }>();

  const [isPending, startTransition] = useTransition();

  const comments = usePreloadedQuery(props.preloadedComments); // using this instead of useQuery to pormote ssr
  const createCommentMutation = useMutation(api.comments.createComment);

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      blogId: params.blogId,
    },
  });

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    startTransition(async () => {
      try {
        await createCommentMutation(data);
        form.reset();
        toast.success("Comment posted!");
      } catch (error) {
        console.log("Failed to post comment: ", error);
        toast.error("Failed to post comment");
      }
    });
  };

  if (comments === undefined) {
    return <CommentSectionSkeleton />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <MessageSquareIcon className="size-5" />
        <h2 className="text-xl font-bold">{comments.length} Comments</h2>
      </CardHeader>

      <CardContent className="space-y-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Write Your Comment</FieldLabel>
                <Textarea
                  aria-invalid={fieldState.invalid}
                  placeholder="Share your thoughts"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex justify-end">
            <Button disabled={isPending}>
              {isPending ? (
                <LoaderCircleIcon className="size-4 animate-spin" />
              ) : (
                <>
                  Submit <SendIcon className="size-4" />
                </>
              )}
            </Button>
          </div>
        </form>

        {/* comments section */}
        {comments.length > 0 && <Separator />}

        <section className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="flex gap-4">
              <Avatar className="size-10 shrink-0">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${comment.authorName}`}
                  alt={comment.authorName}
                />
                <AvatarFallback>
                  {comment.authorName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{comment.authorName}</p>
                  <p className="text-muted-foreground text-xs">
                    {formatTimestamp(comment._creationTime)}
                  </p>
                </div>

                <p className="text-[13px] text-foreground/90 whitespace-pre-wrap leading-relaxed pl-1">
                  {comment.body}
                </p>
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
};

export default CommentSection;

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBlogAction } from "@/lib/actions/blogs";
import { blogSchema } from "@/schemas/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConvexAuth } from "convex/react";
import { LoaderCircleIcon } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const CreatePage = () => {
  const { isAuthenticated } = useConvexAuth();
  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  }

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof blogSchema>) => {
    startTransition(async () => {
      const result = await createBlogAction(values);

      if (result) {
        if (result.success) {
          toast.success("Blog created successfully!");
          router.push("/blogs");
        } else {
          toast.error(result.error);
        }
      } else {
        toast.error("No result found.");
      }
    });
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Blog Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts to the world.
        </p>
      </div>

      <Card className="w-ful max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              {/* title */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Blog Title</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your blog title"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* content */}
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Blog Content</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter the content of your blog..."
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* image */}
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Blog Image</FieldLabel>
                    <FileUpload onChange={field.onChange} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button disabled={isPending}>
                {isPending ? (
                  <LoaderCircleIcon className="size-4 animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePage;

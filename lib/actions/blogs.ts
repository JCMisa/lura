"use server";

import { blogSchema } from "@/schemas/blog";
import z from "zod";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getToken } from "../auth-server";

export const createBlogAction = async (values: z.infer<typeof blogSchema>) => {
  const parsed = blogSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("Something went wrong");
  }

  const token = await getToken();

  const data = await fetchMutation(
    api.blogs.createBlog,
    {
      title: parsed.data.title,
      content: parsed.data.content,
    },
    { token }
  );

  if (!data) {
    return { success: false, data: null };
  }

  return { success: true, data: data };
};

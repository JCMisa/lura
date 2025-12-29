"use server";

import { blogSchema } from "@/schemas/blog";
import z from "zod";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getToken } from "../auth-server";
import { revalidateTag, unstable_cache } from "next/cache";

export const getBlogsAction = unstable_cache(
  async () => {
    const data = await fetchQuery(api.blogs.getBlogs);

    if (data.length > 0) {
      return { success: true, data: data };
    }

    return { success: false, data: [] };
  },
  ["all-blogs"], // Key parts (cache tag)
  {
    revalidate: 3600, // Cache for 1 hour (adjust as needed)
    tags: ["blogs"], // Tag for manual revalidation later
  }
);

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

  revalidateTag("blogs", "");
  return { success: true, data: data };
};

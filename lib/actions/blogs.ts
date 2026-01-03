"use server";

import { blogSchema } from "@/schemas/blog";
import z from "zod";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getToken } from "../auth-server";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";

export const getBlogsAction = async () => {
  "use cache";

  cacheTag("blogs");
  cacheLife("hours");

  try {
    const data = await fetchQuery(api.blogs.getBlogs);
    if (data?.length > 0) {
      return { success: true, data: data };
    }
    return { success: false, data: [] };
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return { success: false, data: [] };
  }
};

export const createBlogAction = async (values: z.infer<typeof blogSchema>) => {
  try {
    const parsed = blogSchema.safeParse(values);
    if (!parsed.success) {
      throw new Error("Invalid input");
    }

    const token = await getToken();
    let storageId = undefined;

    // CHECK: Only proceed with upload if an image exists and has size
    if (parsed.data.image && parsed.data.image.size > 0) {
      // 1. Generate Upload URL (Only if we have an image)
      const imageUrlEndpoint = await fetchMutation(
        api.blogs.generateImageUploadUrl,
        {},
        { token }
      );

      // 2. Upload the file
      const uploadResult = await fetch(imageUrlEndpoint, {
        method: "POST",
        headers: { "Content-Type": parsed.data.image.type },
        body: parsed.data.image,
      });

      if (!uploadResult.ok) {
        return { success: false, data: null, error: "Failed to upload image" };
      }

      // 3. Get the Storage ID
      storageId = await uploadResult.json();
    }

    // 4. Create Blog
    // If no image was uploaded, storageId remains 'undefined', which Convex accepts
    const data = await fetchMutation(
      api.blogs.createBlog,
      {
        title: parsed.data.title,
        content: parsed.data.content,
        imageStorageId: storageId ?? undefined,
      },
      { token }
    );

    if (!data) {
      return { success: false, data: null, error: "Failed to create blog" };
    }

    revalidateTag("blogs", "max");
    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, data: null, error: "Something went wrong" };
  }
};

"use server";

import { fetchMutation } from "convex/nextjs";
import { getToken } from "../auth-server";
import { api } from "@/convex/_generated/api";
import { commentSchema } from "@/schemas/comment";
import z from "zod";

export const createCommentAction = async (
  values: z.infer<typeof commentSchema>
) => {
  try {
    const parsed = commentSchema.safeParse(values);
    if (!parsed.success) {
      throw new Error("Invalid input");
    }

    const token = await getToken();

    const data = await fetchMutation(
      api.comments.createComment,
      {
        blogId: parsed.data.blogId,
        body: parsed.data.body,
      },
      { token }
    );

    if (!data) {
      return { success: false, data: null, error: "Failed to post comment" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, data: null, error: "Something went wrong" };
  }
};

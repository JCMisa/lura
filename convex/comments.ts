import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const getCommentsByBlogId = query({
  args: { blogId: v.id("blogs") },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("comments")
      .filter((q) => q.eq(q.field("blogId"), args.blogId))
      .order("desc")
      .collect();

    return data;
  },
});

export const createComment = mutation({
  args: { body: v.string(), blogId: v.id("blogs") },
  handler: async (ctx, args) => {
    // check if user is authenticated before creating a blog
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not Authenticated");
    }

    return await ctx.db.insert("comments", {
      blogId: args.blogId,
      body: args.body,
      authorId: user._id,
      authorName: user.name,
    });
  },
});

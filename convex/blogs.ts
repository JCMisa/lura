import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

// ------------------------------------ get all blogs ------------------------------------
export const getBlogs = query({
  args: {},
  handler: async (ctx) => {
    const blogs = await ctx.db.query("blogs").order("desc").collect();

    if (blogs.length > 0) {
      return await Promise.all(
        blogs.map(async (blog) => {
          const resolvedImageUrl =
            blog.imageStorageId !== undefined
              ? await ctx.storage.getUrl(blog.imageStorageId)
              : null;

          return {
            ...blog,
            imageUrl: resolvedImageUrl,
          };
        })
      );
    } else {
      return [];
    }
  },
});
// ------------------------------------ get all blogs ------------------------------------

// ------------------------------------ get blog by id ------------------------------------
export const getBlogById = query({
  args: { blogId: v.id("blogs") },
  handler: async (ctx, args) => {
    const blog = await ctx.db.get(args.blogId);

    if (!blog) {
      return null;
    }

    const resolvedImageUrl =
      blog?.imageStorageId !== undefined
        ? await ctx.storage.getUrl(blog.imageStorageId)
        : null;

    return {
      ...blog,
      imageUrl: resolvedImageUrl,
    };
  },
});
// ------------------------------------ get blog by id ------------------------------------

// ------------------------------------ create blog ------------------------------------
export const createBlog = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    // check if user is authenticated before creating a blog
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not Authenticated");
    }

    // if user is authenticated, proceed...
    const data = await ctx.db.insert("blogs", {
      title: args.title,
      content: args.content,
      authorId: user._id,
      imageStorageId: args.imageStorageId,
    });

    return data;
  },
});
// ------------------------------------ create blog ------------------------------------

// ------------------------------------ image url generation ------------------------------------
export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // check if user is authenticated before generating image upload url
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not Authenticated");
    }

    // if user is authenticated, proceed...
    return await ctx.storage.generateUploadUrl();
  },
});
// ------------------------------------ image url generation ------------------------------------

// ------------------------------------ delete blog ------------------------------------
export const deleteBlog = mutation({
  args: { blogId: v.id("blogs") },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not Authenticated");
    }

    const blog = await ctx.db.get(args.blogId);
    if (!blog) {
      throw new ConvexError("Blog not found");
    }

    // 1. Delete associated comments
    const comments = await ctx.db
      .query("comments")
      .filter((q) => q.eq(q.field("blogId"), args.blogId))
      .collect();

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    // 2. Delete the image from Convex Storage
    if (blog.imageStorageId) {
      await ctx.storage.delete(blog.imageStorageId);
    }

    // 3. Delete the blog document
    await ctx.db.delete(args.blogId);

    return { success: true };
  },
});
// ------------------------------------ delete blog ------------------------------------

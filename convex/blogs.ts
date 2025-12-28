import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { authComponent } from "./auth";

export const createBlog = mutation({
  args: { title: v.string(), content: v.string() },
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
    });

    return data;
  },
});

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";


export const toogleBookmark = mutation({
    args: { postId: v.id("posts")},
    handler: async (ctx , args ) => {
        const currentUser = await getAuthenticatedUser(ctx);

        const existing = await ctx.db
        .query("bookmarks")
        .withIndex("by_user_and_post", (q) =>
           q.eq("userId", currentUser._id).eq("postId", args.postId)
        )
        .first();

        if(existing) {
            await ctx.db.delete(existing._id);
            return false;
        } else {
            await ctx.db.insert("bookmarks", { userId: currentUser._id, postId: args.postId});
            return true;
        }
    },
});

export const getBookmarksPosts = query({
    handler: async (ctx) => {
        const currentUser = await getAuthenticatedUser(ctx);

        //get all bookmarks of the current user
        const bookmarks = await ctx.db
        .query("bookmarks")
        .withIndex("by_user", (q) => q.eq("userId", currentUser._id))
        .order("desc")
        .collect();

        const bookmarksWithInfo = await Promise.all(
             bookmarks.map(async (bookmarks) => {
                 const post = await ctx.db.get(bookmarks.postId);
                 return post;
             })
        );
        return bookmarksWithInfo;
    }
});
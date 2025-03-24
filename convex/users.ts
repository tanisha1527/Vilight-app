import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createUser = mutation({
     args:{
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        bio: v.optional(v.string()),
        image: v.string(),
        clerkId: v.string()
     },

     handler: async(ctx, args) => {

        const existingUser = await ctx.db.query("Users")
        .withIndex("by_clerk_id", (q)=> q.eq("clerkId", args.clerkId))
        .first();

        if(existingUser) return;
        
        // create a user in db
          await ctx.db.insert("Users", {
            username: args.username,
            fullname: args.fullname,
            email: args.email,
            image: args.image,
            clerkId: args.clerkId,
            followers: 0,
            following: 0,
            posts: 0,
          })
     }
});
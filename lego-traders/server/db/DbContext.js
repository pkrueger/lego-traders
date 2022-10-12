import mongoose from "mongoose";
import { AccountSchema } from "../models/Account";
import { CommentSchema } from "../models/Comment.js";
import { LegoSetSchema } from "../models/LegoSet.js";
import { PostSchema } from "../models/Post.js";

class DbContext {
  Account = mongoose.model("Account", AccountSchema);

  LegoSets = mongoose.model('LegoSet', LegoSetSchema)

  Posts = mongoose.model('Post', PostSchema)
  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext();

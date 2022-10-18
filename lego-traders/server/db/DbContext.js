import mongoose from "mongoose";
import { AccountSchema } from "../models/Account";
import { CommentSchema } from "../models/Comment.js";
import { LegoSetSchema } from "../models/LegoSet.js";
import { MocSchema } from "../models/Moc.js";
import { NotificationSchema } from "../models/Notification.js";
import { PostSchema } from "../models/Post.js";
import { TradeRequestSchema } from "../models/TradeRequest.js";

class DbContext {
  Account = mongoose.model("Account", AccountSchema);

  LegoSets = mongoose.model("LegoSet", LegoSetSchema);

  Posts = mongoose.model("Post", PostSchema);
  Comments = mongoose.model("Comment", CommentSchema);
  Mocs = mongoose.model("Moc", MocSchema);
  TradeRequest = mongoose.model("TradeRequest", TradeRequestSchema);
  Notifications = mongoose.model("Notification", NotificationSchema);
}

export const dbContext = new DbContext();

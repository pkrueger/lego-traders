import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/dbUtils.js";

export const NotificationSchema = new Schema({
  recipientId: { type: ObjectId, required: true },
  hasSeen: { type: Boolean, default: false },
  body: { type: String, required: true, minlength: 1, maxlength: 140 },
  type: {
    type: String,
    enum: [
      "trade-pending",
      "trade-rejected",
      "trade-accepted",
      "wishlist-set-available",
      "forum-comment-owned",
      "forum-comment-unowned",
    ],
  },
});

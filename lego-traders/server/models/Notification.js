import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/dbUtils.js";

export const NotificationSchema = new Schema(
  {
    recipientId: { type: ObjectId, required: true, ref: "Account" },
    hasSeen: { type: Boolean, default: false },
    body: { type: String, required: true, minlength: 1, maxlength: 300 },
    route: { type: Object, default: null },
    type: {
      type: String,
      required: true,
      enum: [
        "trade-pending",
        "trade-rejected",
        "trade-accepted",
        "wishlist-set-available",
        "forum-comment-owned",
        "forum-comment-unowned",
      ],
    },
  },
  SCHEMA_OPTIONS
);

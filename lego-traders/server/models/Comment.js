import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/dbUtils.js";

export const CommentSchema = new Schema({
  postId: { type: ObjectId, required: true },
  creatorId: { type: ObjectId, required: true },
  body: { type: String, required: true, minLength: 1, maxLength: 500}

}, SCHEMA_OPTIONS)

CommentSchema.virtual
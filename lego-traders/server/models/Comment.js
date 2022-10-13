import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/dbUtils.js";

export const CommentSchema = new Schema({
  postId: { type: ObjectId, default: null },
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  body: { type: String, required: true, minLength: 1, maxLength: 500},
  set_num: { type: String, default: '' }

}, SCHEMA_OPTIONS)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})


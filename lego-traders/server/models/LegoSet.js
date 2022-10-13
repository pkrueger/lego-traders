import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/dbUtils.js";

export const LegoSetSchema = new Schema({
  ownerId: {  type: ObjectId, required: true, ref: 'Account' },
  set_num: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: Number, required: true},
  theme_id: { type: String, required: true },
  set_img_url: { type: String, required: true },
  isOwned: { type: Boolean, required: true, default: false },
  isUpForTrade: { type: Boolean, required: true, default: false}
}, SCHEMA_OPTIONS)

LegoSetSchema.virtual('owner', {
  localField: 'ownerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
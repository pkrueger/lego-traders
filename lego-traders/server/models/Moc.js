import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/dbUtils.js";

export const MocSchema = new Schema({
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true },
  moc_steps_img: { type: Array, required: true, maxlength: 15, minlength: 2 },
  moc_img: { type: String, required: true },
  moc_steps_text: { type: Array, required: true, maxlength: 15, minlength: 2},
  set_num: { type: String }
}, SCHEMA_OPTIONS)

MocSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
  
  


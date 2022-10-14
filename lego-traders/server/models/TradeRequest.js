import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/dbUtils.js";




export const TradeRequestSchema = new Schema(
  {
    //Creator of the Trade
    ownerId: { type: ObjectId, required: true, ref: 'Account' },
    offeredSetId: { type: ObjectId, required: true, ref: "LegoSet" },
    //Owner of the requested set 
    requestedAccountId: { type: ObjectId, required: true, ref: 'Account' },
    requestedSetId: { type: ObjectId, required: true, ref: "LegoSet" },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'recieved'], default: 'pending' },
    body: { type: String, minLenght: 1, maxLength: 3000, required: true },
    confirmed: { type: Boolean, default: false }
  }, SCHEMA_OPTIONS
)

// Possibly needs virtuals for Set info
TradeRequestSchema.virtual('offeredSet', {
  localField: 'offeredSetId',
  foreignField: '_id',
  justOne: true,
  ref: "LegoSet"
})
TradeRequestSchema.virtual('requestedSet', {
  localField: 'requestedSetId',
  foreignField: '_id',
  justOne: true,
  ref: "LegoSet"
})
TradeRequestSchema.virtual('owner', {
  localField: 'ownerId',
  foreignField: '_id',
  justOne: true,
  ref: "Account"
})
TradeRequestSchema.virtual('requestedAccount', {
  localField: 'requestedAccountId',
  foreignField: '_id',
  justOne: true,
  ref: "Account"
})
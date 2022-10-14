import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/dbUtils.js";




export const TradeRequestSchema = new Schema(
  {
    //Creator of the Trade
    ownerId: { type: String, required: true},
    offeredSetId: { type: String, required: true},
    //Owner of the requested set 
    requestedAccountId: { type: String, required: true},
    requestedSetId: { type: String, required: true},
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'received'], default: 'pending' },
    //TODO Set body back to required true
    body: { type: String, minlength: 1, maxLength: 3000},
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
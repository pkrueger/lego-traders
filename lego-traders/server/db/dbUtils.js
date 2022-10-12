import { Schema } from "mongoose"

export const SCHEMA_OPTIONS = { timestamps: true, toJSON: { virtuals: true } }

export const ObjectId = Schema.Types.ObjectId
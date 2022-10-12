import mongoose from "mongoose";
import { AccountSchema } from "../models/Account";
import { LegoSetSchema } from "../models/LegoSet.js";

class DbContext {
  Account = mongoose.model("Account", AccountSchema);

  LegoSets = mongoose.model('LegoSet', LegoSetSchema)
}

export const dbContext = new DbContext();

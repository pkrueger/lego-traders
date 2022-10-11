import mongoose from "mongoose";
import { AccountSchema } from "../models/Account";

class DbContext {
  Account = mongoose.model("Account", AccountSchema);
}

export const dbContext = new DbContext();

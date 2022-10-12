import { dbContext } from "../db/DbContext.js";

class LegoSetsService {
  async getAllSets(){
    const legoSets = await dbContext.LegoSets.find()
    return legoSets
  }
}

export const legoSetsService = new LegoSetsService()
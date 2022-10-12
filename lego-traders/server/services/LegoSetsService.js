import { dbContext } from "../db/DbContext.js";

class LegoSetsService {
  async getSetBySetId(id) {
    const set = await dbContext.LegoSets.findById(id)
    return set
  }
  async getTradableSets() {
    const tradableSets = await dbContext.LegoSets.find({
      isUpForTrade: true
    })
    return tradableSets
  }
  async getAllSets(){
    const legoSets = await dbContext.LegoSets.find()
    return legoSets
  }

  async getSetsByProfileId(id){
    const sets = await dbContext.LegoSets.findById(id)
    return sets
  }
}

export const legoSetsService = new LegoSetsService()
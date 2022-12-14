import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class LegoSetsService {
  async deleteSet(id) {
    const set = await dbContext.LegoSets.findById(id)
    if (!set) { throw new BadRequest('bad ID') }
    set.delete()
    return set
  }
  async getAllOwners() { }
  async createLegoSet(data) {
    const set = await dbContext.LegoSets.create(data);
    return set;
  }
  async getSetBySetId(legoSetId) {
    const set = await dbContext.LegoSets.findById(legoSetId);
    return set;
  }
  async getTradableSets() {
    const tradableSets = await dbContext.LegoSets.find({
      isUpForTrade: true,
    }).populate("owner", "name picture");

    return tradableSets;
  }
  async getWishlistSetsBySetNum(set_num) {
    const legoSets = await dbContext.LegoSets.find({ isOwned: false, set_num });
    return legoSets;
  }
  async getAllSets() {
    const legoSets = await dbContext.LegoSets.find();
    return legoSets;
  }

  async getSetsByOwnerId(ownerId) {
    const sets = await dbContext.LegoSets.find({ ownerId }).populate(
      "owner",
      "name picture"
    );
    return sets;
  }
  async moveToOwnedSet(setId, body) {
    const set = await dbContext.LegoSets.findById(setId)
      .populate(
        "owner",
        "name picture"
      );
    if (!set) { throw new BadRequest('invalid set') }
    set.isOwned = true
    set.save()
    return set
  }
  async setTradable(legoSetId) {
    const set = await dbContext.LegoSets.findById(legoSetId).populate(
      "owner",
      "name picture"
    );
    if (!set) {
      throw new BadRequest("Invalid Set ID");
    }
    set.isUpForTrade = !set.isUpForTrade;
    set.save();
    return set;
  }
}

export const legoSetsService = new LegoSetsService();

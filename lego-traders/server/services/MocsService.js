import { dbContext } from "../db/DbContext.js"

class MocsService{
  async getMocsBySetNum(set_num) {
    const mocs = await dbContext.Mocs.find(set_num)
    return mocs
  }
  async getMocsByCreatorId(creatorId) {
    const mocs = await dbContext.Mocs.find(creatorId)
    return mocs
  }
  async getAllMocs() {
    const mocs = await dbContext.Mocs.find()
    return mocs
  }

}
export const mocsService = new MocsService()
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class MocsService {
  async removeMoc(mocId, userInfo) {
    const moc = await this.getMocById(mocId)
    if (moc.creatorId != userInfo.id) {
      throw new Forbidden('This is Not your MOC you cannot delete this')
    }
    moc.remove()
    // await moc.save()
    return moc
  }
  async createMoc(MocData) {
    const moc = await dbContext.Mocs.create(MocData)
    await moc.populate('creator', 'name picture')
    return moc
  }
  async getMocById(mocId) {
    const moc = await dbContext.Mocs.findById(mocId)
    if (!moc) {
      throw new BadRequest('Invalid or Bad Moc Id')
    }
    return moc
  }
  async getMocsBySetNum(set_num) {
    const mocs = await dbContext.Mocs.find({ set_num })
    return mocs
  }
  async getMocsByCreatorId(creatorId) {
    const mocs = await dbContext.Mocs.find({ creatorId })
    return mocs
  }
  async getAllMocs() {
    const mocs = await dbContext.Mocs.find()
    return mocs
  }

}
export const mocsService = new MocsService()
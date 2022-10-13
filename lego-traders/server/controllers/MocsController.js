import { mocsService } from "../services/MocsService.js";
import BaseController from "../utils/BaseController.js";

// NOTE the MOC Schema is not set up yet!!!

export class MocsController extends BaseController{
  constructor(){
    super('/api/mocs')
    this.router
    .get('', this.getAllMocs)
    .get('/:creatorId', this.getMocsByCreatorId)
    .get('/:set_num', this.getMocsBySetNum)
  }
  async getMocsBySetNum(req, res, next) {
try {
  const mocs = await mocsService.getMocsBySetNum(req.params.set_num)
  res.send(mocs)
} catch (error) {
  next(error)
}  }
  async getMocsByCreatorId(req, res, next) {
    try {
      const mocs = await mocsService.getMocsByCreatorId(req.params.creatorId)
      res.send(mocs)
    } catch (error) {
      next(error)
    }
  }
  async getAllMocs(req, res, next) {
    try {
      const mocs = await mocsService.getAllMocs()
      res.send(mocs)
    } catch (error) {
      next(error)
    }

  }
}
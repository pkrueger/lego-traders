import { Auth0Provider } from "@bcwdev/auth0provider";
import { mocsService } from "../services/MocsService.js";
import BaseController from "../utils/BaseController.js";

// NOTE the MOC Schema is not set up yet!!!

export class MocsController extends BaseController {
  constructor() {
    super('/api/mocs')
    this.router
      .get('', this.getAllMocs)
      .get('/:creatorId', this.getMocsByCreatorId)
      .get('/:set_num', this.getMocsBySetNum)
      .get('/:mocId', this.getMocById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createMoc)
      .delete('/:mocId', this.removeMoc)
  }
  async removeMoc(req, res, next) {
    try {
      await mocsService.removeMoc(req.params.mocid, req.userInfo)
      res.send('You Deleted Your MOC')
    } catch (error) {
      next(error)
    }
  }
  async createMoc(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const moc = await mocsService.createMoc(req.body)
      res.send(moc)
    } catch (error) {
      next(error)
    }
  }
  async getMocById(req, res, next) {
    try {
      const moc = await mocsService.getMocById(req.params.mocId)
      res.send(moc)
    } catch (error) {
      next(error)
    }
  }
  async getMocsBySetNum(req, res, next) {
    try {
      const mocs = await mocsService.getMocsBySetNum(req.params.set_num)
      res.send(mocs)
    } catch (error) {
      next(error)
    }
  }
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
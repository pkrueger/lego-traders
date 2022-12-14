import { Auth0Provider } from "@bcwdev/auth0provider";
import { mocsService } from "../services/MocsService.js";
import BaseController from "../utils/BaseController.js";
export class MocsController extends BaseController {
  constructor() {
    super('/api/mocs')
    this.router
      .get('', this.getAllMocs)
      .get('/:mocId', this.getMocById)
      .get('/set/:set_num', this.getMocsBySetNum)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createMoc)
      .put('/:mocId', this.addStep)
      .delete('/:mocId', this.removeMoc)
  }
  async addStep(req, res, next) {
    try {
      const moc = await mocsService.addStep(req.body, req.params.mocId, req.userInfo)
      res.send(moc)
    } catch (error) {
      next(error)
    }
  }
  async removeMoc(req, res, next) {
    try {
      await mocsService.removeMoc(req.params.mocId, req.userInfo)
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
  async getAllMocs(req, res, next) {
    try {
      const mocs = await mocsService.getAllMocs()
      res.send(mocs)
    } catch (error) {
      next(error)
    }

  }
}
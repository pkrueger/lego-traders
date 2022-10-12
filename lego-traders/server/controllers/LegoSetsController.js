import { legoSetsService } from "../services/LegoSetsService.js";
import BaseController from "../utils/BaseController.js";

export class LegoSetsController extends BaseController{
  constructor(){
    super('api/sets')
    this.router
    .get('', this.getAllSets)
    .get('/tradable', this.getTradableSets)
    .get('/:legoSetId', this.getSetBySetId)
    .get('/:id/sets', this.getSetsByProfileId)
  }
    async getSetsByProfileId(req, res, next) {
    try {
      const sets = await legoSetsService.getSetsByProfileId(req.param.id)
      res.send(sets)
    } catch (error) {
      next(error)
    }
  }
  async getSetBySetId(req, res, next) {
try {
  const set = await legoSetsService.getSetBySetId(req.params.legoSetId)
  res.send(set)
} catch (error) {
  next(error)
}
  }
  async getTradableSets(req, res, next) {
    try {
      const tradableSets = await legoSetsService.getTradableSets()
      res.send(tradableSets)
    } catch (error) {
      next(error)
    }
  }
  async getAllSets(req, res, next) {
try {
  const legoSets = await legoSetsService.getAllSets()
  res.send(legoSets)
} catch (error) {
  next(error)
}  }
}
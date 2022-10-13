import { legoSetsService } from "../services/LegoSetsService.js";
import BaseController from "../utils/BaseController.js";

export class LegoSetsController extends BaseController {
  constructor() {
    super('api/sets')
    this.router
      .get('', this.getAllSets)
      .get('/tradable', this.getTradableSets)
      .get('/:legoSetId', this.getSetBySetId)
      //'api/sets/:id/sets is a bit too much imo -Randy
      // Lets review PostMan Tower request for get Tickets by accountId the equivalant would be /api/account/sets
      // Not to say this won't work for profile pages. It just doesn't work for what I've been working on.
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
    }
  }
}
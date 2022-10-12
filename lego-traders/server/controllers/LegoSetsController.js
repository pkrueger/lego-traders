import { legoSetsService } from "../services/LegoSetsService.js";
import BaseController from "../utils/BaseController.js";

export class LegoSetsController extends BaseController{
  constructor(){
    super('api/sets')
    this.router
    .get('', this.getAllSets)
  }
  async getAllSets(req, res, next) {
try {
  const legoSets = await legoSetsService.getAllSets()
  res.send(legoSets)
} catch (error) {
  next(error)
}  }
}
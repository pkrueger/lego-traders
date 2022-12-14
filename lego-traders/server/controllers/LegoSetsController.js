import { Auth0Provider } from "@bcwdev/auth0provider";
import { legoSetsService } from "../services/LegoSetsService.js";
import BaseController from "../utils/BaseController.js";

export class LegoSetsController extends BaseController {
  constructor() {
    super("api/sets");
    this.router
      .get("", this.getAllSets)
      .get("/tradable", this.getTradableSets)
      .get("/wishlists/:setNum", this.getWishlistSetsBySetNum)
      .get("/:legoSetId", this.getSetBySetId)
      .get("/profile/:ownerId", this.getSetsByOwnerId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put("/:setId/tradable", this.setTradable)
      .put('/:setId/moveToOwned', this.moveToOwnedSet)
      .delete('/:setId', this.deleteSet)
  }
  async deleteSet(req, res, next) {
    try {
      const set = await legoSetsService.deleteSet(req.params.setId)
    } catch (error) {
      next(error)
    }
  }
  async moveToOwnedSet(req, res, next) {
    try {
      const set = await legoSetsService.moveToOwnedSet(req.params.setId, req.body)
      res.send(set)
    } catch (error) {
      next(error)
    }
  }
  async setTradable(req, res, next) {
    try {
      const set = await legoSetsService.setTradable(req.params.setId);
      res.send(set);
    } catch (error) {
      next(error);
    }
  }
  async getWishlistSetsBySetNum(req, res, next) {
    try {
      const legoSets = await legoSetsService.getWishlistSetsBySetNum(
        req.params.setNum
      );
      res.send(legoSets);
    } catch (error) {
      next(error);
    }
  }
  async getSetsByOwnerId(req, res, next) {
    try {
      const sets = await legoSetsService.getSetsByOwnerId(req.params.ownerId);
      res.send(sets);
    } catch (error) {
      next(error);
    }
  }
  async getSetBySetId(req, res, next) {
    try {
      const set = await legoSetsService.getSetBySetId(req.params.legoSetId);
      res.send(set);
    } catch (error) {
      next(error);
    }
  }
  async getTradableSets(req, res, next) {
    try {
      const tradableSets = await legoSetsService.getTradableSets();
      res.send(tradableSets);
    } catch (error) {
      next(error);
    }
  }
  async getAllSets(req, res, next) {
    try {
      const legoSets = await legoSetsService.getAllSets();
      res.send(legoSets);
    } catch (error) {
      next(error);
    }
  }
  // async getAllOwners(req, res, next) {
  //   try {
  //     const owners = await legoSetsService.getAllOwners()
  //     res.send(owners)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}

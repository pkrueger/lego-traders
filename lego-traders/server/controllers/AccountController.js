import { Auth0Provider } from "@bcwdev/auth0provider";
import { accountService } from "../services/AccountService";
import { legoSetsService } from "../services/LegoSetsService.js";
import BaseController from "../utils/BaseController";

export class AccountController extends BaseController {
  constructor() {
    super("account");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserAccount)
      .put("", this.updateUserAccount)
      .post("/sets", this.createLegoSet);
  }
  async createLegoSet(req, res, next) {
    try {
      req.body.ownerId = req.userInfo.id;
      const LegoSet = await legoSetsService.createLegoSet(req.body);
      res.send(LegoSet)
    } catch (error) {
      next(error);
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo);
      res.send(account);
    } catch (error) {
      next(error);
    }
  }
  async updateUserAccount(req, res, next) {
    try {
      const account = await accountService.updateAccount(
        req.userInfo,
        req.body
      );
      res.send(account);
    } catch (error) {
      next(error);
    }
  }
}

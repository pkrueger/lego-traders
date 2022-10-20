import { Auth0Provider } from "@bcwdev/auth0provider";
import { accountService } from "../services/AccountService";
import { legoSetsService } from "../services/LegoSetsService.js";
import { notificationsService } from "../services/NotificationsService.js";
import { socketProvider } from "../SocketProvider.js";
import BaseController from "../utils/BaseController";

export class AccountController extends BaseController {
  constructor() {
    super("account");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserAccount)
      .get("/notifications", this.getNotificationsByAccountId)
      .delete("/notifications", this.multiDeathNote)
      .put("", this.updateUserAccount)
      .post("/sets", this.createLegoSet);
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo);
      res.send(account);
    } catch (error) {
      next(error);
    }
  }

  async getNotificationsByAccountId(req, res, next) {
    try {
      const notifications =
        await notificationsService.getNotificationsByAccountId(req.userInfo.id);
      res.send(notifications);
    } catch (error) {
      next(error);
    }
  }
  async multiDeathNote(req, res, next) {
    try {
      await notificationsService.multiDeathNote(req.userInfo.id);
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
  async createLegoSet(req, res, next) {
    try {
      req.body.ownerId = req.userInfo.id;
      const legoSet = await legoSetsService.createLegoSet(req.body);
      socketProvider.messageUser(req.userInfo.id, "CREATE_LEGO_SET", legoSet);
      res.send(legoSet);
    } catch (error) {
      next(error);
    }
  }
}

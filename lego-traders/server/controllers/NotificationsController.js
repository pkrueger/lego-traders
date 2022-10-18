import { Auth0Provider } from "@bcwdev/auth0provider";
import { notificationsService } from "../services/NotificationsService.js";
import BaseController from "../utils/BaseController.js";

export class NotificationsController extends BaseController {
  constructor() {
    super("/api/notifications");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("/:notificationId", this.getNotificationById)
      .put("/:notificationId", this.flipItAndReverseHasSeen)
      .delete("/:notificationId", this.deathNote);
  }
  async getNotificationById(req, res, next) {
    try {
      const notifications = await notificationsService.getNotificationById(
        req.params.notificationId
      );
      res.send(notifications);
    } catch (error) {
      next(error);
    }
  }
  async flipItAndReverseHasSeen(req, res, next) {
    try {
      const notification = await notificationsService.flipItAndReverseHasSeen(
        req.params.notificationId,
        req.userInfo.id
      );
      res.send(notification);
    } catch (error) {
      next(error);
    }
  }
  async deathNote(req, res, next) {
    try {
      await notificationsService.deathNote(
        req.params.notificationId,
        req.userInfo.id
      );
      res.send("You dun deleted it");
    } catch (error) {
      next(error);
    }
  }
}
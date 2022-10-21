import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class NotificationsService {
  async getNotificationsByAccountId(recipientId) {
    const notifications = await dbContext.Notifications.find({ recipientId });
    return notifications;
  }
  async getNotificationById(notificationId) {
    const notification = await dbContext.Notifications.findById(notificationId);
    if (!notification) {
      throw new BadRequest("no");
    }
    return notification;
  }
  async becomeNotified(data) {
    const notification = await dbContext.Notifications.create(data);
    return notification;
  }

  async flipItAndReverseHasSeen(accountId) {
    const notifications = await this.getNotificationsByAccountId(accountId);
    for (let n of notifications) {
      n.hasSeen = true;
      await n.save();
    }
    return notifications;
  }
  async deathNote(notificationId, accountId) {
    const notification = await this.getNotificationById(notificationId);
    if (notification.recipientId != accountId) {
      throw new Forbidden(
        "Not your notification! Why would you even want to do this?"
      );
    }
    notification.remove();
  }
  async multiDeathNote(accountId) {
    const notifications = await this.getNotificationsByAccountId(accountId);
    for (let n of notifications) {
      n.remove();
    }
  }
}

export const notificationsService = new NotificationsService();

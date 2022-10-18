import { AppState } from "../AppState.js";
import { Notification } from "../models/Notification.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class NotificationsService {
  async getMyNotifications() {
    const res = await api.get("/account/notifications");
    logger.log(res.data);
    AppState.notifications = res.data.map((n) => new Notification(n));
  }
}
export const notificationsService = new NotificationsService();

import { AppState } from "../AppState.js";
import { Notification } from "../models/Notification.js";
import { api } from "./AxiosService.js";

class NotificationsService {
  async getMyNotifications() {
    const res = await api.get("/account/notifications");
    AppState.notifications = res.data.map((n) => new Notification(n));
  }
}
export const notificationsService = new NotificationsService();

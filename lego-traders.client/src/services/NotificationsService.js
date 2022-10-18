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
  async sendPendingTradeNote(trade) {
    const res = await api.post("/api/notifications", {
      recipientId: trade.requestedAccountId,
      type: "trade-pending",
      body: `${trade.owner.name} has requested a trade for your ${trade.requestedSet.name}.`,
    });
  }
}
export const notificationsService = new NotificationsService();

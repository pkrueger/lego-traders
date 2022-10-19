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
    await api.post("/api/notifications", {
      recipientId: trade.requestedAccountId,
      type: "trade-pending",
      body: `${trade.owner.name} has requested a trade for your ${trade.requestedSet.name}.`,
    });
  }
  async sendAcceptedTradeNote(trade) {
    await api.post("/api/notifications", {
      recipientId: trade.ownerId,
      type: "trade-accepted",
      body: `${trade.requestedAccount.name} has accepted the trade for their ${trade.requestedSet.name}.`,
    });
  }
  async sendRejectedTradeNote(trade) {
    await api.post("/api/notifications", {
      recipientId: trade.ownerId,
      type: "trade-rejected",
      body: `${trade.requestedAccount.name} has rejected the trade for their ${trade.requestedSet.name}.`,
    });
  }
}
export const notificationsService = new NotificationsService();

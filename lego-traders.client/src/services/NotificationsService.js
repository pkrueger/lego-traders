import { AppState } from "../AppState.js";
import { Notification } from "../models/Notification.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { forumPostsService } from "./ForumPostsService.js";

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
      route: { name: "Marketplace" },
    });
  }
  async sendAcceptedTradeNote(trade) {
    await api.post("/api/notifications", {
      recipientId: trade.ownerId,
      type: "trade-accepted",
      body: `${trade.requestedAccount.name} has accepted the trade for their ${trade.requestedSet.name}.`,
      route: { name: "Marketplace" },
    });
  }
  async sendRejectedTradeNote(trade) {
    await api.post("/api/notifications", {
      recipientId: trade.ownerId,
      type: "trade-rejected",
      body: `${trade.requestedAccount.name} has rejected the trade for their ${trade.requestedSet.name}.`,
      route: { name: "Marketplace" },
    });
  }
  async sendCommentNote(comment) {
    const post = await forumPostsService.getPostById(comment.postId);
    const subs = post.subscribers
      .filter((s) => s != post.creatorId)
      .filter((s) => s != comment.creatorId);
    for (let s of subs) {
      await api.post("/api/notifications", {
        recipientId: s,
        type: "forum-comment-unowned",
        body: `${comment.creator.name} has commented on a post.`,
        route: {
          name: "ForumPost",
          params: { postId: post.id },
        },
      });
    }
    if (post.creatorId != comment.creatorId) {
      await api.post("/api/notifications", {
        recipientId: post.creatorId,
        type: "forum-comment-owned",
        body: `${comment.creator.name} has commented on your post.`,
        route: {
          name: "ForumPost",
          params: { postId: post.id },
        },
      });
    }
  }

  async sendWishlistNote(legoSet) {
    const res = await api.get(`/api/sets/wishlists/${legoSet.set_num}`);
    const legoSets = res.data.filter((s) => s.ownerId != legoSet.ownerId);
    for (let s of legoSets) {
      await api.post("/api/notifications", {
        recipientId: s.ownerId,
        type: "wishlist-set-available",
        body: `${legoSet.name} has been put up for trade by ${legoSet.owner.name}.`,
        route: { name: "Marketplace" },
      });
    }
  }
  async flipItAndReverseHasSeen() {
    const res = await api.put("api/notifications");
    AppState.notifications = res.data.map((n) => new Notification(n));
  }
}
export const notificationsService = new NotificationsService();

import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop";
import { SocketHandler } from "../utils/SocketHandler";
import { marketplaceService } from "../services/MarketplaceService";

class SocketService extends SocketHandler {
  constructor() {
    super(true);
    this.on("error", this.onError)
      .on("COMMENT_ADDED", this.addComment)
      .on("BECOME_NOTIFIED", this.becomeNotified)
      .on("CREATE_LEGO_SET", this.legoSetCreated)
      .on("NEW_TRADE_REQUEST", this.newTradeRequest)
      .on("NEW_TRADE_OFFER", this.newTradeOffer)
      .on("UPDATE_TRADE_REQUEST_REQUESTED", this.updateTradeRequestRequested)
      .on("UPDATE_TRADE_REQUEST_OFFERED", this.updateTradeRequestOffered)
      .on("TRANSFER_REQUESTED", this.transferRequestedSet)
      .on("TRANSFER_OFFERED", this.transferOfferedSet)
      .on("DELETE_REQUESTED_TRADE", this.deleteRequestedTrade)
      .on("DELETE_OFFERED_TRADE", this.deleteOfferedTrade);
  }

  deleteRequestedTrade(trade) {
    AppState.receivedTrades = AppState.receivedTrades.filter(
      (t) => t.id != trade.id
    );
  }
  deleteOfferedTrade(trade) {
    AppState.sentTrades = AppState.sentTrades.filter((t) => t.id != trade.id);
  }
  async updateTradeRequestRequested() {
    await marketplaceService.getSentTrades();
    await marketplaceService.getReceivedTrades();
  }
  async updateTradeRequestOffered() {
    await marketplaceService.getSentTrades();
    await marketplaceService.getReceivedTrades();
  }
  transferRequestedSet(trade) {
    const index = AppState.myLegoSets.findIndex(
      (s) => s.id == trade.requestedSet.id
    );
    AppState.myLegoSets.splice(index, 1, trade.offeredSet);
  }
  transferOfferedSet(trade) {
    const index = AppState.myLegoSets.findIndex(
      (s) => s.id == trade.offeredSet.id
    );
    AppState.myLegoSets.splice(index, 1, trade.requestedSet);
  }
  newTradeRequest(trade) {
    AppState.receivedTrades.push(trade);
  }
  newTradeOffer(trade) {
    AppState.sentTrades.push(trade);
  }
  legoSetCreated(legoSet) {
    AppState.myLegoSets.push(legoSet).on("JOINED_ROOM", this.joinedRoom);
  }
  becomeNotified(notification) {
    AppState.notifications.unshift(notification);
  }
  addComment(comment) {
    logger.log("COMMENT_ADDED", comment);
    addOrSkip(AppState.comments, comment);
  }
  onError(e) {
    Pop.toast(e.message, "error");
  }

  joinedRoom(tradeId) {
    logger.log("JOINED_ROOM poopoohead", tradeId);
  }
}
function addOrSkip(arr, item) {
  let found = arr.find((i) => i.id == item.id);
  if (!found) {
    arr.push(item);
  }
}
export const socketService = new SocketService();

import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { tradeService } from "../services/TradeService.js";
import { socketProvider } from "../SocketProvider.js";
import { logger } from "../utils/Logger.js";

export class TradeController extends BaseController {
  constructor() {
    super("api/trade");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("/sent", this.getSentTrades)
      .get("/received", this.getReceivedTrades)
      .post("", this.makeTradeRequest)
      .put("/:tradeId", this.tradeResponse)
      .delete("/:tradeId", this.deleteTrade);
  }
  async deleteTrade(req, res, next) {
    try {
      const trade = await tradeService.deleteTrade(req.params.tradeId);
      socketProvider.messageUser(
        trade.requestedAccountId,
        "DELETE_REQUESTED_TRADE",
        trade
      );
      socketProvider.messageUser(trade.ownerId, "DELETE_OFFERED_TRADE", trade);
      res.send(trade);
    } catch (error) {
      next(error);
    }
  }
  async getSentTrades(req, res, next) {
    try {
      const trades = await tradeService.getSentTrades(req.userInfo.id);
      res.send(trades);
    } catch (error) {
      next(error);
    }
  }
  async getReceivedTrades(req, res, next) {
    try {
      const trades = await tradeService.getReceivedTrades(req.userInfo.id);
      res.send(trades);
    } catch (error) {
      next(error);
    }
  }
  async makeTradeRequest(req, res, next) {
    try {
      req.body.ownerId = req.userInfo.id;
      const trade = await tradeService.makeTradeRequest(req.body);
      socketProvider.messageUser(req.userInfo.id, "NEW_TRADE_OFFER", trade);
      socketProvider.messageUser(
        trade.requestedAccountId,
        "NEW_TRADE_REQUEST",
        trade
      );
      res.send(trade);
    } catch (error) {
      next(error, "Trade error");
    }
  }
  async tradeResponse(req, res, next) {
    try {
      const trade = await tradeService.tradeResponse(
        req.params.tradeId,
        req.body
      );
      socketProvider.messageUser(
        trade.requestedAccountId,
        "UPDATE_TRADE_REQUEST_REQUESTED",
        trade
      );
      socketProvider.messageUser(
        trade.ownerId,
        "UPDATE_TRADE_REQUEST_OFFERED",
        trade
      );

      if (trade.status == "accepted") {
        socketProvider.messageUser(
          trade.requestedAccountId,
          "TRANSFER_REQUESTED",
          trade
        );
        socketProvider.messageUser(trade.ownerId, "TRANSFER_OFFERED", trade);
      }
      res.send(trade);
    } catch (error) {
      next(error);
    }
  }
}

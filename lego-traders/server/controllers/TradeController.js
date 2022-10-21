import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { tradeService } from "../services/TradeService.js";
import { socketProvider } from "../SocketProvider.js";


export class TradeController extends BaseController {
  constructor() {
    super('api/trade')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/sent', this.getSentTrades)
      .get('/received', this.getReceivedTrades)
      .post('', this.makeTradeRequest)
      .put('/:tradeId', this.tradeResponse)
      .delete('/:tradeId', this.deleteTrade)
  }
  async deleteTrade(req, res, next) {
    try {
      const trade = await tradeService.deleteTrade(req.params.tradeId)
      res.send(trade)
    } catch (error) {
      next(error)
    }
  }
  async getSentTrades(req, res, next) {
    try {
      const trades = await tradeService.getSentTrades(req.userInfo.id)
      res.send(trades)
    } catch (error) {
      next(error)
    }
  }
  async getReceivedTrades(req, res, next) {
    try {
      const trades = await tradeService.getReceivedTrades(req.userInfo.id)
      res.send(trades)
    } catch (error) {
      next(error)
    }
  }
  async makeTradeRequest(req, res, next) {
    try {
      req.body.ownerId = req.userInfo.id
      const trade = await tradeService.makeTradeRequest(req.body)
      socketProvider.messageUser(req.userInfo.id, 'NEW_TRADE_OFFER', trade)
      socketProvider.messageUser(trade.requestedAccountId, 'NEW_TRADE_REQUEST', trade)
      res.send(trade)
    } catch (error) {
      next(error)
    }
  }
  async tradeResponse(req, res, next) {
    try {
      const trade = await tradeService.tradeResponse(req.params.tradeId, req.body)
      socketProvider.messageUser(trade.ownerId, 'UPDATE_TRADE_REQUEST', trade)
      res.send(trade)
    } catch (error) {
      next(error)
    }
  }
}
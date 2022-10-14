import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { tradeService } from "../services/TradeService.js";


export class TradeController extends BaseController {
  constructor() {
    super('api/trade')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/sent', this.getSentTrades)
      .get('/received', this.getReceivedTrades)
      .post('', this.makeTradeRequest)
      .put('/:tradeId', this.tradeResponse)
  }

  async getSentTrades(req, res, next) {
    try {
      const trades = await tradeService.getSentTrades(req.userinfo.id)
      res.send(trades)
    } catch (error) {
      next(error)
    }
  }
  async getReceivedTrades(req, res, next) {
    try {
      const trades = await tradeService.getReceivedTrades(req.userinfo.id)
      res.send(trades)
    } catch (error) {
      next(error)
    }
  }
  async makeTradeRequest(req, res, next) {
    try {
      req.body.ownerId = req.userInfo.id

      const trade = await tradeService.makeTradeRequest(req.body)
      res.send(trade)
    } catch (error) {
      next(error)
    }
  }
  async tradeResponse(req, res, next) {
    try {
      const trade = await tradeService.tradeResponse(req.params.tradeId, req.body)
      res.send(trade)
    } catch (error) {
      next(error)
    }
  }
}
import { dbContext } from "../db/DbContext.js"



class TradeService {
  tradeResponse(id) {

  }
  async makeTradeRequest(formData) {
    const trade = await dbContext.TradeRequest.create(formData)
    return trade
  }
  async getSentTrades(ownerId) {
    const trades = await dbContext.TradeRequest.find({ ownerId })
    return trades
  }
  async getRecievedTrades(requestedAccountId) {
    const trades = await dbContext.TradeRequest.find({ requestedAccountId })
    return trades
  }

}

export const tradeService = new TradeService()
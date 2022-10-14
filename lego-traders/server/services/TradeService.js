import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"



class TradeService {
  async tradeResponse(id, status) {
    const trade = await dbContext.TradeRequest.findByIdAndUpdate(id, { status })
    if (!trade) { throw new BadRequest('Bad Trade ID') }

    if (trade.status == 'accepted') {
      const offered = await dbContext.LegoSets.findById(trade.offeredSetId)
      if (!offered) { throw new BadRequest('Bad LegoSet ID') }
      const requested = await dbContext.LegoSets.findById(trade.requestedSetId)
      if (!requested) { throw new BadRequest('Bad LegoSet ID') }


      offered.ownerId = trade.requestedAccountId
      requested.ownerId = trade.ownerId

      offered.save()
      requested.save()
    }
    trade.save()
    return trade
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
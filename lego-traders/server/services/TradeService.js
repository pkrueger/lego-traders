import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"



class TradeService {
  async tradeResponse(id, status) {
    const trade = await dbContext.TradeRequest.findByIdAndUpdate(id, { status })
    if (!trade) { throw new BadRequest('Bad Trade ID') }

    if (trade.status == 'accepted') {

      const offeredSet = await dbContext.LegoSets.findById(trade.offeredSetId)
      if (!offeredSet) { throw new BadRequest('Bad LegoSet ID') }
      const requestedSet = await dbContext.LegoSets.findById(trade.requestedSetId)
      if (!requestedSet) { throw new BadRequest('Bad LegoSet ID') }

      offeredSet.ownerId = trade.requestedAccountId
      requestedSet.ownerId = trade.ownerId

      offeredSet.save()
      requestedSet.save()
      //if there is a status of pending on any other trade requests iwth the same requestedSetId set them too rejected
      // also check offeredSetID and set other trades to rejected

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
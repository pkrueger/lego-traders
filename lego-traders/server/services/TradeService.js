
import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"



class TradeService {
  async tradeResponse(id, status) {
    const trade = await dbContext.TradeRequest.findById(id)
    if (!trade) { throw new BadRequest('Bad Trade ID') }
    logger.log(status)

    trade.status = status

    if (trade.status == 'accepted') {

      const offeredSet = await dbContext.LegoSets.findById(trade.offeredSetId)
      if (!offeredSet) { throw new BadRequest('Bad LegoSet ID') }
      const requestedSet = await dbContext.LegoSets.findById(trade.requestedSetId)
      if (!requestedSet) { throw new BadRequest('Bad LegoSet ID') }

      this.rejectOtherOffered(trade.offeredSetId)
      this.rejectOtherRequested(trade.requestedSetId)

      offeredSet.ownerId = trade.requestedAccountId
      requestedSet.ownerId = trade.ownerId

      offeredSet.save()
      requestedSet.save()
    }

    trade.save()
    return trade
  }
  //if there is a status of pending on any other trade requests iwth the same requestedSetId set them too rejected
  // also check offeredSetID and set other trades to rejected

  async rejectOtherOffered(offeredSetId) {
    const trades = await dbContext.TradeRequest.find({ offeredSetId })
    if (!trades) { return }
    let i = 0
    for (i; i <= trades.length; i++) {
      let trade = trades[i]
      trade.status = 'rejected'
      trade.save()
    }
  }
  async rejectOtherRequested(requestedSetId) {
    const trades = await dbContext.TradeRequest.find({ requestedSetId })
    if (!trades) { return }
    let i = 0
    for (i; i <= trades.length; i++) {
      let trade = trades[i]
      trade.status = 'rejected'
      trade.save()

    }
  }
  async makeTradeRequest(formData) {
    const trade = await dbContext.TradeRequest.create(formData)
    return trade
  }
  async getSentTrades(ownerId) {
    const trades = await dbContext.TradeRequest.find({ ownerId })
      .populate('owner', 'name picture')
      .populate('requestedAccount', 'name picture')
      .populate('offeredSet', 'name set_img_url')
      .populate('requestedSet', 'name set_img_url')
    return trades
  }
  async getReceivedTrades(requestedAccountId) {
    const trades = await dbContext.TradeRequest.find({ requestedAccountId })
      .populate('owner', 'name picture')
      .populate('requestedAccount', 'name picture')
      .populate('offeredSet', 'name set_img_url')
      .populate('requestedSet', 'name set_img_url')
    return trades
  }

}

export const tradeService = new TradeService()
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super(true)
    this
      .on('error', this.onError)
      .on('COMMENT_ADDED', this.addComment)
      .on('BECOME_NOTIFIED', this.becomeNotified)
      .on('CREATE_LEGO_SET', this.legoSetCreated)
      .on('NEW_TRADE_REQUEST', this.newTradeRequest)
      .on('NEW_TRADE_OFFER', this.newTradeOffer)
      .on('UPDATE_TRADE_REQUEST', this.updateTradeRequest)
  }
  updateTradeRequest(trade) {
    let index = AppState.sentTrades.findIndex(i => i.id == trade.id)
    AppState.sentTrades.splice(index, 1, trade)
  }
  newTradeRequest(trade) {
    AppState.receivedTrades.push(trade)
  }
  newTradeOffer(trade) {
    AppState.sentTrades.push(trade)
  }
  legoSetCreated(legoSet) {
    AppState.myLegoSets.push(legoSet)
      .on('JOINED_ROOM', this.joinedRoom)
  }
  becomeNotified(notification) {
    AppState.notifications.push(notification)
  }
  addComment(comment) {
    logger.log('COMMENT_ADDED', comment)
    addOrSkip(AppState.comments, comment)
  }
  onError(e) {
    Pop.toast(e.message, 'error')
  }

  joinedRoom(tradeId) {
    logger.log('JOINED_ROOM poopoohead', tradeId)
  }
}
function addOrSkip(arr, item) {
  let found = arr.find(i => i.id == item.id)
  if (!found) {
    arr.push(item)
  }
}
export const socketService = new SocketService()

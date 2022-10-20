import { AppState } from '../AppState.js'
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
  }
  newTradeRequest(trade) {
    AppState.receivedTrades.push(trade)
  }
  newTradeOffer(trade) {
    AppState.sentTrades.push(trade)
  }
  legoSetCreated(legoSet) {
    AppState.myLegoSets.push(legoSet)
  }
  becomeNotified(notification) {
    AppState.notifications.push(notification)
  }
  addComment(comment) {
    addOrSkip(AppState.comments, comment)
  }
  onError(e) {
    Pop.toast(e.message, 'error')
  }
}
function addOrSkip(arr, item) {
  let found = arr.find(i => i.id == item.id)
  if (!found) {
    arr.push(item)
  }
}
export const socketService = new SocketService()

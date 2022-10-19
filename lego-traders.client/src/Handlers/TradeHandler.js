import { socketService } from "../services/SocketService.js"

export class TradeHandler {

  static EnterTrade(tradeId) {
    socketService.emit('ENTER_TRADE', tradeId)
  }

  static LeaveTrade(tradeId) {
    socketService.emit('LEAVE_TRADE', tradeId)
  }

}
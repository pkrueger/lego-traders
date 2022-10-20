import { socketService } from "../services/SocketService.js"
import { logger } from "../utils/Logger.js"

export class TradeHandler {

  static EnterTrade(tradeId) {
    logger.log('enter trade')
    socketService.emit('ENTER_TRADE', tradeId)
  }

  static LeaveTrade(tradeId) {
    socketService.emit('LEAVE_TRADE', tradeId)
  }

}
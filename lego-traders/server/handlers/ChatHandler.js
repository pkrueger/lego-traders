import { SocketHandler } from '../utils/SocketHandler'

export class RegionHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket, true)
    this
      .on('ENTER_TRADE', this.enterTrade)
      .on('LEAVE_TRADE', this.leaveTrade)
  }

  enterTrade(tradeId) {
    this.socket.join(tradeId)
  }

  leaveTrade(tradeId) {
    this.socket.leave(tradeId)
  }
}
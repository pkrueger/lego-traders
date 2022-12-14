import { SocketHandler } from '../utils/SocketHandler'

export class ChatHandler extends SocketHandler {
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
    this.socket.emit('JOINED_ROOM', tradeId)
  }

  leaveTrade(tradeId) {
    this.socket.leave(tradeId)
  }
}
import { SocketHandler } from '../utils/SocketHandler'

export class NotificationHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    this
    // .on('SOCKET_TEST', this.testEvent)
    // .on('GET_NOTIFICATIONS', this.sendNo)
  }

  // async testEvent(payload) {
  //   this.socket.emit('IS_TESTED', payload)
  // }
}

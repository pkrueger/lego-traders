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
  }
  becomeNotified(notification) {
    AppState.notifications.unshift(notification)
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

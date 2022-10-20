export class Notification {
  constructor(data) {
    this.id = data.id;
    this.recipientId = data.recipientId;
    this.hasSeen = data.hasSeen;
    this.body = data.body;
    this.type = data.type;
    this.route = data.route;
  }
}

export class ForumPost {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.title = data.title
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.tag = data.tag || ''
    this.subscribers = data.subscribers
    this.creator = data.creator
  }
}
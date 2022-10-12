import { dbContext } from "../db/DbContext.js"

class CommentsService {
  async getCommentsByPostId(id) {
    const comments = await dbContext.Posts.findById(id)
    return comments
  }

}
export const commentsService = new CommentsService()
import { dbContext } from "../db/DbContext.js"

class CommentsService {
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    return comment
  }
  async getCommentsBySetNum(set_num) {
    const comments = await dbContext.Comments.find({set_num})
    return comments
  }
  async getCommentsByPostId(postId) {
    const comments = await dbContext.Comments.find({postId})
    return comments
  }

}
export const commentsService = new CommentsService()
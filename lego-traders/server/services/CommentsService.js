import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js";

class CommentsService {
  async deleteComment(commentId, userInfo) {
    const comment = await this.getCommentById(commentId)
    // NOTE again with the red squiggles!
     if (comment.creatorId != userInfo) {
      throw new Forbidden("This is not your Post.");
    }
    await dbContext.Comments.findByIdAndDelete(commentId)
    return comment
  }
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

  async getCommentById(commentId){
    const comment = await dbContext.Comments.findById(commentId)
    if(!comment){
      throw new BadRequest('Bad Comment Id')
    }
    return comment

  }

}
export const commentsService = new CommentsService()
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js";

class CommentsService {
  async deleteComment(commentId, userInfo) {
    const comment = await this.getCommentById(commentId)
    if (comment.creatorId != userInfo) {
      throw new Forbidden("This is not your Post.");
    }
    // await dbContext.Comments.findByIdAndDelete(commentId)
    // NOTE what is the difference between remove and delete?
    comment.delete()
    return comment
  }
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }
  async getCommentsBySetNum(set_num) {
    const comments = await dbContext.Comments.find({ set_num }).populate('creator', 'name picture')
    if (!comments) {
      throw new BadRequest('Invalid or Bad SetNum')
    }
    return comments
  }
  async getCommentsByPostId(postId) {
    const comments = await dbContext.Comments.find({ postId }).populate('creator', 'name picture')
    if (!comments) {
      throw new BadRequest('Invalid or Bad PostId')
    }
    return comments
  }

  async getCommentById(commentId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) {
      throw new BadRequest('Bad Comment Id')
    }
    return comment

  }

}
export const commentsService = new CommentsService()
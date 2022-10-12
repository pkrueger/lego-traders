import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController{
  constructor(){
    super('api/comments')
    this.router
    .get('/forum/:id', this.getCommentsByPostId)
  }
  async getCommentsByPostId(req, res, next) {
    try {
      const comment = await commentsService.getCommentsByPostId(req.params.id)
    } catch (error) {
      next(error)
    }
  }
}
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController{
  constructor(){
    super('api/comments')
    this.router
    .get('/forum/:id', this.getCommentsByPostId)
    .get('/sets/:set_num', this.getCommentsBySetNum)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('/forum/', this.createForumComment)
    .delete('/forum/', this.deleteForumComment)
  }
  async deleteForumComment(req, res, next) {
    
  }
  async createForumComment(req, res, next) {
    try {
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  async getCommentsBySetNum(req, res, next) {
    try {
      const comments = await commentsService.getCommentsBySetNum(req.params.set_num)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async getCommentsByPostId(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByPostId(req.params.id)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
}
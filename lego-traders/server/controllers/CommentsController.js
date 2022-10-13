import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
    .get('/forum/:postId', this.getCommentsByPostId)
    .get('/sets/:set_num', this.getCommentsBySetNum)
    .get('/:commentId', this.getCommentById)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('/forum/', this.createForumComment)
    .delete('/forum/:commentId', this.deleteForumComment)
    .post('/sets/', this.createSetComment)
    .delete('/sets/', this.deleteSetComment)
  }
  async deleteSetComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.id)
      res.send(comment)
      
    } catch (error) {
      next(error)
    }
  }
  async getCommentById(req, res, next) {
try {
  const comment = await commentsService.getCommentById(req.params.commentId)
  res.send(comment)
} catch (error) {
  next(error)
}  }
  async createSetComment(req, res, next) {
    try {
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  async deleteForumComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.commentId, req.userInfo.id)
      res.send(comment)
    } catch (error) {
      next(error)
    }
    
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
      const comments = await commentsService.getCommentsByPostId(req.params.postId)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
}
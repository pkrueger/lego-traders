import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .get('/forum/:postId', this.getCommentsByPostId)
      .get('/sets/:set_num', this.getCommentsBySetNum)
      .get('/trade/:tradeId', this.getCommentsByTradeId)
      .get('/:commentId', this.getCommentById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.deleteComment)
  }
  async getCommentsByTradeId(req, res, next) {
    try {
      const comments = await commentsService.getCommentByTradeId(req.params.tradeId)
      res.send(comments)
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
    }
  }
  async deleteComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.commentId, req.userInfo.id)
      res.send(comment)
    } catch (error) {
      next(error)
    }

  }
  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
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
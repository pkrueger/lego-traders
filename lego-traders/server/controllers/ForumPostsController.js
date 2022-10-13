import { Auth0Provider } from "@bcwdev/auth0provider";
import { forumPostsService } from "../services/ForumPostsService.js";
import BaseController from "../utils/BaseController.js";

export class ForumPostsController extends BaseController {
  constructor() {
    super('api/forum/posts')
    this.router
      .get('', this.getAllPosts)
      .get('/:postId', this.getPostByPostId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .delete(':postId', this.deletePost)
  }
  async deletePost(req, res, next) {
    try {
      const post = await forumPostsService.deletePost(req.params.postId, req.userInfo)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }
  async createPost(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const post = await forumPostsService.createPost(req.body)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }
  async getPostByPostId(req, res, next) {
    try {
      const posts = await forumPostsService.getPostByPostId(req.params.postId)
      res.send(posts)
    } catch (error) {
      next(error)
    }
  }
  async getAllPosts(req, res, next) {
    try {
      const posts = await forumPostsService.getAllPosts()
      res.send(posts)
    } catch (error) {
      next(error)
    }
  }
}
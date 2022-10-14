import { AppState } from "../AppState.js"
import { ForumPost } from "../models/ForumPost.js"
import { api } from "./AxiosService.js"

class ForumPostsService {
  async getPostById(id) {
    const res = await api.get(`/api/forum/posts/${id}`)
    AppState.activePost = res.data
  }
  async getPosts() {
    const res = await api.get('/api/forum/posts')
    AppState.forumPosts = res.data.map(p => new ForumPost(p))
  }
  async getPostComments(id) {
    const res = await api.get(`/api/comments/forum/${id}`)
    AppState.comments = res.data
  }
  async createPost(PostData) {
    const res = await api.post('/api/forum/posts', PostData)
    AppState.forumPosts.unshift(res.data)
    return res.data
  }
  async removePost(id) {
    await api.delete(`/api/forum/posts/${id}`)
    AppState.forumPosts = AppState.forumPosts.filter(p => p.id != id)
  }
  async removeComment(id) {
    await api.delete(`/api/comments/${id}`)
    AppState.comments = AppState.comments.filter(c => c.id != id)
  }
  async createComment(CommentData) {
    const res = await api.post(`/api/comments`, CommentData)
    AppState.comments.unshift(res.data)
    return res.data
  }
}
export const forumPostsService = new ForumPostsService()
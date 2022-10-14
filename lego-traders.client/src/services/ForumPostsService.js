import { AppState } from "../AppState.js"
import { ForumPost } from "../models/ForumPost.js"
import { api } from "./AxiosService.js"

class ForumPostsService {
  async getPostById(id) {
    const res = await api.get(`/api/forum/posts/${id}`)
    console.log(res.data)
    AppState.activePost = res.data
  }
  async getPosts() {
    const res = await api.get('/api/forum/posts')
    console.log(res.data)
    AppState.forumPosts = res.data.map(p => new ForumPost(p))
  }
  async getPostComments(id) {
    const res = await api.get(`/api/comments/forum/${id}`)
    console.log(res.data)
    AppState.comments = res.data
  }
}
export const forumPostsService = new ForumPostsService()
import { AppState } from "../AppState"
import { api } from "./AxiosService"
class CommentsService {
  async removeComment(id) {
    await api.delete(`/api/comments/${id}`)
    AppState.comments = AppState.comments.filter(c => c.id != id)
  }
  async createComment(CommentData) {
    const res = await api.post(`/api/comments`, CommentData)
    AppState.comments.unshift(res.data)
    return res.data
  }
  async getSetDetailsComments(set_num) {
    const res = await api.get(`/api/comments/sets/${set_num}`)
    console.log(res.data);
    AppState.comments = res.data
  }
  async getPostComments(id) {
    const res = await api.get(`/api/comments/forum/${id}`)
    AppState.comments = res.data
  }
 async getTradeComments(id){
  const res = await api.get(`/api/comments/trade/${id}`)
  AppState.comments = res.data
 }

}

export const commentsService = new CommentsService()
import { AppState } from "../AppState";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService";
class CommentsService {
  async removeComment(id) {
    await api.delete(`/api/comments/${id}`);
    AppState.comments = AppState.comments.filter((c) => c.id != id);
  }
  async createChatComment(CommentData) {
    const res = await api.post(`/api/comments`, CommentData);
    logger.log("create comment res", res.data);
    // AppState.comments.push(res.data);
    // return res.data;
  }
  async createComment(commentData){
    const res = await api.post('api/comments', commentData)
    AppState.comments.push(res.data)
  }
  async getSetDetailsComments(set_num) {
    const res = await api.get(`/api/comments/sets/${set_num}`);
    AppState.comments = res.data;
  }
  async getPostComments(id) {
    const res = await api.get(`/api/comments/forum/${id}`);
    AppState.comments = res.data;
  }
  async getTradeComments(id) {
    const res = await api.get(`/api/comments/trade/${id}`);
    AppState.comments = res.data;
  }
}

export const commentsService = new CommentsService();

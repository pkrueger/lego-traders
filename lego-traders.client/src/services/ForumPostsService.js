import { AppState } from "../AppState.js";
import { ForumPost } from "../models/ForumPost.js";
import { api } from "./AxiosService.js";

class ForumPostsService {
  async getPostById(id) {
    const res = await api.get(`/api/forum/posts/${id}`);
    AppState.activePost = res.data;
    return res.data;
  }
  async getPosts() {
    const res = await api.get("/api/forum/posts");
    AppState.forumPosts = res.data.map((p) => new ForumPost(p));
  }

  async createPost(PostData) {
    const res = await api.post("/api/forum/posts", PostData);
    AppState.forumPosts.unshift(res.data);
    return res.data;
  }
  async removePost(id) {
    await api.delete(`/api/forum/posts/${id}`);
    AppState.forumPosts = AppState.forumPosts.filter((p) => p.id != id);
  }
}
export const forumPostsService = new ForumPostsService();

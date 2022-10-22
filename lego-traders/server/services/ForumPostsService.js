import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class ForumPostsService {
  async deletePost(postId, userInfo) {
    const post = await this.getPostByPostId(postId);
    // NOTE look at this!!!!--v
    if (post.creatorId != userInfo.id) {
      throw new Forbidden("This is not your Post.");
    }
    await dbContext.Posts.findByIdAndDelete(postId);
    const comments = await dbContext.Comments.find({ postId })
    if (comments) { for (let c of comments) { await c.delete } }
    const notifications = await dbContext.Notifications.deleteMany({ route: { postId } })
    // find({ route: { postId } })
    // if (notifications) { for (let n of notifications) { await n.delete } }
    return post;
  }
  async createPost(postData, accountId) {
    const post = await dbContext.Posts.create(postData);
    await post.populate("creator", "name picture");
    post.subscribers.push(accountId);
    post.save();
    return post;
  }
  async getPostsByCreatorId(creatorId) {
    const posts = await dbContext.Posts.find({ creatorId }).populate(
      "creator",
      "name picture"
    );

    return posts;
  }
  async getPostByPostId(postId) {
    const post = await dbContext.Posts.findById(postId).populate(
      "creator",
      "name picture"
    );
    if (!post) {
      throw new BadRequest("Bad Post Id");
    }
    return post;
  }
  async getAllPosts() {
    const posts = await dbContext.Posts.find().populate(
      "creator",
      "name picture"
    );
    return posts;
  }
}

export const forumPostsService = new ForumPostsService();

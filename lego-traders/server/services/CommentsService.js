import { dbContext } from "../db/DbContext.js";
import { PostSchema } from "../models/Post.js";
import { socketProvider } from "../SocketProvider.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { forumPostsService } from "./ForumPostsService.js";

class CommentsService {
  //NOTE Does this work? VVVVVVVVVV
  async deleteAllCommentsOnPost(postId) {
    const comments = await dbContext.Comments.deleteMany({ postId })
    return comments
  }
  async deleteComment(commentId, userInfo) {
    const comment = await this.getCommentById(commentId);
    if (comment.creatorId != userInfo) {
      throw new Forbidden("This is not your Post.");
    }
    // await dbContext.Comments.findByIdAndDelete(commentId)
    // NOTE what is the difference between remove and delete?
    comment.delete();
    return comment;
  }
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData);
    await comment.populate("creator", "name picture");
    if (comment.postId) {
      const post = await forumPostsService.getPostByPostId(comment.postId);
      if (!post.subscribers.includes(comment.creatorId)) {
        post.subscribers = [...post.subscribers, comment.creatorId];
        post.save();
      }
    }
    // if(comment.tradeId != ''){
    //   socketProvider.messageRoom(comment.tradeId, 'COMMENT_ADDED', comment)
    // }else
      //     if (req.body.tradeId) {
      //   socketProvider.messageRoom(req.body.tradeId, 'COMMENT_ADDED', comment)
      //   res.send(comment)
      // } else {
      //   res.send(comment)
      // }

    await comment.save();
    return comment;
  }

  //TODO We could combine these gets to one get using params
  async getCommentByTradeId(tradeId) {
    const comments = await dbContext.Comments.find({ tradeId }).populate(
      "creator",
      "name picture"
    );
    if (!comments) {
      throw new BadRequest("Invalid or Bad SetNum");
    }
    return comments;
  }

  async getCommentsBySetNum(set_num) {
    const comments = await dbContext.Comments.find({ set_num }).populate(
      "creator",
      "name picture"
    );
    if (!comments) {
      throw new BadRequest("Invalid or Bad SetNum");
    }
    return comments;
  }
  async getCommentsByPostId(postId) {
    const comments = await dbContext.Comments.find({ postId }).populate(
      "creator",
      "name picture"
    );
    if (!comments) {
      throw new BadRequest("Invalid or Bad PostId");
    }
    return comments;
  }

  async getCommentById(commentId) {
    const comment = await dbContext.Comments.findById(commentId);
    if (!comment) {
      throw new BadRequest("Bad Comment Id");
    }
    return comment;
  }
}
export const commentsService = new CommentsService();

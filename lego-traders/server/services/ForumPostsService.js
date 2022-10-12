import { dbContext } from "../db/DbContext.js"

class ForumPostsService {
  async createPost(postData) {
  const post = await dbContext.Posts.create(postData)  
  await post.populate('creator', 'name picture')
  return post
 }
  async getPostsByCreatorId(creatorId) {
    const posts = await dbContext.Posts.find(creatorId).populate('creator', 'name picture')
    

    return posts
  }
  async getPostByPostId(id) {
    const post = await dbContext.Posts.findById(id).populate('creator', 'name picture')
    return post
  }
  async getAllPosts() {
    const posts = await dbContext.Posts.find().populate('creator', 'name picture')
    return posts
  }
  
}

export const forumPostsService = new ForumPostsService()
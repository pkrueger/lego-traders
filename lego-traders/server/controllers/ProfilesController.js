import { forumPostsService } from '../services/ForumPostsService.js'
import { legoSetsService } from '../services/LegoSetsService.js'
import { mocsService } from '../services/MocsService.js'
import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .get('/:creatorId/posts', this.getPostsByCreatorId)
      .get('/:creatorId/mocs', this.getMocsByCreatorId)
  }
  async getMocsByCreatorId(req, res, next) {
    try {
      const mocs = await mocsService.getMocsByCreatorId(req.params.creatorId)
      res.send(mocs)
    } catch (error) {
      next(error)
    }
  }
  async getPostsByCreatorId(req, res, next) {
    try {
      const posts = await forumPostsService.getPostsByCreatorId(req.params.creatorId)
      res.send(posts)
    } catch (error) {
      next(error)
    }
  }
  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }
}

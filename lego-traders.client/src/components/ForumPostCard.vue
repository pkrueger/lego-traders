<template>
  <div class="bg-white p-3 d-flex">
    <router-link :to="{name: 'Profile', params:{profileId:post.creatorId}}">
      <div class="profile-picture-container px-2"><img class="profile-picture img-fluid" :src="post.creator.picture"
          alt="Profile Img"></div>
    </router-link>
    <div class="w-100 bg-primary rounded p-1">
      <div class="d-flex">
        <div class="d-flex px-2 pt-2 justify-content-between w-100">
          <div>
            <p class="mb-1">{{post.creator.name}}</p>
          </div>
        </div>
        <div>
          <div class=" me-3">
            <p class="bg-secondary px-3 mt-2 m-0">tag</p>
          </div>
        </div>

        <div>
          <button @click="removePost(post.id)" class="btn selectable" aria-label="Delete this Comment?"
            :style="post.creatorId == account.id ? '': 'visibility: hidden'">
            <i class="mdi mdi-close" title="delete comment" aria-label="delete comment"></i>
          </button>
        </div>
      </div>
      <router-link :to="{name: 'ForumPost', params:{ postId:post.id }}">
        <div class="px-2">
          <h4>{{post.title}}</h4>
        </div>
      </router-link>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { ForumPost } from '../models/ForumPost.js';
import { forumPostsService } from '../services/ForumPostsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    post: {
      type: ForumPost,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async removePost(id) {
        try {
          const yes = await Pop.confirm('Do you want to remove your post?')
          if (!yes) { return }
          await forumPostsService.removePost(id)
        } catch (error) {
          Pop.error('[RemovePost]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-picture {
  height: 5rem;
  width: 5rem;
  border-radius: .5rem;

  object-fit: scale-down;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
<template>
  <div class="bg-primary p-3 d-flex">
    <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
      <div class="profile-picture-container profile-picture px-2 d-flex align-items-center"><img class=" img-fluid"
          :src="post.creator.picture" alt="Profile Img"></div>
    </router-link>
    <div class="w-100 bg-light p-1">
      <div class="d-flex">
        <div class="d-flex flex-grow-1 px-2 pt-2 justify-content-between">
          <div>
            <p class="mb-1">{{ post.creator.name }}</p>
          </div>
        </div>
        <div>
          <div class="me-3">
            <p class="px-3 mt-2 bg-warning m-0 rounded">{{ post.tag }}</p>
          </div>
        </div>
        <div>
          <button @click="removePost(post.id)" class="btn selectable" aria-label="Delete this Comment?"
            :style="post.creatorId == account.id ? '' : 'visibility: hidden'">
            <i class="mdi mdi-close" title="delete comment" aria-label="delete comment"></i>
          </button>
        </div>
      </div>
      <router-link :to="{ name: 'ForumPost', params: { postId: post.id } }">
        <div class="px-2">
          <h4>{{ post.title }}</h4>
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
  height: 100%;
  width: 5rem;
  object-fit: scale-down;
  border-right: 1px solid gray;
  background-color: white;
}

a {
  text-decoration: none;
  color: inherit;
  outline: none;
}
</style>
<template>
  <div class="bg-light p-3">
    <div class="d-flex gap-3">
      <router-link :to="{name: 'Profile', params:{profileId:post.creatorId}}">
        <div class="profile-picture-container"><img class="profile-picture img-fluid" :src="post.creator.picture"
            alt="Profile Img"></div>
      </router-link>
      <div class="d-flex justify-content-between w-100">
        <router-link :to="{name: 'ForumPost', params:{ postId:post.id }}">
          <div>
            <h5>{{post.creator.name}}</h5>
            <h4>{{post.title}}</h4>
          </div>
        </router-link>
      </div>
      <div>
        <button @click="removePost(post.id)" class="btn selectable" aria-label="Delete this Comment?"
          v-if="post.creatorId == account.id">
          <i class="mdi mdi-close" title="delete comment" aria-label="delete comment"></i>
        </button>
      </div>

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
  object-fit: fill;
}

a {
  color: black;
}
</style>
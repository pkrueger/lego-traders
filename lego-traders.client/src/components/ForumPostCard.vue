<template>
  <router-link :to="{name: 'ForumPost', params:{ postId:post.id }}">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-start gap-3">
          <div class="profile-picture-container"><img class="profile-picture img-fluid" :src="post.creator.picture"
              alt="Profile Img"></div>
          <div>
            <h4>{{post.creator.name}}</h4>
            <h5>{{post.title}}</h5>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
import { ForumPost } from '../models/ForumPost.js';

export default {
  props: {
    post: {
      type: ForumPost,
      required: true
    }
  },
  setup() {
    return {}
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
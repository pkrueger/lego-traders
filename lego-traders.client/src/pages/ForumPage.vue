<template>
  <div class="container-fluid forum-page">
    <div class="row justify-content-center p-4">
      <div class="col-md-6">
        <div class="row">
          <div class="col-12" v-for="post in forumPosts">
            <ForumPostCard class="w-100" :key="post.id" :post="post" />
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="card">
          <div class="card-body">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { onMounted } from 'vue';
import { forumPostsService } from '../services/ForumPostsService.js'
import Pop from '../utils/Pop.js';
import ForumPostCard from '../components/ForumPostCard.vue';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';

export default {
  setup() {
    async function getPosts() {
      try {
        await forumPostsService.getPosts();
      }
      catch (error) {
        Pop.error("[getPosts]", error);
      }
    }
    onMounted(() => {
      getPosts();
    });
    return {
      forumPosts: computed(() => AppState.forumPosts)
    };
  },
  components: { ForumPostCard }
}
</script>


<style lang="scss" scoped>
.forum-page {
  background-image: url('blue-lego.webp');
  background-size: fill;
  background-position: top left;
  height: 100vh;
}
</style>
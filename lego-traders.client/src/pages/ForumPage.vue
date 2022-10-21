<template>
  <div class="container-fluid forum-page">
    <div class="row justify-content-center p-4">
      <div class="col-md-4">
        <div class="bg-light p-5 rounded forum-form">
          <div class="mb-3 text-center">
            <h4>Make A Post!</h4>
          </div>
          <div class="bg-warning rounded p-3 w-100">
            <ForumPostForm />
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="row scroll">
          <div class="col-12 mb-3" v-for="post in forumPosts">
            <ForumPostCard class="w-100" :key="post.id" :post="post" />
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
import ForumPostForm from '../components/ForumPostForm.vue';

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
  components: { ForumPostCard, ForumPostForm }
}
</script>


<style lang="scss" scoped>
.scroll {
  height: 85vh;
  overflow-y: auto;
}

.forum-page {
  background-image: url('blue-lego.webp');
  background-size: auto;
  background-position: top left;
  height: 91.4vh;

  .forum-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40vh;
  }
}
</style>
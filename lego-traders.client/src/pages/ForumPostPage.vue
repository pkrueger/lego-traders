<template>
  <div class="container-fluid post-detail-page">
    <div class="row">
      <div class="col-md-8 my-3">
        <div class="row">
          <div class="col-12">
            <div class="bg-dark w-100 p-3 rounded">
              <div>
                <h3>{{post.title}}</h3>
                <h5>{{post.body}}</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-10 my-3">
            <div class="bg-dark w-100 p-3 rounded">
              <ForumComment />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 my-3">
        <div class="bg-dark w-100 p-3 rounded">
          <img :src="post.creator.picture" alt="" class="img-fluid">
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { forumPostsService } from '../services/ForumPostsService.js';
import Pop from '../utils/Pop.js';
import ForumComment from '../components/ForumComment.vue';

export default {
  setup() {
    const route = useRoute();
    async function getPostById() {
      try {
        await forumPostsService.getPostById(route.params.postId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function getPostComments() {
      try {
        await forumPostsService.getPostComments(route.params.postId)
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getPostComments()
      getPostById();
    });
    return {
      post: computed(() => AppState.activePost)
    };
  },
  components: { ForumComment }
}
</script>


<style lang="scss" scoped>
.component {
  background-image: url();
}
</style>
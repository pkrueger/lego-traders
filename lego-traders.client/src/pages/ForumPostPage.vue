<template>
  <div class="container-fluid post-detail-page">
    <div class="row">
      <div class="col-md-9 my-3">
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
          <div class="col-md-9 my-3">
            <div class="bg-dark w-100 p-3 rounded">
              <div class="collapse" id="collapseCommentForm">
                <div class="bg-warning rounded p-3">
                  <CommentForm />
                </div>
              </div>
              <ForumComment v-for="c in comments" :key="c.id" :comment="c" />
            </div>
          </div>
          <div class="col-md-2">
            <div class="my-3"><button class="btn btn-warning" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseCommentForm" aria-expanded="false" aria-controls="collapseCommentForm">
                Post a Comment
              </button></div>
          </div>
        </div>
      </div>
      <div class="col-md-3 my-3">
        <div class="bg-dark w-100 p-3 rounded">
          <!-- <router-link :to="{name: 'Profile', params:{ profileId: post?.creatorId }}"> -->
          <img :src="post.creator?.picture" alt="" class="img-fluid">
          <!-- </router-link> -->
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
import CommentForm from '../components/CommentForm.vue';

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
      comments: computed(() => AppState.comments),
      post: computed(() => AppState.activePost)
    };
  },
  components: { ForumComment, CommentForm }
}
</script>


<style lang="scss" scoped>
.post-detail-page {
  background-image: url('blue-lego.webp');
  height: 100vh;
  background-position: top left;
  background-size: fill;
}
</style>
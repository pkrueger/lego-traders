<template>
  <div class="container-fluid post-detail-page">
    <div class="row">
      <div class="col-md-9 my-3">
        <div class="row">
          <div class="col-12">
            <div class="bg-dark w-100 p-3 rounded">
              <div>
                <h3>{{ post.title }}</h3>
                <h5>{{ post.body }}</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-9 my-3">
            <div class="bg-dark w-100 p-3 rounded">
              <ForumComment v-for="c in comments" :key="c.id" :comment="c" />
              <div class="bg-warning rounded p-3">
                <CommentForm />
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="col-md-3 my-3">
        <div class="bg-dark w-100 p-3 rounded">
          <img :src="post.imgUrl || post.creator?.picture" alt="" class="img-fluid" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import Pop from "../utils/Pop.js";
import ForumComment from "../components/ForumComment.vue";
import CommentForm from "../components/CommentForm.vue";
import { forumPostsService } from "../services/ForumPostsService.js";

export default {
  watch: {
    $route(to, from) {
      if (to != from) {
        this.getPostComments();
        this.getPostById();
      }
    },
  },
  setup() {
    const route = useRoute();
    async function getPostById() {
      try {
        await forumPostsService.getPostById(route.params.postId);
      } catch (error) {
        Pop.error(error);
      }
    }
    async function getPostComments() {
      try {
        await commentsService.getPostComments(route.params.postId);
      } catch (error) {
        Pop.error(error);
      }
    }
    onMounted(() => {
      getPostComments();
      getPostById();
    });
    return {
      comments: computed(() => AppState.comments),
      post: computed(() => AppState.activePost),
      getPostComments,
      getPostById,
    };
  },
  components: { ForumComment, CommentForm },
};
</script>

<style lang="scss" scoped>
.post-detail-page {
  background-image: url("blue-lego.webp");
  height: 100vh;
  background-position: top left;
  background-size: fill;
}
</style>

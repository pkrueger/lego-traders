<template>
  <div>
    <form @submit.prevent="handleSubmit()">
      <div class="mb-3">
        <textarea type="text" class="form-control" id="body" v-model="editable.body" placeholder="body" rows="3"
          required aria-label="comment body"></textarea>
      </div>
      <div class="mb-3 d-flex justify-content-end">
        <button type="submit" class="btn btn-success" aria-label="Post">Post</button>
      </div>
    </form>
  </div>
</template>


<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { AuthService } from '../services/AuthService.js';
import { forumPostsService } from '../services/ForumPostsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({ postId: '' })
    const route = useRoute()
    return {
      editable,
      async handleSubmit() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect()
          }
          editable.value.postId = route.params.postId
          await forumPostsService.createComment(editable.value)
          Pop.success('You made a Post!')
        } catch (error) {
          Pop.error('[CreateComment]', error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
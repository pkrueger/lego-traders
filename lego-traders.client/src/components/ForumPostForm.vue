<template>
  <form @submit.prevent="handleSubmit()">
    <div class="mb-3">
      <div class="flex-grow-1">
        <input type="text" class="form-control" id="title" v-model="editable.title"
          placeholder="What is the Title of your Post">
      </div>
    </div>
    <div class="mb-3">
      <textarea type="text" class="form-control" id="body" v-model="editable.body" placeholder="body" rows="3" required
        aria-label="comment body"></textarea>
    </div>
    <div class="collapse mb-3" id="collapsTags">
      <div class="d-flex gap-3 flex-wrap">
        <div class="form-check">
          <input class="form-check-input" type="radio" v-model="editable.tag" value="" id="none">
          <label class="form-check-label" for="none">
            None
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" v-model="editable.tag" value="Star Wars" id="starWars">
          <label class="form-check-label" for="starWars">
            Star Wars
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" v-model="editable.tag" value="Technic" id="technic">
          <label class="form-check-label" for="technic">
            Technic
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" v-model="editable.tag" value="Harry Potter" id="harryPotter">
          <label class="form-check-label" for="harryPotter">
            Harry Potter
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" v-model="editable.tag" value="Architecture" id="architecture">
          <label class="form-check-label" for="architecture">
            Architecture
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" v-model="editable.tag" value="Bionical" id="bionical">
          <label class="form-check-label" for="bionical">
            Bionical
          </label>
        </div>
      </div>
    </div>
    <div class="mb-3 d-flex justify-content-between">
      <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapsTags"
        aria-expanded="false" aria-controls="collapsTags">
        Add Tags
      </button>
      <button type="submit" class="btn btn-primary" aria-label="Post">Post</button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import { AppState } from '../AppState.js';
import { AuthService } from '../services/AuthService.js';
import { forumPostsService } from '../services/ForumPostsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect()
          }
          await forumPostsService.createPost(editable.value)
          Pop.success('You made a Post!')
        } catch (error) {
          Pop.error('[CreatePost]', error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
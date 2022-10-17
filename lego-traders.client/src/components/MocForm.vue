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
    <div class="mb-3 d-flex justify-content-end">
      <button type="submit" class="btn btn-success" aria-label="Post">Post</button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue'
import { AppState } from '../AppState.js'
import { AuthService } from '../services/AuthService.js'
import { mocsService } from '../services/MocsService.js'
import Pop from '../utils/Pop.js'

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
          await mocsService.createMoc(editable.value)
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
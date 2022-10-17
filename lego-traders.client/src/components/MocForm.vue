<template>
  <form @submit.prevent="handleSubmit()">
    <div class="modal-body">
      <div class="mb-3">
        <div class="flex-grow-1">
          <input type="text" class="form-control" id="name" v-model="editable.name"
            placeholder="What is the Name of your Creation">
        </div>
      </div>
      <div class="mb-3">
        <div class="flex-grow-1">
          <input type="url" class="form-control" id="moc-img" v-model="editable.moc_img"
            placeholder="www.picture-link.com">
        </div>
      </div>
      <div class="mb-3">
        <textarea type="text" class="form-control" id="desc" v-model="editable.desc" placeholder="description" rows="3"
          required aria-label="comment body"></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create</button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue'
import { AppState } from '../AppState.js'
import { AuthService } from '../services/AuthService.js'
import { mocsService } from '../services/MocsService.js'
import Pop from '../utils/Pop.js'
import MOCFormStep from './MOCFormStep.vue'

export default {
  setup() {
    const editable = ref({});
    return {
      editable,
      async handleSubmit() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect();
          }
          await mocsService.createMoc(editable.value);
          Pop.success("You made a Post!");
        }
        catch (error) {
          Pop.error("[CreatePost]", error);
        }
      },
    };
  },
  components: { MOCFormStep }
}
</script>


<style lang="scss" scoped>

</style>
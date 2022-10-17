<template>
  <form @submit.prevent="handleSubmit()">
    <div class="modal-body">
      <div class="mb-3">
        <div class="flex-grow-1">
          <input type="url" class="form-control" id="img" v-model="editable.img" placeholder="www.picture-link.com">
        </div>
      </div>
      <div class="mb-3">
        <div class="flex-grow-1">
          <img :src="editable?.img" alt="step img" class="img-fluid">
        </div>
      </div>
      <div class="mb-3">
        <textarea type="text" class="form-control" id="text" v-model="editable.text" placeholder="Instructions" rows="3"
          required aria-label="instructions body"></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { mocsService } from '../services/MocsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      route,
      editable,
      async handleSubmit() {
        try {
          await mocsService.createStep(route.params.mocId, editable.value)
        } catch (error) {
          Pop.error('[create a step]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
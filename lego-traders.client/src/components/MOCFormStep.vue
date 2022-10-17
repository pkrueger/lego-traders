<template>
  <div class="mb-3">
    <div class="flex-grow-1">
      <input type="url" class="form-control" id="stepImg" v-model="editable.img" placeholder="www.picture-link.com">
    </div>
  </div>
  <!-- <div class="mb-3">
    <div class="flex-grow-1">
      <img :src="editable.moc_steps?.img" alt="step img">
    </div>
  </div> -->
  <div class="mb-3">
    <div class="flex-grow-1">
      <input type="text" class="form-control" id="stepText" v-model="editable.text">
    </div>
  </div>
  <button type="button" @click="getStep">Save</button>
</template>


<script>
import { ref } from 'vue';

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      getStep() {
        this.$emit("saveStep", editable.value)
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
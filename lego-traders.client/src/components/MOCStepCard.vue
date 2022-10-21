<template>
  <div class="col-12 my-4">
    <div class="bg-dark p-4 rounded d-flex">
      <img :src="step.img" alt="step img" class="step-img img-fluid">
      <div>
        <p>{{step.text}}</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.step-img {
  height: auto;
  width: 50%;
}
</style>
<template>
  <div class="p-3 bg-dark rounded">
    <router-link :to="{ name: 'MOCSteps', params: { mocId: mocSet.id } }">
      <img :src="mocSet.moc_img" :alt="mocSet.name" class="card-img-top" />
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    mocSet: { type: Object, required: true },
  },

  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
// TODO MAKE A ONHOVER EFFECT TO SHOW THE CREATOR OR NAME
</style>

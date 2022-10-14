<template>
  <div class="card">
    <router-link
      :to="{ name: 'MOCSteps', params: { mocId: mocSet.id } }"
    ></router-link>
    <img :src="mocSet.moc_img" :alt="mocSet.name" class="card-img-top" />
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

<style lang="scss" scoped></style>

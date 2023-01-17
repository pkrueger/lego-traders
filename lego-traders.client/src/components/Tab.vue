<template>
  <div class="tab" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Tab",
    },
  },
  setup() {
    return {
      isActive: true,
    };
  },
};
</script>

<style lang="scss" scoped></style>

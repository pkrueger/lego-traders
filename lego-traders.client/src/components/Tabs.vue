<template>
  <div>
    <ul class="tabs__header">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="selectTab(index)"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  setup() {
    return {
      selectedIndex: 0,
      tabs: [],
    };
  },
  created() {
    this.tabs = this.$children;
  },
  // mounted() {
  //   this.selectTab(0);
  // },
  // // methods: {
  // //   selectTab(i) {
  // //     this.selectedIndex = i;
  // //     this.tabs.forEach((tab, index) => {
  // //       tab.isActive = index === i;
  // //     });
  // //   },
  // // },
};
</script>

<style lang="scss" scoped></style>

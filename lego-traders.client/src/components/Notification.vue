<template>
  <router-link :to="notification.route">
    <div class="d-flex gap-2 align-items-center p-2">
      <div class="mx-2">
        <i
          class="fa-regular fa-circle-check text-success"
          v-if="notification.type == 'trade-accepted'"
        ></i>
        <i
          class="fa-regular fa-circle-xmark text-danger"
          v-else-if="notification.type == 'trade-rejected'"
        ></i>
        <i
          class="fa-regular fa-circle-dot text-warning"
          v-if="notification.type == 'trade-pending'"
        ></i>
        <i
          class="fa-regular fa-comment text-primary"
          v-if="notification.type == 'forum-comment-owned'"
        ></i>
        <i
          class="fa-regular fa-comment text-primary"
          v-if="notification.type == 'forum-comment-unowned'"
        ></i>
        <i
          class="fa-solid fa-scale-balanced text-dark"
          v-if="notification.type == 'wishlist-set-available'"
        ></i>
      </div>
      <p class="mb-0">{{ notification.body }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: { notification: { type: Object, required: true } },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  color: #dd1a21;
}

i {
  font-size: 1.4rem;
}
</style>

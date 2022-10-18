<template>
  <div class="d-flex align-items-center">
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
        class="fa-solid fa-scale-balanced primary"
        v-if="notification.type == 'wishlist-set-available'"
      ></i>
    </div>
    <p class="mb-0">{{ notification.body }}</p>
  </div>
</template>

<script>
import { Notification } from "../models/Notification.js";

export default {
  props: { notification: { type: Notification, required: true } },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

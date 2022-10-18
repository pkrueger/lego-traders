<template>
  <p class="d-flex">
    {{comment.body}}
  </p>

</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { commentsService } from '../services/CommentsService.js'

export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-picture {
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  object-fit: fill;
}

.comment-text {
  border-radius: .3rem;

  p {
    margin: unset;
  }
}
</style>
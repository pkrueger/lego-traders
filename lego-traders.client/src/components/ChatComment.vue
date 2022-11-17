<template>

  <div class="d-flex bg-success my-2 rounded p-2 align-items-center text-stuff" v-if="comment.creator.id != account.id">
    <img class="profile-picture" :src="comment.creator.picture" :alt="comment.creator.name"
      :title="comment.creator.name">
    <p class="pt-3 ms-3">
      {{ comment.body }}
    </p>
  </div>
  <div class="d-flex bg-primary my-2 rounded p-2 justify-content-end align-items-center"
    v-if="comment.creator.id == account.id">
    <p class="pt-3 ps-2 me-3 text-stuff">{{ comment.body }}</p>
    <img class="profile-picture" :src="comment.creator.picture" :alt="comment.creator.name"
      :title="comment.creator.name">
  </div>

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
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  object-fit: cover;
}

.comment-text {
  border-radius: .3rem;


  p {
    margin: unset;

  }
}

.text-stuff {
  overflow-wrap: unset;

}
</style>
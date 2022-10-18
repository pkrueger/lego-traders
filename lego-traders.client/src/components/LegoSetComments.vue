<template>
  <div class="d-flex p-2 align-items-center">
    <div>
      <img class="profile-picture" :src="comment.creator?.picture" alt="Im the profile picture"
        :title="comment.creator?.name">
    </div>
    <div class="comment-text ms-2 bg-info d-flex flex-grow-1 p-3 justify-content-between">
      <div>
        <h5>{{comment.creator?.name}}</h5>
        <p>{{comment.body}}</p>
      </div>
      <div>
        <button @click="removeComment()" class="btn selectable" aria-label="Delete this Comment?"
          v-if="comment.creatorId == account.id">
          <i class="mdi mdi-close" title="delete comment" aria-label="delete comment"></i>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { commentsService } from "../services/commentsService.js"
import Pop from "../utils/Pop"
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async removeComment() {
        try {
          const yes = await Pop.confirm('Delete Your Comment')
          if (!yes) { return }
          await commentsService.removeComment(props.comment.id)
        } catch (error) {
          Pop.error('[Remove Comment]', error)
        }
      }
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
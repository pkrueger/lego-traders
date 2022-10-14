<template>
  <div class="d-flex p-2 align-items-center">
    <div>
      <img :src="comment.creator.picture" alt="Im the profile picture" :title="comment.creator.name">
    </div>
    <div class="comment-text ms-2 bg-info d-flex flex-grow-1 p-3 justify-content-between">
      <div>
        <h5>{{comment.creator.name}}</h5>
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
export default {
  props: {
    comment: {
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

</style>
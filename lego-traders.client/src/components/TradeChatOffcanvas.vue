<template>
  <div class="trade-chat-offcanvas">
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <!-- NOTE chat comments go here -->
        <ChatComment v-for="c in comments" :key="c.id" :comment="c" />
      </div>
    </div>

  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';
import ChatComment from './ChatComment.vue';
export default {
  setup() {
    onMounted(() => {
      getTradeComments()
    })
    async function getTradeComments() {

    }
    return {
      activeTrade: computed(() => AppState.activeTrade)
    };
  },
  components: { ChatComment }
}
</script>


<style lang="scss" scoped>

</style>
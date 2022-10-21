<template>
  <div class="trade-chat-offcanvas">
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header d-flex justify-content-end">
        <!-- <h5 class="offcanvas-title" id="offcanvasRightLabel">Trade Chat</h5> -->
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column justify-content-between">
        <!-- NOTE chat comments go here -->
        <div>
          <ChatComment v-for="c in comments" :key="c.id" :comment="c" />

        </div>
      </div>
      <form class="flex-end" @submit.prevent="handleSubmit()">

        <div class="input-group mb-3">
          <!-- TODO clear field after submit v -->
          <input type="text" class="form-control ms-2" v-model="editable.body" placeholder="What you say?!"
            aria-label="Recipient's username" aria-describedby="button-addon2">
          <button class="btn btn-outline-secondary me-2" type="submit" id="button-addon2">Button</button>
        </div>
      </form>
    </div>

  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { Offcanvas } from 'bootstrap';
import { onMounted, ref, watchEffect } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { TradeHandler } from '../Handlers/TradeHandler.js';
import { AuthService } from '../services/AuthService.js';
import { commentsService } from '../services/CommentsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import ChatComment from './ChatComment.vue';
export default {

  setup() {
    const editable = ref({})
    const route = useRoute();

    // onBeforeRouteLeave(() => {
    //   TradeHandler.LeaveTrade(AppState.activeTrade.id)
    // })
    onMounted(() => {
      const myOffcanvas = Offcanvas.getOrCreateInstance('#offcanvasRight')
      logger.log('offcan', myOffcanvas)
      myOffcanvas._element.addEventListener('shown.bs.offcanvas', event => {
        TradeHandler.EnterTrade(AppState.activeTrade.id)
      })
      myOffcanvas._element.addEventListener('hide.bs.offcanvas', event => {
        TradeHandler.LeaveTrade(AppState.activeTrade.id)
      })
    })
    // myOffcanvas.addEventListener('show.bs.offcanvas', event => {
    //   TradeHandler.EnterTrade(AppState.activeTrade.id)
    // })



    return {
      editable,
      comments: computed(() => AppState.comments),
      async handleSubmit() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect()
          }
          editable.value.tradeId = AppState.activeTrade.id
          await commentsService.createComment(editable.value)

        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
  components: { ChatComment }
}
</script>


<style lang="scss" scoped>

</style>
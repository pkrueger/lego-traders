<template>
  <div class="card">
    <div class="card-header">
      <h5>Your Trades</h5>
    </div>
    <div class="card-body">
      <div>
        <strong>Sent</strong>
        <div v-for="t in sentTrades" class="d-flex justify-content-around">
          <img aria-controls="offcanvasRight" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
            class="selectable" :src="t.requestedAccount.picture" height="40" alt="" @click="getTradeComments(t)" />
          <p>
            Requested Set:
            <img class="me-auto" height="30" :src="t.requestedSet.set_img_url" :alt="t.requestedSet.name"
              :title="t.requestedSet.name" />
            <span v-if="t.body" class="message">
              <i class="mdi mdi-note-outline"></i>
              <span class="message-body">{{ t.body }}</span>
            </span>
          </p>
          <p>Status: {{ t.status }}</p>
          <p>
            Offered Set:
            <img class="" height="30" :src="t.offeredSet.set_img_url" :alt="t.offeredSet.name"
              :title="t.offeredSet.name" />
          </p>
          <i v-if="t.status != 'pending'" class="mdi mdi-close text-danger" @click="removeTrade(t.id)"></i>
        </div>
      </div>
      <div>
        <strong>Requested</strong>
        <div v-for="t in receivedTrades" class="d-flex justify-content-around">
          <img class="selectable" aria-controls="offcanvasRight" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" :src="t.owner.picture" height="40" alt="" @click="getTradeComments(t)" />
          <p>
            Offered Set:
            <img class="" height="30" :src="t.offeredSet.set_img_url" :alt="t.offeredSet.name"
              :title="t.offeredSet.name" />
            <span v-if="t.body" class="message">
              <i class="mdi mdi-note-outline"></i>
              <span class="message-body">{{ t.body }}</span>
            </span>
          </p>
          <p v-if="t.status == 'pending'">
            <button class="m-1" @click="changeStatus(t.id, 'accepted')">Accept</button>
            <button @click="changeStatus(t.id, 'rejected')">Reject</button>
          </p>
          <p v-else>Status: {{ t.status }}</p>
          <p>
            Requested Set:
            <img class="me-auto" height="30" :src="t.requestedSet.set_img_url" :alt="t.requestedSet.name"
              :title="t.requestedSet.name" />
          </p>
          <i v-if="t.status != 'pending'" class="mdi mdi-close text-danger selectable" @click="removeTrade(t.id)"></i>
        </div>
      </div>
    </div>
  </div>
  <TradeChatOffcanvas :tradeId="tradeId" />
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import { marketplaceService } from "../services/MarketplaceService.js";
import { notificationsService } from "../services/NotificationsService.js";
import Pop from "../utils/Pop.js";
import TradeChatOffcanvas from "./TradeChatOffcanvas.vue";

export default {
  setup() {
    return {
      sentTrades: computed(() => AppState.sentTrades),
      receivedTrades: computed(() => AppState.receivedTrades),
      async removeTrade(id) {
        try {
          await marketplaceService.removeTrade(id);
        } catch (error) {
          Pop.error("[removeTrade]", error);
        }
      },
      async changeStatus(id, status) {
        try {
          Pop.success("You Responded to a trade request");
          const trade = await marketplaceService.changeStatus(id, status);
          if (status == "accepted") {
            await notificationsService.sendAcceptedTradeNote(trade);
          } else {
            await notificationsService.sendRejectedTradeNote(trade);
          }
        } catch (error) {
          Pop.error("[changeStatus]", error);
        }
      },

      async getTradeComments(trade) {
        try {
          AppState.activeTrade = trade;
          await commentsService.getTradeComments(trade.id);
        } catch (error) {
          Pop.error(error);
        }
      },
    };
  },
  components: { TradeChatOffcanvas },
};
</script>

<style lang="scss" scoped>
.message {
  position: relative;
  cursor: pointer;
}

.message .message-body {
  position: absolute;
  top: -22px;
  /* - top padding */
  right: 9999px;
  width: 200px;
  margin-right: -220px;
  /* width + left/right padding */
  padding: 10px;
  color: #fff;
  background: #333;
  -webkit-box-shadow: 2px 2px 5px #aaa;
  -moz-box-shadow: 2px 2px 5px #aaa;
  box-shadow: 2px 2px 5px #aaa;
  opacity: 0;
  -webkit-transition: opacity 250ms ease-out;
  -moz-transition: opacity 250ms ease-out;
  -ms-transition: opacity 250ms ease-out;
  -o-transition: opacity 250ms ease-out;
  transition: opacity 250ms ease-out;
}

/* <http://css-tricks.com/snippets/css/css-triangle/> */
.message .message-body:before {
  content: " ";
  /* Must have content to display */
  position: absolute;
  top: 50%;
  left: -16px;
  /* 2 x border width */
  width: 0;
  height: 0;
  margin-top: -8px;
  /* - border width */
  border: 8px solid transparent;
  border-right-color: #333;
}

.message:hover .message-body {
  right: -20px;
  opacity: 1;
}
</style>

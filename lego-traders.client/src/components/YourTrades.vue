<template>
  <div class="card bg-white overflow-auto" style="height: 65vh">
    <div class="card-header text-center">
      <h5>Your Trades</h5>
    </div>
    <div class="card-body">
      <div>
        <strong class="mb-3 text-center">Sent Trades:</strong>
        <div v-for="t in sentTrades" class="border-bottom solid">
          <div class="d-flex justify-content-between align-items-center my-3">
            <div class="d-flex">
              <div>
                <p :title="t.requestedSet.name" class="set-text">
                  {{ t.requestedSet.name }}
                </p>
                <router-link
                  v-if="t.requestedAccount"
                  :to="{
                    name: 'SetDetails',
                    params: { set_num: t.requestedSet.set_num },
                  }"
                >
                  <img
                    class="selectable"
                    v-if="t.requestedSet"
                    height="50"
                    :src="t.requestedSet.set_img_url"
                    :alt="t.requestedSet.name"
                    :title="t.requestedSet.name"
                  />
                </router-link>
              </div>
              <div class="ps-2"></div>
            </div>

            <p class="pt-3">For:</p>

            <div class="d-flex">
              <div>
                <p :title="t.offeredSet.name" class="set-text">
                  {{ t.offeredSet.name }}
                </p>
                <router-link
                  v-if="t.offeredSet"
                  :to="{
                    name: 'SetDetails',
                    params: { set_num: t.offeredSet.set_num },
                  }"
                >
                  <img
                    class="selectable"
                    v-if="t.offeredSet"
                    height="50"
                    :src="t.offeredSet.set_img_url"
                    :alt="t.offeredSet.name"
                    :title="t.offeredSet.name"
                  />
                </router-link>
              </div>
              <div class="ps-2">
                <i
                  v-if="t.status != 'pending'"
                  class="mdi mdi-close text-danger selectable align-self-center"
                  @click="removeTrade(t.id)"
                ></i>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-between border-top py-2">
            <router-link
              v-if="t.requestedAccount"
              :to="{
                name: 'Profile',
                params: { profileId: t.requestedAccount.id },
              }"
            >
              <img
                class="selectable"
                :src="t.requestedAccount.picture"
                height="40"
                alt=""
              />
            </router-link>
            <div>
              <span v-if="t.body" class="message">
                <i class="mdi mdi-note-outline"></i>
                <span class="message-body">{{ t.body }}</span>
              </span>
            </div>
          </div>
          <div class="d-flex justify-content-between border-top p-1">
            <button
              class="btn btn-secondary btn-sm selectable"
              type="button"
              aria-controls="offcanvasRight"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              @click="getTradeComments(t)"
            >
              Message Seller
            </button>
            <p class="pt-1">Status: {{ t.status }}</p>
          </div>
        </div>
      </div>

      <!-- NOTE Requested -->
      <div>
        <strong class="mb-3 py-2 solid text-center">Requested Trades:</strong>
        <div v-for="t in receivedTrades">
          <div class="d-flex justify-content-between align-items-center my-3">
            <div class="d-flex">
              <div>
                <p :title="t.offeredSet.name" class="set-text">
                  {{ t.offeredSet.name }}
                </p>
                <router-link
                  v-if="t.offeredSet"
                  :to="{
                    name: 'SetDetails',
                    params: { set_num: t.offeredSet.set_num },
                  }"
                >
                  <img
                    v-if="t.offeredSet"
                    class=""
                    height="50"
                    :src="t.offeredSet.set_img_url"
                    :alt="t.offeredSet.name"
                    :title="t.offeredSet.name"
                  />
                </router-link>
              </div>
            </div>

            <p class="pt-3">For:</p>

            <div class="d-flex">
              <div>
                <p :title="t.requestedSet.name" class="set-text">
                  {{ t.requestedSet.name }}
                </p>

                <router-link
                  v-if="t.requestedSet"
                  :to="{
                    name: 'SetDetails',
                    params: { set_num: t.requestedSet.set_num },
                  }"
                >
                  <img
                    v-if="t.requestedSet"
                    class="me-auto"
                    height="50"
                    :src="t.requestedSet.set_img_url"
                    :alt="t.requestedSet.name"
                    :title="t.requestedSet.name"
                  />
                </router-link>
              </div>
              <div class="ps-2">
                <i
                  v-if="t.status != 'pending'"
                  class="mdi mdi-close text-danger selectable"
                  @click="removeTrade(t.id)"
                ></i>
              </div>
            </div>
          </div>

          <div class="d-flex align-items-center justify-content-between pb-2">
            <router-link
              :to="{ name: 'Profile', params: { profileId: t.owner.id } }"
            >
              <img
                class="selectable"
                :src="t.owner.picture"
                height="40"
                alt=""
              />
            </router-link>
            <div class="ps-2">
              <span v-if="t.body" class="message">
                <i class="mdi mdi-note-outline"></i>
                <span class="message-body">{{ t.body }}</span>
              </span>
            </div>
            <div>
              <button
                class="btn btn-secondary btn-sm"
                type="button"
                aria-controls="offcanvasRight"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                @click="getTradeComments(t)"
              >
                Message Buyer
              </button>
            </div>
          </div>
          <div class="border-bottom solid mb-2">
            <div v-if="t.status == 'pending'" class="pb-2">
              <button
                class="btn btn-success w-auto me-1"
                @click="changeStatus(t.id, 'accepted')"
              >
                Accept
              </button>
              <button
                class="btn btn-danger w-auto"
                @click="changeStatus(t.id, 'rejected')"
              >
                Reject
              </button>
            </div>
            <p v-else>Status: {{ t.status }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TradeChatOffcanvas />
</template>

<script>
import { computed } from "@vue/reactivity";
import { popScopeId } from "vue";
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
      activeTrade: computed(() => AppState.activeTrade),
      async removeTrade(id) {
        try {
          const yes = Pop.confirm(
            "This will delete trade history, including chat"
          );
          if (yes) {
            await marketplaceService.removeTrade(id);
          }
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
  width: 150px;
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
  top: -117px;
  right: 50px;
  opacity: 1;
  z-index: 100;
}

.set-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 95px;
}
</style>

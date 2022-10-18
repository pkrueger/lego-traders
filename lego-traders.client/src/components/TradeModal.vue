<template>
  <div class="component">
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form @submit="offerTrade()">
          <div class="modal-content">
            <div class="modal-header">
              <img
                class="pe-2 img-fluid set-img"
                :src="activeLegoSet.set_img_url"
                alt=""
              />
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Make Your Offer to {{ activeLegoSet.owner?.name }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div
                id="carouselExampleControls"
                class="carousel carousel-dark slide"
                data-bs-ride="carousel"
              >
                <div class="carousel-inner">
                  <div class="carousel-item active text-center">
                    <img
                      class="img-fluid lego-logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png"
                      alt=""
                    />
                  </div>
                  <div
                    class="carousel-item"
                    data-bs-interval="999999"
                    v-for="m in myLegoSets"
                  >
                    <TradeSetCard
                      class="text-center m-auto"
                      style="width: 20rem"
                      :key="m.id"
                      :legoSet="m"
                      @passSet="editable.offeredSetId = $event"
                    />
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div class="input-group px-3">
              <span class="input-group-text">Message to Seller</span>
              <textarea
                v-model="editable.body"
                class="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" data-bs-dismiss="modal">Offer Set</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { marketplaceService } from "../services/MarketplaceService.js";
import { notificationsService } from "../services/NotificationsService.js";
import Pop from "../utils/Pop.js";
import TradeSetCard from "./TradeSetCard.vue";
export default {
  // props: {
  //   legoSet: { type: Object, required: true }
  // },
  setup() {
    const editable = ref({});

    return {
      editable,
      account: computed(() => AppState.account),
      myLegoSets: computed(() =>
        AppState.myLegoSets.filter((l) => l.isOwned == true)
      ),
      activeLegoSet: computed(() => AppState.activeLegoSet),
      async offerTrade() {
        try {
          // console.log(editable.value);
          // let formData = {}

          // formData.requestedSetId = AppState.activeLegoSet.id
          // formData.offeredSetId = legoSet.id
          // formData.requestedAccountId = AppState.activeLegoSet.ownerId
          const trade = await marketplaceService.offerTrade(editable.value);
          await notificationsService.sendPendingTradeNote(trade);
          editable.value = {};
          // console.log(formData);
        } catch (error) {
          Pop.error(error, "[offeringTrade]");
        }
      },
    };
  },
  components: { TradeSetCard },
};
</script>

<style lang="scss" scoped>
.lego-logo {
  height: 15.5rem;
}

.owner-img {
  height: 4vh;
  width: 4vh;
}

.set-img {
  height: 10vh;
  margin-bottom: 1rem;
}
</style>

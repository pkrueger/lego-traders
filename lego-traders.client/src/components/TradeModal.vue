<template>
  <div class="component">
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <img class="pe-2 img-fluid set-img" :src="activeLegoSet.set_img_url" alt="">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Make Your Offer to {{activeLegoSet.owner.name}}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <div id="carouselExampleControls" class="carousel carousel-dark slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active text-center">
                  <img class="img-fluid lego-logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png"
                    alt="">
                </div>
                <div class="carousel-item" data-bs-interval="999999" v-for="m in myLegoSets">

                  <TradeSetCard class="text-center m-auto" style="width: 20rem" :key="m.id" :legoSet="m" />
                </div>

              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div class="input-group px-3">
            <span class="input-group-text">Message to Seller</span>
            <textarea class="form-control" aria-label="With textarea"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" data-bs-dismiss="modal" @click="offerTrade(legoSet)">Offer
              Set</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import TradeSetCard from './TradeSetCard.vue';
export default {
  props: {
    legoSet: { type: Object, required: true }
  },
  setup() {

    return {
      account: computed(() => AppState.account),
      myLegoSets: computed(() => AppState.myLegoSets),
      activeLegoSet: computed(() => AppState.activeLegoSet),
      async offerTrade(legoSet) {
        try {
          let formData = {}

          formData.requestedSetId = AppState.activeLegoSet.id
          formData.offeredSetId = legoSet.id
          formData.requestedAccountId = AppState.activeLegoSet.ownerId
          await marketplaceService.offerTrade(formData)
        } catch (error) {
          Pop.error(error, '[offeringTrade]')
        }
      }
    };
  },
  components: { TradeSetCard }
}
</script>


<style lang="scss" scoped>
.lego-logo {
  width: 20rem;

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
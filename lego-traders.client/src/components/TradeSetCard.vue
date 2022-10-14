<template>
  <div class="trade-set card">
    <div class="card-header">{{legoSet.name}}</div>
    <div class="card-body">
      <img :src="legoSet.set_img_url" class="img-fluid set-img" alt="">
      <div class="card-footer d-flex align-items-center justify-content-between">

        <img :src="legoSet.owner.picture" class="owner-img" alt="">
        <p class="pt-3">{{legoSet.owner.name}}'s</p>
        <!-- <button type="button" v-if="legoSet.ownerId != account.id" class="btn btn-primary"
          @click="makeSetActive(legoSet)" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Make Offer
        </button> -->
        <button v-if="legoSet.ownerId == account.id" type="button" data-bs-dismiss="modal"
          @click="offerTrade(legoSet)">Offer
          Set</button>

      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { marketplaceService } from '../services/MarketplaceService.js'
import Pop from '../utils/Pop.js';

export default {
  props: {
    legoSet: { type: Object, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),


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
}
</script>


<style lang="scss" scoped>
.owner-img {
  height: 4vh;
  width: 4vh;
}

.set-img {
  height: 10vh;
  margin-bottom: 1rem;
}
</style>
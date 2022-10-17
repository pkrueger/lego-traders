<template>
  <div class="trade-set card">
    <div class="card-header">{{legoSet.name}}</div>
    <div class="card-body">


      <img :src="legoSet.set_img_url" class="img-fluid set-img" alt="">
      <div v-if="account.id != legoSet.ownerId" class="d-flex align-items-center justify-content-center">
        <p class="mb-0 me-2">Owned by</p>
        <img :src="legoSet.owner.picture" :title="legoSet.owner.name" class="owner-img" alt="">
      </div>

      <!-- <button type="button" v-if="legoSet.ownerId != account.id" class="btn btn-primary"
          @click="makeSetActive(legoSet)" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Make Offer
        </button> -->
      <div v-if="legoSet.ownerId == account.id" class="form-check d-flex justify-content-between align-items-center">
        <label class="form-check-label me-5" for="flexCheckDefault">
          Mark for trade
        </label>
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
          @change="$emit('passSet', legoSet.id)">
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
    legoSet: { type: Object, required: true },

  },
  setup() {
    return {
      account: computed(() => AppState.account),



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

.trade-set {
  height: 25vh
}
</style>
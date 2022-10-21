<template>
  <div class="trade-set flex align-items-end">
    <div class="d-flex flex-wrap align-items-flex-end justify-content-center bg-white h-100">
      <img :src="legoSet.set_img_url" class="img-fluid set-img mt-3" alt="">

      <div class="text-end d-flex flex-wrap justify-content-end pe-2">
        <p class="text-end pe-2 mb-1">{{legoSet.name}}</p>
        <p class="mb-1 pe-2">Year Released: {{legoSet.year}}</p>
        <div v-if="account.id != legoSet.ownerId" class="d-flex align-items-center pb-1 justify-content-end">
          <p class="mb-0 owner-text">Owned by {{legoSet.owner.name}}</p>
          <img :src="legoSet.owner.picture" :title="legoSet.owner.name" class="owner-img" alt="">
        </div>



        <div v-if="legoSet.ownerId == account.id" class="form-check d-flex justify-content-between align-items-center">
          <label class="form-check-label me-5" for="flexCheckDefault">
            Mark for trade
          </label>
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
            @change="$emit('passSet', legoSet.id)">
        </div>



      </div>
    </div>
  </div>
  <!-- NOTE for reference >>>>V -->
  <!-- <div class="trade-set">
      <div class="card-header">{{legoSet.name}}</div>
      <div>
    
    
        <img :src="legoSet.set_img_url" class="img-fluid set-img" alt="">
        <div v-if="account.id != legoSet.ownerId" class="d-flex align-items-center justify-content-center">
          <p class="mb-0 me-2">Owned by</p>
          <img :src="legoSet.owner.picture" :title="legoSet.owner.name" class="owner-img" alt="">
        </div>
    
        <div v-if="legoSet.ownerId == account.id" class="form-check d-flex justify-content-between align-items-center">
          <label class="form-check-label me-5" for="flexCheckDefault">
            Mark for trade
          </label>
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
            @change="$emit('passSet', legoSet.id)">
        </div>
    
      </div>
    </div> -->




  <!-- NOTE NOT  >>>V -->

  <!-- <button type="button" v-if="legoSet.ownerId != account.id" class="btn btn-primary"
      @click="makeSetActive(legoSet)" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Make Offer
    </button> -->
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
  height: 3.5vh;
  width: 3.5vh;
  border-radius: 50%;
}

.owner-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px
}

.set-img {
  height: 15vh;
  margin-bottom: 1rem;
}

.trade-set {
  height: 30vh;
}

.border-test {
  border: 1.5rem solid;
  border-image-slice: 33 0 0 33;
  border-image-outset: 0px 1.5rem 1.5rem 0px;
  border-image-repeat: repeat repeat;
  border-image-source: url("red-lego.webp");
}
</style>
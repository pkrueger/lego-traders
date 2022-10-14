<template>
  <!-- When Adding a Set Card it needs to be inside a ROW for proper formating -->

  <div class="card card-size">
    <!-- <router-link :to="{name: 'SetDetails'}"> -->
    <img :src="legoSet.set_img_url" class="img-fluid p-2 img-size" alt="">
    <!-- </router-link> -->
    <div class="card-body p-2">
      <h5>{{legoSet.name}}</h5>
      <p class="m-0">Set ID: {{legoSet.set_num}}</p>
      <p class="m-0">Year: {{legoSet.year}}</p>
      <!-- <p class="m-0">Number of Parts: {{legoSet.num_parts}}</p> -->

      <div v-if="account.id == legoSet.ownerId && account.id && legoSet.isOwned" class="form-check">
        <input class="form-check-input" :checked="legoSet.isUpForTrade" type="checkbox" id="isUpForTrade"
          @change="toggleIsUpForTrade(legoSet)">
        <label class="form-check-label" for="flexCheckDefault">
          Check is this set is up for trade
        </label>
      </div>
      <div>
        <button class="btn btn-primary" v-if="!legoSet.ownerId" @click="addSetToAccount(legoSet)">Add to
          Account</button>
      </div>
      <!-- Add Offer Trade Button v-if="legoSet.ownerId != account.id && account.id" -->
    </div>
  </div>

</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { legoSetsService } from '../services/LegoSetsService.js';
import Pop from '../utils/Pop.js';


export default {
  props: {
    legoSet: { type: Object, required: true },
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async toggleIsUpForTrade(legoSet) {
        try {
          await legoSetsService.toggleIsUpForTrade(legoSet.id)
        } catch (error) {
          Pop.error('[toggleIsUpForTrade]', error)
        }
      },
      async addSetToAccount(data) {
        try {
          const yes = await Pop.confirm('Do you own this?', '')
          if (!yes) {
            await legoSetsService.addSetToAccount(data)
          } else {
            data.isOwned = true
            await legoSetsService.addSetToAccount(data)
          }
        } catch (error) {
          Pop.error('[addToAccount]', error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.card-size {
  min-height: 55vh;
}

.img-size {
  width: 38vh;
  height: 38vh;
  object-fit: contain;
}
</style>
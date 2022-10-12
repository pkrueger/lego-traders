<template>
  <!-- When Adding a Set Card it needs to be inside a ROW for proper formating -->
  <div class="col-3">
    <div class="card">
      <img :src="legoSet.set_img_url" class="img-fluid p-2" alt="">
      <div class="card-body">
        <h5>{{legoSet.name}}</h5>
        <p class="m-0">Set ID: {{legoSet.set_num}}</p>
        <p class="m-0">Year: {{legoSet.year}}</p>
        <div v-if="account.id == legoSet.ownderId" class="form-check">
          <input class="form-check-input" :checked="legoSet.toggleisUpForTrade" type="checkbox" id="isUpForTrade"
            @change="toggleisUpForTrade()">
          <label class="form-check-label" for="flexCheckDefault">
            Check is this set is up for trade
          </label>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Account } from '../models/Account.js';
import { legoSetsService } from '../services/LegoSetsService.js';
import Pop from '../utils/Pop.js';


export default {
  props: {
    legoSet: { type: {}, required: true },
    account: { type: Account }
  },
  setup() {
    return {
      async toggleisUpForTrade() {
        try {
          await legoSetsService.toggleisUpForTrade(legoSet.id)
        } catch (error) {
          Pop.error('[toggleIsUpForTrade]', error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
<template>
  <div class="component banner-img">
    <div class="row justify-content-center p-3">
      <div class="col-md-12 text-center mb-3">
        <h1>Welcome Traders!</h1>
      </div>
      <div class="col-md-10 mt-3">
        <MarketSearchForm />
      </div>
      <div class="search-field d-flex justify-content-between mx-5 mt-3">
        <h5 class="ms-5">Organize By: </h5>
        <button class="btn btn-primary">Set Number</button>
        <button class="btn btn-primary">Name</button>
        <button class="btn btn-primary">Theme</button>
        <button class="btn btn-primary me-5">Year</button>

      </div>


      <div class="col-3 mt-3" v-for="l in tradableSets">

        <LegoSetCard :key="l.id" :legoSet="l" />
      </div>

    </div>

  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import LegoSetCard from '../components/LegoSetCard.vue';
import { legoSetsService } from '../services/LegoSetsService.js';
import Pop from '../utils/Pop.js';
import MarketSearchForm from '../components/MarketSearchForm.vue';
export default {
  setup() {
    onMounted(() => {
      getTradableSets()
    })
    async function getTradableSets() {
      try {
        await legoSetsService.getTradableSets()
      } catch (error) {
        Pop.error(error, '[gettingTradableSets]')
      }
    }
    return {
      tradableSets: computed(() => AppState.legoSet.filter(l => l.isUpForTrade))
    };
  },
  components: { LegoSetCard, MarketSearchForm }
}
</script>


<style lang="scss" scoped>
.banner-img {
  background-image: url('red-lego.webp');
  background-position: center;
  background-size: cover;
  height: 100vh;
}
</style>

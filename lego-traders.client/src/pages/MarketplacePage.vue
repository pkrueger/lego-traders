<template>
  <div class="component banner-img">
    <div class="row p-3">
      <h1>Welcome Traders!</h1>
      <div class="col-md-10 d-flex flex-wrap text-center mb-3">
        <div class="col-3 m-3" v-for="l in tradableSet">
          <TradeSetCard :key="l.id" :legoSet="l" />

        </div>

      </div>
      <div class="col-md-2">
        <div class="search-field d-flex">

          <button class="btn btn-primary">Set Number</button>
          <button class="btn btn-primary">Name</button>
          <button class="btn btn-primary">Theme</button>
          <button class="btn btn-primary me-5">Year</button>

        </div>
        <div class="mt-3 d-md-block sidebar">
          <MarketSearchForm />
        </div>
      </div>




    </div>
  </div>


  <TradeModal />

</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { legoSetsService } from '../services/LegoSetsService.js';
import Pop from '../utils/Pop.js';
import MarketSearchForm from '../components/MarketSearchForm.vue';
import TradeSetCard from '../components/TradeSetCard.vue';
import TradeModal from '../components/TradeModal.vue';
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
      tradableSet: computed(() => AppState.tradableSet.filter(s => s.ownerId != AppState.account.id))
    };
  },
  components: { MarketSearchForm, TradeSetCard, TradeModal }
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

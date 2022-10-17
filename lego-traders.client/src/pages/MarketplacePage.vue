<template>
  <div class="container-fluid banner-img">
    <div class="row p-3">
      <div class="col-md-10 d-flex flex-wrap text-center mb-3">

        <div class="m-3 set-card" v-for="l in tradableSet">
          <TradeSetCard :key="l.id" :legoSet="l" />
          <button type="button" class="btn btn-primary offer" @click="makeSetActive(l)" data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            Make Offer
          </button>
        </div>
      </div>
      <div class="col-md-2 sidebar">
        <h5 class="my-3">Search for sets</h5>
        <form @submit.prevent="handleSubmit">

          <div class="input-group input-group-sm mb-4">
            <span class="input-group-text" id="inputGroup-sizing-sm">Name</span>
            <input type="text" class="form-control" v-model="editable.term" aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm">
          </div>
          <div class="input-group input-group-sm mb-4">
            <span class="input-group-text" id="inputGroup-sizing-sm">Theme</span>
            <input type="text" class="form-control" v-model="editable.theme" aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm">
          </div>
          <div class="input-group input-group-sm mb-4">
            <span class="input-group-text" id="inputGroup-sizing-sm">Set #</span>
            <input type="text" class="form-control" v-model="editable.set_num" aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm">
          </div>
          <div class="input-group input-group-sm mb-4">
            <span class="input-group-text" id="inputGroup-sizing-sm">Year</span>
            <input type="text" class="form-control" v-model="editable.year" aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm">
          </div>
        </form>













        <!-- <div class="mt-3 d-md-block">
          <div class="search-field d-flex justify-content-center">
            <MarketSearchForm />
          </div>
          <button class="btn btn-secondary">Set Number</button>
          <button class="btn btn-secondary">Name</button>
        </div>
        <button class="btn btn-secondary">Theme</button>
        <button class="btn btn-secondary me-5">Year</button> -->
      </div>
    </div>
  </div>

  <TradeModal />
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { AppState } from "../AppState.js";
import { legoSetsService } from "../services/LegoSetsService.js";
import Pop from "../utils/Pop.js";
import MarketSearchForm from "../components/MarketSearchForm.vue";
import TradeSetCard from "../components/TradeSetCard.vue";
import TradeModal from "../components/TradeModal.vue";
import { ref } from 'vue'
export default {
  setup() {
    const editable = ref({})
    onMounted(() => {
      getTradableSets();
    });
    async function getTradableSets() {
      try {
        await legoSetsService.getTradableSets();
      } catch (error) {
        Pop.error(error, "[gettingTradableSets]");
      }
    }
    return {
      editable,
      async handleSubmit() {
        try {
          await legoSetsService.getSetsBySearchTerm(editable.value)
        } catch (error) {
          logger.error('[Search]', error)
          Pop.error(error)
        }
      },
      async makeSetActive(legoSet) {
        AppState.activeLegoSet = legoSet;
      },
      tradableSet: computed(() =>
        AppState.tradableSet.filter((s) => s.ownerId != AppState.account.id)
      ),
    };
  },
  components: { MarketSearchForm, TradeSetCard, TradeModal },
};
</script>

<style lang="scss" scoped>
.banner-img {
  background-image: url("red-lego.webp");
  background-size: fill;
  background-position: top left;
  height: 100vh;
}

.sidebar {
  background-color: #0099D4;
  height: 100vh;
}

.set-card {
  width: 25vh
}

.offer {
  z-index: 100;
}
</style>

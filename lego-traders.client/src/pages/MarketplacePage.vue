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
        <div>

          <!-- <form @submit.prevent="handleSubmit"> -->
          <!-- another way is a front end filter on the array legoSets, so isUpTrade, name, year, themeIDm set_num -->
          <div>
            <div class="form-check">
              <input class="form-check-input" v-model="checked" type="checkbox" name="setName" id="name">
              <label class="form-check-label" for="name">
                By name
              </label>
            </div>
            <div v-if="checked">
              <div class="input-group input-group-sm mb-4">
                <span class="input-group-text" id="inputGroup-sizing-sm">Name</span>
                <input type="text" class="form-control" v-model="editable.name" aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
          </div>


          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="setYear" id="year">
            <label class="form-check-label" for="year">
              By year
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="setNum" id="year">
            <label class="form-check-label" for="year">
              By set number
            </label>
          </div>

        </div>

        <!-- row of radio buttons -->
        <!-- v-if label of name radio button is checked -->

        <!-- v-if label of theme radio button is checked -->
        <div class="input-group input-group-sm mb-4">
          <span class="input-group-text" id="inputGroup-sizing-sm">Theme</span>
          <input type="text" class="form-control" v-model="editable.themeId" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm">
        </div>
        <!-- v-if label of set_num radio button is checked -->
        <div class="input-group input-group-sm mb-4">
          <span class="input-group-text" id="inputGroup-sizing-sm">Set #</span>
          <input type="text" class="form-control" v-model="editable.set_num" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm">
        </div>
        <!-- v-if label of year radio button is checked -->
        <div class="input-group input-group-sm mb-4">
          <span class="input-group-text" id="inputGroup-sizing-sm">Year</span>
          <input type="text" class="form-control" v-model="editable.year" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm">
        </div>
        <button type="submit"> search</button>
        <!-- </form> -->
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
      // tradableSet: computed(() =>
      //   AppState.tradableSet.filter((s) => (s.ownerId != AppState.account.id)) && AppState.tradableSet.includes(editable.value))
      // ,
      tradableSet: computed(() => AppState.tradableSet.filter((s) => (s.ownerId != AppState.account.id))
      ),
      // async handleSubmit() {
      //   try {
      //     await legoSetsService.getSetsBySearchTerm(editable.value)
      //   } catch (error) {
      //     logger.error('[Search]', error)
      //     Pop.error(error)
      //   }
      // },
      async makeSetActive(legoSet) {
        AppState.activeLegoSet = legoSet;
      },
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

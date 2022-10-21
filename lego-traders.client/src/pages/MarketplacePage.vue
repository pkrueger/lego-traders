<template>
  <div class="container-fluid bg-light gb-0">
    <div class="row p-4">
      <div class="col-lg-3 order-sm-1 order-lg-1 sidebar elevation-4 bg-white border-test">
        <div class="mt-3">
          <div>
            <div class="form-check">
              <!-- Maybe Search goes at the top of the marketplace or in the navBar -->

              <!-- <input @click="getNameChecked" class="form-check-input" type="checkbox" name="setName" id="setName"> -->
              <label class="form-check-label ps-2" for="setName">
                Search tradable sets by name
              </label>
              <form @submit.prevent="handleSubmit()">
                <div class=" input-group input-group-sm mb-4">
                  <input id="nameSearchBar" v-model="editable.term" type="text" class="form-control"
                    aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                  <button id="nameSearchButton" type="submit" class="btn btn-primary">search</button>
                </div>
              </form>
            </div>
            <div class="text-center mb-3">
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#ownedSets">
                Your Owned Sets
              </button>
            </div>
            <div>
            </div>
          </div>
          <YourTrades />
        </div>
      </div>
      <div style="height: 85vh" class="col-lg-9 overflow-auto order-lg-2 order-sm-2 flex-wrap text-center">
        <h1 class="w-100">Sets available for trade</h1>
        <div class="d-flex flex-wrap justify-content-center">
          <div class="m-3 set-card border-test" v-for="l in tradableSets">
            <TradeSetCard :key="l.id" :legoSet="l" />
            <button type="button" class="bg-primary offer w-100 " @click="makeSetActive(l)" data-bs-toggle="modal"
              data-bs-target="#exampleModal">
              Make Offer
            </button>
          </div>

        </div>
      </div>
    </div>
    <TradeModal />
    <OwnedSetsModal />
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { legoSetsService } from "../services/LegoSetsService.js";
import Pop from "../utils/Pop.js";
import MarketSearchForm from "../components/MarketSearchForm.vue";
import TradeSetCard from "../components/TradeSetCard.vue";
import TradeModal from "../components/TradeModal.vue";
import { ref } from 'vue'
import YourTrades from "../components/YourTrades.vue";
import OwnedSetsModal from "../components/OwnedSetsModal.vue";
import { marketplaceService } from "../services/MarketplaceService.js";
import { logger } from "../utils/Logger.js";
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
          if (editable.value.term == '') {
            await legoSetsService.getTradableSets()
          }
          await marketplaceService.getTradableSetBySearch(editable.value.term)
        } catch (error) {
          logger.error('[searchTradable]', error)
          Pop.error(error)
        }
      },
      // getNameChecked() {
      //   let checkBox = document.getElementById('setName');
      //   let nameSearch = document.getElementById('nameSearchBar');
      //   let buttonSearch = document.getElementById('nameSearchButton')
      //   if (checkBox.checked == true) {
      //     nameSearch.style.display = "block";
      //     buttonSearch.style.display = "block"
      //   } else {
      //     nameSearch.style.display = 'none'
      //   }
      // },

      tradableSets: computed(() => AppState.tradableSet.filter((s) => s.ownerId != AppState.account.id)),

      // tradableSearchSet: computed(() => tradableSet.includes(editable.value)),
      account: computed(() => AppState.account),

      async makeSetActive(legoSet) {
        AppState.activeLegoSet = legoSet;
      },
    };
  },
  components: { MarketSearchForm, TradeSetCard, TradeModal, YourTrades, OwnedSetsModal },
};
</script>

<style lang="scss" scoped>
// .banner-img {
//   background-image: url("red-lego.webp");
//   background-size: fill;
//   background-position: top left;
//   height: 100vh;
// }

.sidebar {

  margin-bottom: 0;

}

@media (max-width: 1000px) {
  .sidebar {
    height: auto;
  }
}

.set-card {
  width: 33vh;
  //   // height: 32.52vh
}

.offer {
  z-index: 100;


}

.border-test {
  border-left: 1.5rem solid;
  border-image-slice: 0 0 0 33;
  border-image-outset: 0px 0rem 0rem 0px;
  border-image-repeat: repeat repeat;
  border-image-source: url("red-lego.webp");
}
</style>

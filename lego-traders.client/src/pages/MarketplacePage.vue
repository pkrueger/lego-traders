<template>
  <div class="container-fluid banner-img">
    <div class="row p-3">
      <div class="col-lg-9 order-lg-1 order-sm-2 d-flex flex-wrap text-center mb-3">
        <div class="m-3 set-card" v-for="l in tradableSet">
          <TradeSetCard :key="l.id" :legoSet="l" />
          <button type="button" class="btn btn-primary offer" @click="makeSetActive(l)" data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            Make Offer
          </button>
        </div>
      </div>
      <div class="col-lg-3 order-sm-1 order-lg-2 p-3 rounded sidebar">
        <div class="mt-3">
          <div>
            <div class="form-check">
              <!-- Maybe Search goes at the top of the marketplace or in the navBar -->
              <input @click="getNameChecked" class="form-check-input" type="checkbox" name="setName" id="setName">
              <label class="form-check-label" for="setName">
                Search Sets
              </label>
            </div>
            <div>
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#ownedSets">
                Owned Sets
              </button>
            </div>
            <div>
              <div class=" input-group input-group-sm mb-4">
                <input id="nameSearchBar" v-model="editable.name" style="display: none" type="text" class="form-control"
                  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
          </div>
          <YourTrades />
        </div>
      </div>
    </div>
    <TradeModal />
    <OwnedSetsModal />
  </div>
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
import YourTrades from "../components/YourTrades.vue";
import OwnedSetsModal from "../components/OwnedSetsModal.vue";
import { TradeHandler } from "../Handlers/TradeHandler.js";
import { onBeforeRouteLeave, useRoute } from "vue-router";
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()

    onMounted(() => {
      getTradableSets();
      TradeHandler.EnterTrade(route.params.tradeId)
    });
    async function getTradableSets() {
      try {

        await legoSetsService.getTradableSets();
      } catch (error) {
        Pop.error(error, "[gettingTradableSets]");
      }
    }
    onBeforeRouteLeave(() => {
      TradeHandler.LeaveTrade(route.params.tradeId)
    })
    return {
      editable,
      getNameChecked() {
        let checkBox = document.getElementById('setName');
        let nameSearch = document.getElementById('nameSearchBar');
        if (checkBox.checked == true) {
          nameSearch.style.display = "block";
        } else {
          nameSearch.style.display = 'none'
        }
      },

      tradableSet: computed(() => AppState.tradableSet.filter((s) => s.ownerId != AppState.account.id)),

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

@media (max-width: 1000px) {
  .sidebar {
    height: auto;
  }
}

.set-card {
  width: 25vh
}

.offer {
  z-index: 100;
}
</style>

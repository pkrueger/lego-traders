<template>
  <div class="container-fluid banner-img">
    <div class="row p-3">
      <div class="col-md-9 d-flex flex-wrap text-center mb-3">
        <div class="m-3 set-card" v-for="l in tradableSet">
          <TradeSetCard :key="l.id" :legoSet="l" />
          <button type="button" class="btn btn-primary offer" @click="makeSetActive(l)" data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            Make Offer
          </button>
        </div>
      </div>
      <div class="col-md-3 sidebar">
        <div class="mt-3">

          <div>
            <div class="form-check">
              <input @click="getNameChecked" class="form-check-input" type="checkbox" name="setName" id="setName">
              <label class="form-check-label" for="setName">
                Search Sets
              </label>
            </div>
            <div>
              <div class="input-group input-group-sm mb-4">
                <input id="nameSearchBar" v-model="editable.name" style="display: none" type="text" class="form-control"
                  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TradeModal />
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

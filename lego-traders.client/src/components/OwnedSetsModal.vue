<template>
  <div class="modal fade" id="ownedSets" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="ownedSetsLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="ownedSetsLabel">Your owned Sets</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-3 mb-2" v-for="l in ownedLegoSets">
                <LegoSetCard :key="l.id" :legoSet="l" />
              </div>

            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import LegoSetCard from './LegoSetCard.vue';
export default {
  setup() {
    return {
      ownedLegoSets: computed(() => AppState.myLegoSets.filter(l => l.isOwned)),
    };
  },
  components: { LegoSetCard }
}
</script>


<style lang="scss" scoped>

</style>
<template>
  <div class="trade-set card">
    <div class="card-header">{{tradableSet.name}}</div>
    <div class="card-body">
      <img :src="tradableSet.set_img_url" class="img-fluid set-img" alt="">
      <div class="card-footer d-flex align-items-center justify-content-between">

        <img :src="tradableSet.owner.picture" class="owner-img" alt="">
        <p class="pt-3">{{tradableSet.owner.name}}'s</p>

      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import TradeModal from './TradeModal.vue';

export default {
  props: {
    tradableSet: { type: Object, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      // owner: computer(() => )
    };
  },
  components: { TradeModal }
}
</script>


<style lang="scss" scoped>
.owner-img {
  height: 4vh;
  width: 4vh;
}

.set-img {
  height: 10vh;
  margin-bottom: 1rem;
}
</style>
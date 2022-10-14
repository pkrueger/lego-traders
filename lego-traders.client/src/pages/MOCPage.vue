<template>
  <div class="container-fluid moc-page">
    <div class="row justify-content-center p-4">
      <div class="col-md-9">
        <div class="row">
          <div class="col-4 mb-3" v-for="m in state.mocSets">
            <!-- MOC cards go here -->
            <MOCCard :key="m.id" :mocSet="m" />
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="card">
          <div class="card-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import MOCCard from "../components/MOCCard.vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    const state = reactive({
      mocSets: computed(() => AppState.customMOCSets),
    });
    return { state };
  },
  components: { MOCCard },
};
</script>

<style lang="scss" scoped>
.moc-page {
  background-image: url("green-lego.webp");
  background-size: fill;
  background-position: top left;
  height: 90vh;
}
</style>

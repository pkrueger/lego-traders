<template>
  <div class="container-fluid moc-page">
    <div class="row justify-content-center p-4">
      <div class="col-md-9">
        <div class="row">
          <div class="col-4 mb-3" v-for="m in mocSets">
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
import { mocsService } from "../services/MocsService.js";
import MOCCard from "../components/MOCCard.vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { onMounted } from "vue";

export default {
  setup() {
    async function getMocSets() {
      try {
        await mocsService.getMocSets()
      } catch (error) {
        Pop.error('[GetMOCSets]')
      }
    }
    onMounted(() => {
      getMocSets()
    })
    return {
      mocSets: computed(() => AppState.customMOCSets),
    };
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

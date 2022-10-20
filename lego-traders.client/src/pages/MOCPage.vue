<template>
  <div class="container-fluid moc-page">
    <div class="row justify-content-center p-4">
      <div class="col-lg-9">
        <div class="row align-items-center">
          <div class="col-lg-4 mb-3" v-for="m in mocSets">
            <!-- MOC cards go here -->
            <MOCCard :key="m.id" :mocSet="m" />
          </div>
        </div>
      </div>
      <div class="col-lg-2">
        <div class="bg-dark p-3 rounded">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#MOCModel">
            Make Your Own Creation!
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="MOCModel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="MOCModelLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="MOCModelLabel">Show Everyone How To Make Your Creation!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <MocForm />
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
import MocForm from "../components/MocForm.vue";

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
  components: { MOCCard, MocForm },
};
</script>

<style lang="scss" scoped>
.moc-page {
  background-image: url("green-lego.webp");
  background-size: fill;
  background-position: top left;
  height: 91.4vh;
}
</style>

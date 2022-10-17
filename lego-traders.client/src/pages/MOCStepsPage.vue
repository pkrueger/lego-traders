<template>
  <div class="container-fluid steps-page">
    <div class="row">
      <div class="col-12 my-4">
        <div class="bg-dark p-4 rounded">
          <div class="text-center">
            <h1>{{mocSet.name}}</h1>
            <img :src="mocSet.moc_img" alt="Final Creation Img" class="img-fluid final-img">
          </div>
          <div class="px-5 my-4">
            <h5>About My Creation:</h5>
            <p>{{mocSet.desc}}</p>
          </div>
        </div>
      </div>
      <MOCStepCard v-for="step in mocSet.moc_steps" :key="step.text" :step="step" />
      <div class="col-12 my-4">
        <div class="bg-dark p-4 rounded">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Create a Step
          </button>
        </div>
      </div>

      <div class="col-12 my-4">
        <div class="bg-dark p-4 rounded d-flex justify-content-around align-items-center">
          <h1>By: {{mocSet.creator?.name}}</h1>
          <img :src="mocSet.creator?.picture" alt="Creator Picture" class="img-fluid profile-img">
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Add a Picture and Directions</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <MOCFormStep />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { mocsService } from '../services/MocsService.js';
import Pop from '../utils/Pop.js';
import MOCStepCard from '../components/MOCStepCard.vue';
import MOCFormStep from '../components/MOCFormStep.vue';

export default {
  setup() {
    const route = useRoute();
    async function getMocById() {
      try {
        await mocsService.getMocById(route.params.mocId);
      }
      catch (error) {
        Pop.error("[GetMocById]");
      }
    }
    onMounted(() => {
      getMocById();
    });
    return {
      mocSet: computed(() => AppState.activeMOCset)
    };
  },
  components: { MOCStepCard, MOCFormStep }
};
</script>

<style lang="scss" scoped>
.steps-page {
  background-image: url('green-lego.webp');
  background-position: top left;
  background-size: auto;
  min-height: 90vh;
}

.final-img {
  height: 60vh;
}

.profile-img {
  width: 20%;
  height: auto;
}
</style>

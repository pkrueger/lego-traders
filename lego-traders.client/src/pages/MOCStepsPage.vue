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
        <div class="bg-dark p-4 rounded d-flex justify-content-around align-items-center">
          <h1>By: {{mocSet.creator?.name}}</h1>
          <img :src="mocSet.creator?.picture" alt="Creator Picture" class="img-fluid profile-img">
        </div>
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
  components: { MOCStepCard }
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

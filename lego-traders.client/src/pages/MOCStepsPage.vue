<template>
  <div class="container-fluid steps-page">
    <div class="row">
      <div class="col-12 my-4">
        <div class="bg-dark p-4">
          <h1>{{mocSet.name}}</h1>
          <img :src="mocSet.moc_img" alt="Final Creation Img" class="img-fluid final-img">
          <p>{{mocSet.desc}}</p>
        </div>
      </div>
      <div class="col-12 my-4">
        <div class="bg-dark p-4 d-flex">
          <!-- <img :src="mocSet.moc_steps.img" alt="step img">
          <div>
            <p>{{mocSet.moc_steps.text}}</p>
          </div> -->
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

export default {
  setup() {
    const route = useRoute()
    async function getMocById() {
      try {
        await mocsService.getMocById(route.params.mocId)
      } catch (error) {
        Pop.error('[GetMocById]')
      }
    }
    onMounted(() => {
      getMocById()
    })
    return {
      mocSet: computed(() => AppState.activeMOCset)
    };
  },
};
</script>

<style lang="scss" scoped>
.steps-page {
  background-image: url('green-lego.webp');
  background-position: top left;
  background-size: fill;
  height: 90vh;
}

.final-img {
  height: 60vh;
}
</style>

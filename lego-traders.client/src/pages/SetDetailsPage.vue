<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>set details</h1>
        <!-- Set Details -->
      </div>
      <h1>Alternate MOC's</h1>
      <div class="col-3 d-flex justify-content-center" v-for="l in legoSet">
        <div class="card">
          <img :src="l.moc_img_url" class="img-fluid moc-img">
          <div class="card-body">
            <h5>{{l.name}} || {{l.num_parts}} pcs</h5>
            <h6>Designed by: <i>{{l.designer_name}}</i></h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { legoSetsService } from "../services/LegoSetsService";
import Pop from "../utils/Pop";
import { AppState } from "../AppState"
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      getSetAlternates()
    })
    async function getSetAlternates() {
      try {
        await legoSetsService.getSetAlternates(route.params.id)
      } catch (error) {
        Pop.error(error, 'geting set alternates')
      }
    }
    return {
      legoSet: computed(() => AppState.activeApiSet)
    }
  }
}
</script>


<style lang="scss" scoped>
.moc-img {
  max-height: 25vh;
  max-width: 25vh;
}

.card {
  max-width: 45vh;
}
</style>
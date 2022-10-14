<template>
  <!-- Set Details -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <img :src="legoSet.set_img_url" class="img-fluid set-img" :title="legoSet.name">
      </div>
      <div class="col-md-5">
        <div class="text-center">
          <h4>{{legoSet.name}}</h4>
          <h4>Realease Year: {{legoSet.year}}</h4>
          <h4>{{legoSet.num_parts}} pcs</h4>
        </div>
      </div>
    </div>
    <!-- MOC sets -->
    <div class="row">
      <h1>Alternate MOC's</h1>
      <div class="col-3 d-flex justify-content-center" v-for="m in mocSets">
        <div class="card">
          <img :src="m.moc_img_url" class="img-fluid moc-img pointer" :href="m.moc_url">
          <div class="card-body">
            <h5>{{m.name}} || {{m.num_parts}} pcs</h5>
            <h6>Designed by: <i>{{m.designer_name}}</i></h6>
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
      getSetBySetNum()
    })
    async function getSetAlternates() {
      try {
        await legoSetsService.getSetAlternates(route.params.set_num)
      } catch (error) {
        Pop.error(error, 'geting set alternates')
      }
    }

    async function getSetBySetNum() {
      try {
        await legoSetsService.getSetBySetNum(route.params.set_num)
      } catch (error) {
        Pop.error(error, 'get set by setNum')
      }
    }
    return {
      legoSet: computed(() => AppState.activeApiSet),
      mocSets: computed(() => AppState.activeMOCset)

    }
  }
}
</script>


<style lang="scss" scoped>
.moc-img {
  max-height: 25vh;
  max-width: 25vh;
}

.set-img {
  min-width: 75vh;
}

.pointer {
  cursor: pointer;
}
</style>
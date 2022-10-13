<template>
  <div class="collection container-fluid">
    <div class="row">
      <div>
        <!-- TODO there are several theme #'s for our themes need to figure out a way to get all of them -->
        <button class="btn btn-warning" @click="getSetsByThemeId(158)">StarWars</button>
        <button class="btn btn-warning" @click="getSetsByThemeId(1)">Technic</button>
        <button class="btn btn-warning" @click="getSetsByThemeId(246)">Harry Potter</button>
      </div>
      <div class="d-flex flex-wrap">
        <LegoSetCard v-for="set in apiSets" :key="set._id" :legoSet="set" class="p-3" />
      </div>
      <div class="d-flex justify-content-center gap-5">
        <button class="btn btn-warning">Previous</button>
        <button class="btn btn-warning">Next--></button>
      </div>
    </div>
  </div>
</template>


<script>
import Pop from "../utils/Pop";
import { legoSetsService } from "../services/LegoSetsService"
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted } from "vue";
import LegoSetCard from "../components/LegoSetCard.vue";
export default {
  setup() {
    // onMounted(() => {
    //   getSetsByThemeId()
    // })
    async function getSetsByThemeId(themeId) {
      try {
        await legoSetsService.getSetsByThemeId(themeId);
      }
      catch (error) {
        Pop.error(error, "Getting Set Themes");
      }
    }
    return {
      legoSetThemes: computed(() => AppState.legoSetThemes),
      apiSets: computed(() => AppState.apiSets),
      getSetsByThemeId
    };
  },
  components: { LegoSetCard }
}
</script>


<style lang="scss" scoped>
.collection {
  background-image: url('https://wallpapers.com/images/hd/cool-lego-blue-background-vdbhk2korubq2jb0-vdbhk2korubq2jb0.webp');
  background-position: center;
  min-height: 100vh;
}
</style>
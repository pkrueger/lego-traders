<template>
  <div class="collection">
    <button class="btn btn-primary" @click="getSetsByThemeId(158)">StarWars</button>
    <div>
      <LegoSetCard v-for="set in apiSets" :key="set._id" :legoSet="set" />
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
  background-size: cover;
  background-position: center;
  height: 100vh;
}
</style>
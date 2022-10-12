<template>
  <div class="collection">
    <h1>Welcome to the Collection Page</h1>
    <h1>{{legoSets}}</h1>
  </div>
</template>


<script>
import Pop from "../utils/Pop";
import { legoSetsService } from "../services/LegoSetsService"
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
  setup() {
    return {
      legoSets: computed(() => AppState.legoSets),

      async getSetsByThemeId() {
        try {
          await legoSetsService.getSetsByThemeId(route.params.id)
        } catch (error) {
          Pop.error(error, 'Getting Set Themes')
        }
      }
    }


  }
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
<template>
  <div class="collection container-fluid">
    <div class="row">
      <div class="col-md-12 p-3 text-center">
        <!-- TODO there are several theme #'s for our themes need to figure out a way to get all of them -->
        <img @click="getSetsByThemeId(158)" class="selectable collection-image"
          src="https://www.brickfanatics.com/wp-content/uploads/2019/04/LEGO-Star-Wars-logo-featured-800-445.jpg"
          alt="">
        <img @click="getSetsByThemeId(1)" class="selectable collection-image"
          src="https://daniatoys.com/wp-content/uploads/2015/10/technic_logo_background_500x500.png" alt="">
        <img @click="getSetsByThemeId(246)" class="selectable collection-image"
          src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_LegoHarryPotterCollection_image1600w.jpg"
          alt="">
      </div>
      <div class="col-md-12 text-center">
        <img @click="getSetsByThemeId(252)" class="selectable mt-0 collection-image"
          src="https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/7/AmazonStores/ATVPDKIKX0DER/42195ca33c3846624aa5fddd2618a01c.w1000.h1000.jpg"
          alt="">
        <img @click="getSetsByThemeId(52)" class="selectable mt-0 collection-image"
          src="https://www.brickfanatics.com/wp-content/uploads/LEGO-City-logo-featured-800-445.jpg" alt="">
      </div>
      <!-- <button class="btn btn-warning" @click="getSetsByThemeId(158)">StarWars</button> -->
      <!-- <button class="btn btn-warning" @click="getSetsByThemeId(1)">Technic</button> -->
      <!-- <button class="btn btn-warning" @click="getSetsByThemeId(246)">Harry Potter</button> -->
      <!-- <button class="btn btn-warning" @click="getSetsByThemeId(252)">Architecture</button> -->
      <!-- <button class="btn btn-warning" @click="getSetsByThemeId(52)">City</button> -->
      <div class="d-flex flex-wrap justify-content-center mt-5">
        <LegoSetCard v-for="set in apiSets" :key="set._id" :legoSet="set" class="m-3 " />
      </div>
      <div class="d-flex justify-content-center gap-5">
        <div v-if="previousPage">
          <button class="btn btn-warning" @click="previousPage()">Previous</button>
        </div>
        <button class="btn btn-warning" @click="goPage()">Next</button>
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
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      getSetsByThemeId,

      async goPage() {
        try {
          await legoSetsService.goPage(AppState.nextPage)
        } catch (error) {
          Pop.error(error)
        }
      },
      async previousPage() {
        try {
          await legoSetsService.goPage(AppState.previousPage)
        } catch (error) {
          Pop.error(error)
        }
      }
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

.collection-image {
  height: 30vh;
  max-width: 30vh;
  border-radius: 50%;
  background-size: cover;
  margin-top: 5vh;
  margin-inline: 10vh;
}

// scaling inner div & animation transition

.collection-image:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 20px yellow;
  transition: .3s;
}
</style>
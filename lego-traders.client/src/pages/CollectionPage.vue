<template>
  <div class="collection container-fluid bg-success">
    <div class="row">
      <div class="col-md-12 p-3 text-center">
        <!-- TODO there are several theme #'s for our themes need to figure out a way to get all of them -->
        <img
          @click="getSetsByThemeId(158)"
          class="selectable collection-image"
          src="https://www.brickfanatics.com/wp-content/uploads/2019/04/LEGO-Star-Wars-logo-featured-800-445.jpg"
          alt=""
        />
        <img
          @click="getSetsByThemeId(1)"
          class="selectable collection-image"
          src="https://daniatoys.com/wp-content/uploads/2015/10/technic_logo_background_500x500.png"
          alt=""
        />
        <img
          @click="getSetsByThemeId(246)"
          class="selectable collection-image"
          src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_LegoHarryPotterCollection_image1600w.jpg"
          alt=""
        />
      </div>
      <div class="col-md-12 text-center">
        <img
          @click="getSetsByThemeId(252)"
          class="selectable mt-0 collection-image"
          src="https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/7/AmazonStores/ATVPDKIKX0DER/42195ca33c3846624aa5fddd2618a01c.w1000.h1000.jpg"
          alt=""
        />
        <img
          @click="getSetsByThemeId(52)"
          class="selectable mt-0 collection-image"
          src="https://www.brickfanatics.com/wp-content/uploads/LEGO-City-logo-featured-800-445.jpg"
          alt=""
        />
      </div>
      <!-- Search Input -->
      <form @submit.prevent="handleSubmit">
        <div class="form-floating col-12 mt-5">
          <input
            type="search"
            class="form-control"
            minlength="1"
            required
            placeholder="search legos"
            v-model="editable.term"
          />
          <label for="floatingInput">Search...</label>
          <div class="text-end">
            <button type="submit" class="btn btn-warning">Search</button>
          </div>
        </div>
      </form>
      <!-- Lego Set Cards -->
      <div class="d-flex flex-wrap justify-content-center mt-5">
        <LegoSetCard
          v-for="set in apiSets"
          :key="set.set_num"
          :legoSet="set"
          class="m-3 border-test"
        />
      </div>
      <!-- Pagination -->
      <div class="col-12 d-flex justify-content-center gap-5">
        <div v-show="previousPage">
          <button class="btn btn-warning" @click="goPage(previousPage)">
            Previous
          </button>
        </div>
        <div v-show="nextPage">
          <button class="btn btn-warning" @click="goPage(nextPage)">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pop from "../utils/Pop";
import { legoSetsService } from "../services/LegoSetsService";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import LegoSetCard from "../components/LegoSetCard.vue";
import { ref } from "vue";
export default {
  setup() {
    const editable = ref({});
    async function getSetsByThemeId(themeId) {
      try {
        await legoSetsService.getSetsByThemeId(themeId);
      } catch (error) {
        Pop.error(error, "Getting Set Themes");
      }
    }

    return {
      editable,
      legoSetThemes: computed(() => AppState.legoSetThemes),
      apiSets: computed(() => AppState.apiSets),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      activeCollection: computed(() => AppState.activeCollection),
      getSetsByThemeId,

      async handleSubmit() {
        try {
          await legoSetsService.getSetsBySearch(editable.value.term);
        } catch (error) {
          Pop.error(error);
        }
      },

      async goPage(url) {
        try {
          await legoSetsService.goPage(url);
          window.scrollTo(0, 500);
        } catch (error) {
          Pop.error(error);
        }
      },
    };
  },
  components: { LegoSetCard },
};
</script>

<style lang="scss" scoped>
.collection {
  // background-image: url("grey-lego.webp");
  background-size: auto;
  background-position: top left;
  min-height: 90vh;
}

.collection-image {
  height: 12vh;
  max-width: 12vh;
  border-radius: 50%;
  object-fit: fill;
  margin-top: 5vh;
  margin-inline: 10vh;
}

// scaling inner div & animation transition

.collection-image:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 20px yellow;
  transition: 0.3s;
}

.border-test {
  border: 1.5rem solid;
  border-image-slice: 33 0 0 33;
  border-image-outset: 0px 1.5rem 1.5rem 0px;
  border-image-repeat: repeat repeat;
  border-image-source: url("blue-lego.webp");
}
</style>

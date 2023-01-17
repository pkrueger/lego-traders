<template>
  <div class="collection container-fluid bg-light">
    <div class="row">
      <div id="carouselExampleControls" class="carousel carousel-dark slide">
        <div class="carousel-inner">
          <div class="carousel-item active text-center">
            <img
              class="img-fluid full-screen"
              src="../assets/img/LegoStarWarsLogo.jpg"
              alt=""
            />
          </div>
          <div class="carousel-item" data-interval="false">
            <img
              class="img-fluid full-screen"
              src="../assets/img/TechnicLogo.png"
              alt=""
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
          @click="getSetsByThemeId(themes.map())"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <!-- Theme Buttons -->
      <!-- <div class="col-md-12 p-3 text-center">
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

        <img
          @click="getSetsByThemeId(252)"
          class="selectable collection-image"
          src="https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/7/AmazonStores/ATVPDKIKX0DER/42195ca33c3846624aa5fddd2618a01c.w1000.h1000.jpg"
          alt=""
        />
        <img
          @click="getSetsByThemeId(324)"
          class="selectable collection-image"
          src="https://th.bing.com/th/id/OIP.rqqFzdeIZIQe1_LDW-7AgQHaF7?pid=ImgDet&rs=1"
          alt=""
        />
      </div> -->
      <!-- Search Input -->
      <form
        @submit.prevent="handleSubmit"
        class="d-flex justify-content-center"
      >
        <div class="form-floating col-6 mt-5">
          <input
            type="search"
            class="form-control"
            minlength="1"
            required
            placeholder="search legos"
            v-model="editable.term"
          />
          <label for="floatingInput">Search all sets...</label>
        </div>
      </form>
    </div>
    <!-- Lego Set Cards -->
    <div class="row sets overflow-auto" style="height: 70vh">
      <div class="col-lg-2 col-md-6 col-12" v-for="l in apiSets">
        <LegoSetCard :key="l.set_num" :legoSet="l" class="m-3 border-test" />
      </div>
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
    <!-- Pagination -->
  </div>
</template>

<script>
import Pop from "../utils/Pop";
import { legoSetsService } from "../services/LegoSetsService";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import LegoSetCard from "../components/LegoSetCard.vue";
import { onMounted, ref } from "vue";
export default {
  setup() {
    const editable = ref({});
    async function getSetsByThemeId(themeId) {
      try {
        await legoSetsService.getSetsByThemeId(themeId);
        console.log(themeId);
      } catch (error) {
        Pop.error(error, "Getting Set Themes");
      }
    }
    onMounted(() => {
      getSetsByThemeId(158);
    });
    return {
      editable,
      legoSetThemes: computed(() => AppState.legoSetThemes),
      apiSets: computed(() => AppState.apiSets),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      activeCollection: computed(() => AppState.activeCollection),
      themes: [158, 1, 246, 252, 324],
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
  height: 15rem;
  max-width: 15rem;
  border-radius: 50%;
  object-fit: contain;
  margin-top: 5vh;
  margin-inline: 5vh;
}

// scaling inner div & animation transition

.collection-image:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 20px yellow;
  transition: 0.3s;
}

.border-test {
  border-radius: 0%;
  border: none;
  border-left: 1.5rem solid;
  border-image-source: url("/grey-lego.webp");
  border-image-slice: 30 0 0 30;
  border-image-repeat: repeat repeat;
}
.full-screen {
  position: relative;
  height: 91vh;
  width: 100vw;
  background-size: fill;
  background-position: center;
  background-repeat: no-repeat;
}
form {
  position: absolute;
  top: 10vh;
}
.sets {
  position: absolute;
  top: 27vh;
}
</style>

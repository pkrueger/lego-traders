<template>
  <!-- Set Details -->
  <div class="container-fluid px-4 bg-light">
    <div class="row py-3">
      <router-link :to="{ name: 'Collection'}">
        <i class="mdi mdi-arrow-left-thick fs-3" title="Collections Page"></i>
      </router-link>
      <div class="col-12 d-flex gap-5 justify-content-center pb-3">
        <button class="btn btn-primary button-size" v-if="!legoSet.ownerId" @click="addSetToAccount(legoSet)">
          Add to Account
        </button>
        <button v-if="!legoSet.ownerId" @click="addSetToWishList(legoSet)" class="btn btn-primary button-size"
          title="Add to Wishlist">
          Add to Wishlist
        </button>
        <button class="btn btn-primary button-size" type="button" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          Parts List
        </button>
        <a :href="
          'https://www.google.com/search?tbm=shop&hl=en&psb=1&ved=0CAAQvOkFahcKEwiAkYjb1e_6AhUAAAAAHQAAAAAQEQ&q=' +
          `lego set number ${legoSet.set_num} ${legoSet.name}`
        " target="_blank" title="Search set on Google Shopping">
          <button class="btn btn-danger mdi mdi-shopping fs-5"></button>
        </a>
      </div>
      <h4 class="text-center">{{ legoSet.name }}</h4>
      <div class="col-md-12 d-flex justify-content-center">
        <img :src="legoSet.set_img_url" class="img-fluid set-img" :title="legoSet.name" />
      </div>
      <div class="col-sm-12 col-md-12 p-1">
        <div class="text-center d-flex justify-content-center gap-5">
          <h4>Set Number {{ legoSet.set_num }}</h4>
          <h4>Realease Year: {{ legoSet.year }}</h4>
          <h4>{{ legoSet.num_parts }} pcs</h4>
        </div>
      </div>
    </div>
    <!-- MOC sets -->
    <div class="row" v-if="mocSets.length">
      <h1>Alternate MOC's</h1>
      <div class="col-12 col-md-12 col-lg-3 d-flex justify-content-center p-3 border-test" v-for="m in mocSets">
        <div class="card moc-card text-center">
          <a :href="m.moc_url" target="_blank">
            <img :src="m.moc_img_url" title="Rebrickable set details" class="img-fluid moc-img pointer" />
          </a>
          <div class="card-body text-dark">
            <h5>{{ m.name }} || {{ m.num_parts }} pcs</h5>
            <h6>
              Designed by: <i>{{ m.designer_name }}</i>
            </h6>
          </div>
        </div>
      </div>
    </div>
    <!-- Comments -->
    <div class="row">
      <div class="col-md-6 d-flex order-sm-1">
        <form @submit.prevent="handleSubmit" v-if="account.id">
          <div class="px-1">
            <div class="input-group" style="height: 50px">
              <input type="text" v-model="editable.body" required class="form-control" placeholder="Comments..."
                aria-label="comment body" aria-describedby="button-addon1" maxlength="250" />
              <button class="btn btn-primary" type="submit" id="body">
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
      <!-- Users who want to trade specific set-->
      <div class="col-md-6 d-flex justify-content-end order-sm-3">
        <div class="d-flex" v-if="owners.length > 0">
          <h3 class="px-5">Trade Requests</h3>
          <div v-for="o in owners">
            <router-link :to="{ name: 'Profile', params: { profileId: o.owner.id } }">
              <img :src="o.owner?.picture" alt="user picture" class="user-img" :title="o.owner?.name" />
            </router-link>
          </div>
        </div>
        <div v-else>
          <h3>No Trades</h3>
        </div>
      </div>
      <div class="col-sm-12 col-md-7 card bg-grey p-2 m-3 order-sm-3" v-if="comments.length > 0">
        <LegoSetComments v-for="c in comments" :key="c.id" :comment="c" />
      </div>
      <div v-else>
        <h4>Be first to Comment</h4>
      </div>
    </div>
  </div>

  <!-- OffCanvas -->
  <div class="offcanvas offcanvas-end overflow2 container-fluid" tabindex="-1" id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel" style="width: 50%">
    <div class="row">
      <div class="offcanvas-header bg-primary">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">Parts List</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" title="close"></button>
      </div>
      <div class="offcanvas-body overflow bg-primary col-sm-12 col-md-6 col-lg-2" v-for="s in setParts">
        <a :href="s.part.part_url" target="_blank">
          <div class="d-flex justify-content-center part-border">
            <img :src="s.part.part_img_url" :title="s.part.name" class="part-img" />
          </div>
        </a>
      </div>
      <div class="d-flex justify-content-between col-12 bg-primary py-2">
        <div v-show="previousPage">
          <button class="btn btn-warning" @click="goPageParts(previousPage)">
            Previous
          </button>
        </div>
        <div v-show="nextPage">
          <button class="btn btn-warning" @click="goPageParts(nextPage)">
            Next-->
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { legoSetsService } from "../services/LegoSetsService";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { commentsService } from "../services/CommentsService";
import LegoSetComments from "../components/LegoSetComments.vue";
export default {
  setup() {
    const route = useRoute();
    const editable = ref({ set_num: "" });
    onMounted(() => {
      getSetAlternates();
      getSetBySetNum();
      getPartsBySetNum();
      getSetDetailsComments();
      legoSetsService.getTradableSets();
    });
    async function getSetAlternates() {
      try {
        AppState.activeMOCset = [];
        await legoSetsService.getSetAlternates(route.params.set_num);
      } catch (error) {
        Pop.error(error, "geting set alternates");
      }
    }
    async function getSetBySetNum() {
      try {
        AppState.activeApiSet = [];
        await legoSetsService.getSetBySetNum(route.params.set_num);
      } catch (error) {
        Pop.error(error, "get set by setNum");
      }
    }
    async function getPartsBySetNum() {
      try {
        await legoSetsService.getPartsBySetNum(route.params.set_num);
      } catch (error) {
        Pop.error(error, "getting parts list");
      }
    }
    async function getSetDetailsComments() {
      try {
        await commentsService.getSetDetailsComments(route.params.set_num);
      } catch (error) {
        Pop.error(error);
      }
    }
    return {
      editable,
      account: computed(() => AppState.account),
      legoSet: computed(() => AppState.activeApiSet),
      mocSets: computed(() => AppState.activeMOCset),
      setParts: computed(() => AppState.activeApiSetParts),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      comments: computed(() => AppState.comments),
      owners: computed(() =>
        AppState.tradableSet.filter((t) => t.set_num == route.params.set_num)
      ),

      async addSetToAccount(data) {
        try {
          const yes = await Pop.confirm("Do you own this?", "");
          if (!yes) {
            await legoSetsService.addSetToAccount(data);
          } else {
            data.isOwned = true;
            await legoSetsService.addSetToAccount(data);
          }
        } catch (error) {
          Pop.error("[addToAccount]", error);
        }
      },
      async addSetToWishList(legoSet) {
        try {
          Pop.success(`You added ${legoSet.name} to your wishlist!`);
          legoSet.isOwned = false;
          await legoSetsService.addSetToAccount(legoSet);
        } catch (error) {
          Pop.error("[addToAccount]", error);
        }
      },
      async goPageParts(url) {
        try {
          await legoSetsService.goPageParts(url);
        } catch (error) {
          Pop.error(error);
        }
      },
      async handleSubmit() {
        try {
          editable.value.set_num = route.params.set_num;
          await commentsService.createComment(editable.value);
          editable.value = {};
        } catch (error) {
          Pop.error(error, "Submitting Form");
        }
      },
    };
  },
  components: { LegoSetComments },
};
</script>

<style lang="scss" scoped>
.moc-img {
  max-height: 25vh;
  max-width: 25vh;
  min-height: 20vh;
  min-width: 20vh;
}

.moc-card {
  min-width: 100%;
  border-left: 1.5rem solid;
  border-image-slice: 0 0 0 33;
  border-image-outset: 0px 0rem 0rem 0px;
  border-image-repeat: repeat repeat;
  border-image-source: url("grey-lego.webp");
}

.set-img {
  max-width: 50%;
  border-radius: 2px;
  outline: #2f2f2f solid 3px;
}

.part-img {
  max-width: 15vh;
  outline: #2f2f2f solid 3px;
}

.user-img {
  border-right: 5px solid #ffda44;
  border-left: 5px solid #ffda44;
  max-width: 7vh;
  min-height: 7vh;
}

.offbody {
  min-height: 100%;
}

.pointer {
  cursor: pointer;
}

.overflow {
  overflow-y: visible;
}

.overflow2 {
  overflow-y: scroll;
}

.button-size {
  min-width: 9rem;
}
</style>

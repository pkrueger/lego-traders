<template>
  <!-- Set Details -->
  <div class="container-fluid bg text-shadow">
    <div class="row">
      <div class="col-md-6">
        <img :src="legoSet.set_img_url" class="img-fluid set-img" :title="legoSet.name">
      </div>
      <div class="col-md-6">
        <div class="text-center">
          <h4>{{legoSet.name}}</h4>
          <h4>Realease Year: {{legoSet.year}}</h4>
          <h4>{{legoSet.num_parts}} pcs</h4>
        </div>
      </div>
      <!-- Set Owners -->
      <div class="col-12 d-flex">
        <div v-for="o in owners" class="px-2 py-3">
          <img :src="o.owner.picture" alt="user picture" class="user-img" :title="o.owner.name">
        </div>
      </div>
      <div class="d-flex justify-content-end col-12">
        <button class="btn btn-primary" v-if="!legoSet.ownerId" @click="addSetToAccount(legoSet)">Add to
          Account</button>
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight">Parts List</button>
      </div>
    </div>
    <!-- MOC sets -->
    <div class="row" v-if="mocSets.length">
      <h1>Alternate MOC's</h1>
      <div class="col-3 d-flex justify-content-center p-3" v-for="m in mocSets">
        <div class="card">
          <a :href="m.moc_url" target="_blank">
            <img :src="m.moc_img_url" class="img-fluid moc-img pointer">
          </a>
          <div class="card-body">
            <h5>{{m.name}} || {{m.num_parts}} pcs</h5>
            <h6>Designed by: <i>{{m.designer_name}}</i></h6>
          </div>
        </div>
      </div>
    </div>
    <!-- Comments -->
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="handleSubmit">
          <div class="p-3">
            <label for="body"></label>
            <textarea v-model="editable.body" placeholder="comments" class="form-control" style="height: 100px" required
              minlength="1" maxlength="500"></textarea>
          </div>
          <div class="d-flex justify-content-end p-2">
            <button class="btn btn-secondary">Post</button>
          </div>
        </form>
        <div class="col-12">
          <LegoSetComments v-for="c in comments" :key="c.id" :comment="c" />
        </div>
      </div>
    </div>
  </div>


  <!-- OffCanvas -->
  <div class="offcanvas offcanvas-end overflow2 w-50" tabindex="-1" id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">Parts List</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" title="close"></button>
    </div>
    <div class="offcanvas-body overflow my-1 d-flex" v-for="s in setParts">
      <a :href="s.part.part_url" target="_blank" class="pointer-parts w-100">
        <h6>{{s.part.name}} || {{s.quantity}}x</h6>
        <div>
          <img :src="s.part.part_img_url" class="part-img">
        </div>
      </a>
    </div>
    <div class="d-flex gap-5">
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
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { legoSetsService } from "../services/LegoSetsService";
import Pop from "../utils/Pop";
import { AppState } from "../AppState"
import { useRoute } from "vue-router";
import { setDetailsComments } from "../services/SetDetailsComments";
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
    });
    async function getSetAlternates() {
      try {
        AppState.activeMOCset = [];
        await legoSetsService.getSetAlternates(route.params.set_num);
      }
      catch (error) {
        Pop.error(error, "geting set alternates");
      }
    }
    async function getSetBySetNum() {
      try {
        AppState.activeApiSet = [];
        await legoSetsService.getSetBySetNum(route.params.set_num);
      }
      catch (error) {
        Pop.error(error, "get set by setNum");
      }
    }
    async function getPartsBySetNum() {
      try {
        await legoSetsService.getPartsBySetNum(route.params.set_num);
      }
      catch (error) {
        Pop.error(error, "getting parts list");
      }
    }
    async function getSetDetailsComments() {
      try {
        await setDetailsComments.getSetDetailsComments(route.params.set_num);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    return {
      editable,
      legoSet: computed(() => AppState.activeApiSet),
      mocSets: computed(() => AppState.activeMOCset),
      setParts: computed(() => AppState.activeApiSetParts),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      comments: computed(() => AppState.comments),
      owners: computed(() => AppState.tradableSet),
      async addSetToAccount(data) {
        try {
          const yes = await Pop.confirm("Do you own this?", "");
          if (!yes) {
            await legoSetsService.addSetToAccount(data);
          }
          else {
            data.isOwned = true;
            await legoSetsService.addSetToAccount(data);
          }
        }
        catch (error) {
          Pop.error("[addToAccount]", error);
        }
      },
      async goPageParts(url) {
        try {
          await legoSetsService.goPageParts(url);
        }
        catch (error) {
          Pop.error(error);
        }
      },
      async handleSubmit() {
        try {
          editable.value.set_num = route.params.set_num;
          await setDetailsComments.createComment(editable.value);
          editable.value = {};
        }
        catch (error) {
          Pop.error(error, "Submitting Form");
        }
      },
    };
  },
  components: { LegoSetComments }
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

.part-img {
  max-width: 15vh;
}

.user-img {
  border-radius: 50%;
  max-width: 7vh;
}

.pointer {
  cursor: pointer;
}

.pointer-parts {
  cursor: pointer;
  width: fit-content;
}

.pointer-parts:hover {
  // content: url(https://cdn.rebrickable.com/media/parts/elements/301026.jpg);
  display: block;
  position: absolute;
}

.bg {
  background-image: url('grey-lego.webp');
  background-position: top left;
  min-height: 100vh;
}

.text-shadow {
  color: #000000;
  text-shadow: 0px 0px 5px #ff7777d7;
  font-weight: bold;
  letter-spacing: 0.08rem;
}

.overflow {
  overflow-y: hidden;
}

.overflow2 {
  overflow-y: scroll;
}
</style>
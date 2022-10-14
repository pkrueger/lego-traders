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
      <div class="d-flex justify-content-end">
        <button class="btn btn-primary" v-if="!legoSet.ownerId" @click="addSetToAccount(legoSet)">Add to
          Account</button>
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight">Toggle right offcanvas</button>
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
  </div>


  <!-- OffCanvas -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">Parts List</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body" v-for="s in setParts">
      <p>{{s.part.name}} || {{s.quantity}}</p>
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
      getPartsBySetNum()
    })

    async function getSetAlternates() {
      try {
        AppState.activeMOCset = []
        await legoSetsService.getSetAlternates(route.params.set_num)
      } catch (error) {
        Pop.error(error, 'geting set alternates')
      }
    }

    async function getSetBySetNum() {
      try {
        AppState.activeApiSet = []
        await legoSetsService.getSetBySetNum(route.params.set_num)
      } catch (error) {
        Pop.error(error, 'get set by setNum')
      }
    }
    async function getPartsBySetNum() {
      try {
        await legoSetsService.getPartsBySetNum(route.params.set_num)
      } catch (error) {
        Pop.error(error, 'getting parts list')
      }
    }

    return {
      legoSet: computed(() => AppState.activeApiSet),
      mocSets: computed(() => AppState.activeMOCset),
      setParts: computed(() => AppState.activeApiSetParts),
      async addSetToAccount(data) {
        try {
          const yes = await Pop.confirm('Do you own this?', '')
          if (!yes) {
            await legoSetsService.addSetToAccount(data)
          } else {
            data.isOwned = true
            await legoSetsService.addSetToAccount(data)
          }
        } catch (error) {
          Pop.error('[addToAccount]', error)
        }
      },
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
</style>
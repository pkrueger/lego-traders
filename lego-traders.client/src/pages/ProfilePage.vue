<template>
  <div v-if="account" class="container-fluid">
    <div class="row mt-3">
      <div class="col-12">
        <div class="row">

          <div class="col-3">
            <img class="p-3 img-fluid img-size" :src="account.picture" alt="User Name">
          </div>
          <div class="border border-dark col-9 p-2">
            <h3>Name: {{account.name}}</h3>
            <h5>About: </h5>
            <p>{{account.desc}}</p>
          </div>
        </div>
      </div>
      <!-- <div class="col-1">
        <div>
          <button type="button" class="btn btn-primary">Message User</button>
        </div>
      </div> -->

    </div>
    <div class="row">
      <div class="col-12">
        <h3>Owned Sets:</h3>
        <div class="row">
          <!-- RouterLink to Set Details page -->
          <div class="col-lg-3 d-flex justify-content-center" v-for="l in ownedLegoSets">

            <LegoSetCard :key="l.id" :legoSet="l" />

          </div>
          <!-- TODO Component for My Sets  -->
        </div>
        <div class="col-lg-12 d-flex justify-content-center">
          <div class="row">
            <h3>WishList:</h3>
            <div class="col-3" v-for="l in wishListLegoSets">

              <LegoSetCard :key="l.id" :legoSet="l" />

            </div>
          </div>
          <!-- TODO Component for My Wishlist  v-if="!l.isOwned"  -->
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { accountService } from '../services/AccountService.js';
import { legoSetsService } from '../services/LegoSetsService.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {
    const route = useRoute()
    async function getLegoSetsById() {
      try {
        await legoSetsService.getProfileLegoSets(route.params.profileId)
      } catch (error) {
        Pop.error('[getLegoSetsById]')
      }
    }
    async function getProfilebyId() {
      try {
        await accountService.getProfile(route.params.profileId)
      } catch (error) {
        Pop.error('[GetProfilebyId]')
      }
    }

    onMounted(() => {
      getProfilebyId()
      getLegoSetsById()
    })
    return {
      wishListLegoSets: computed(() => AppState.legoSet.filter(l => !l.isOwned)),
      ownedLegoSets: computed(() => AppState.legoSet.filter(l => l.isOwned)),
      account: computed(() => AppState.activeProfile),
    };
  },

}
</script>


<style lang="scss" scoped>
main {
  background-color: var(--bs-grey);
}

.img-size {
  min-height: 30vh;
  min-width: 20vw;
}

.border-box {
  min-width: 70vw;
  min-height: 30vh;
}

img {
  max-width: 100px;
}

@media (max-width: 1000px) {


  .border-box {
    min-width: 60vw;
    min-height: 10vh;
  }

  .img-size {
    min-height: 15vh;
  }
}
</style>
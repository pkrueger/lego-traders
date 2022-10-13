<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-md-11 d-flex">
        <div>
          <img class="img-size p-3" :src="account.picture" alt="User Name">
        </div>
        <div class="border border-dark border-box p-2">
          <h3>Name: {{account.name}}</h3>
          <h5>About: </h5>
          <p>{{account.desc}}</p>
        </div>
      </div>
      <div class="col-md-1">
        <div>
          <button type="button" class="btn btn-primary">Message User</button>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="col-12">
        <h3>Owned Sets:</h3>
        <div class="row">
          <!-- RouterLink to Set Details page -->
          <div class="col-3" v-for="l in ownedLegoSets">

            <LegoSetCard :key="l.id" :legoSet="l" />

          </div>
          <!-- TODO Component for My Sets  -->
        </div>
        <div class="col-12">
          <h3>WishList:</h3>
          <div class="row">
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
import UserDetails from '../components/UserDetails.vue';
import { accountService } from '../services/AccountService.js';
import { legoSetsService } from '../services/LegoSetsService.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {
    const route = useRoute()
    async function getLegoSetsById() {
      try {
        await legoSetsService.getMyLegoSets(route.params.id)
      } catch (error) {
        Pop.error('[getLegoSetsById]')
      }
    }
    async function getProfilebyId() {
      try {
        await accountService.getProfile(route.params.id)
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
  components: { UserDetails }
}
</script>


<style lang="scss" scoped>

</style>
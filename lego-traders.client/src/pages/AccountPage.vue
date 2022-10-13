<template>
  <div class="container-fluid">
    <!-- Account Details -->
    <div class="row mt-3">
      <div class="col-md-11 d-flex">
        <!-- TODO make set to account img -->
        <div>
          <img class="img-size p-3" :src="account.picture" alt="User Name">
        </div>
        <div class="border border-dark border-box p-2">
          <!-- Account Details -->
          <h3>Name: {{account.name}}</h3>
          <h5>Description: </h5>
          <p>{{account.desc}}</p>
        </div>
      </div>
      <div class="col-md-1">
        <div>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#accountModal">Manage
            Account</button>
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
  <AccountModal />
</template>

<script>
import { onAuthLoaded } from '@bcwdev/auth0provider-client';
import { computed } from 'vue'
import { AppState } from '../AppState'
import AccountModal from '../components/AccountModal.vue';
import LegoSetCard from '../components/LegoSetCard.vue';
import { legoSetsService } from '../services/LegoSetsService.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {
    // REVIEW This should wait for Login to finish but its not....

    onAuthLoaded(() => getMyLegoSets())
    // onMounted(() => {
    //   getMyLegoSets()
    // })
    async function getMyLegoSets() {
      try {
        await legoSetsService.getMyLegoSets(AppState.account.id)
      } catch (error) {
        Pop.error('[getMyLegoSets]', error)
      }
    }
    return {
      account: computed(() => AppState.account),
      wishListLegoSets: computed(() => AppState.legoSet.filter(l => !l.isOwned)),
      ownedLegoSets: computed(() => AppState.legoSet.filter(l => l.isOwned))
    };
  },
  components: { AccountModal, LegoSetCard }
}
</script>

<style>
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
</style>

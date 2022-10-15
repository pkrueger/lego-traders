<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <!-- <UserDetails :account="account" /> -->
      <div class="col-md-11 d-flex">
        <div class="row">

          <div class="col-4">
            <img class="img-fluid p-3" :src="account.picture" alt="User Name">
          </div>
          <div class="col-4 border border-dark p-2">
            <h3>Name: {{account.name}}</h3>
            <h5>About: </h5>
            <p>{{account.desc}}</p>
          </div>
          <div class="col-4">
            <div>
              <!-- Sent Trades -->
            </div>
            <div>
              <!-- received trades -->
            </div>
          </div>

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
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import AccountModal from '../components/AccountModal.vue';
import LegoSetCard from '../components/LegoSetCard.vue';
import Pop from '../utils/Pop.js';
import { marketplaceService } from '../services/MarketplaceService.js'
export default {
  setup() {
    async function getSentTrades() {
      try {
        await marketplaceService.getSentTrades()
      } catch (error) {
        Pop.error('[getSentTrades]', error)
      }
    }
    async function getReceivedTrades() {
      try {
        await marketplaceService.getReceivedTrades()
      } catch (error) {
        Pop.error('[getSentTrades]', error)
      }
    }
    onMounted(() => {
      getSentTrades()
      getReceivedTrades()
    })

    return {
      account: computed(() => AppState.account),
      wishListLegoSets: computed(() => AppState.myLegoSets.filter(l => !l.isOwned)),
      ownedLegoSets: computed(() => AppState.myLegoSets.filter(l => l.isOwned)),
      sentTrades: computed(() => AppState.sentTrades),
      receivedTrades: computed(() => AppState.receivedTrades),
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
  min-height: 20vh;
  min-width: 15vw;
}

.border-box {
  min-width: 70vw;
  min-height: 30vh;
}

img {
  max-width: 100px;
}
</style>

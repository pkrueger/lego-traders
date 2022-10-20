<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-lg-11 d-flex">
        <div class="row justify-content-between m-auto">
          <div class="col-lg-4 order-lg-1 ">
            <img class="img-fluid p-3 profile-img" :src="account.picture" alt="User Name">
          </div>
          <div class="col-lg-4 order-lg-2 border border-dark p-2 my-2">
            <h3>Name: {{account.name}}</h3>
            <h5>About: </h5>
            <p>{{account.desc}}</p>
          </div>
          <div class="col-lg-4 order-lg-3">
            <YourTrades />
          </div>
        </div>
      </div>
      <div class="col-lg-1">
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
          <div class="col-lg-3 d-flex justify-content-center mb-3" v-for="l in ownedLegoSets">
            <LegoSetCard :key="l.id" :legoSet="l" />
          </div>
          <!-- TODO Component for My Sets  -->
        </div>
        <div class="col-12">
          <h3>WishList:</h3>
          <div class="row">
            <div class="col-lg-3 mb-3" v-for="l in wishListLegoSets">
              <LegoSetCard :key="l.id" :legoSet="l" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AccountModal />

</template>

<script>
import { computed, onMounted, watchEffect } from 'vue'
import { AppState } from '../AppState'
import AccountModal from '../components/AccountModal.vue';
import LegoSetCard from '../components/LegoSetCard.vue';
import TradeChatOffcanvas from '../components/TradeChatOffcanvas.vue'
import YourTrades from '../components/YourTrades.vue'
export default {
  setup() {

    watchEffect(() => {
      AppState.sentTrades
      AppState.receivedTrades
      AppState.myLegoSets

    })


    return {
      account: computed(() => AppState.account),
      wishListLegoSets: computed(() => AppState.myLegoSets.filter(l => !l.isOwned)),
      ownedLegoSets: computed(() => AppState.myLegoSets.filter(l => l.isOwned)),

    };
  },
  components: { AccountModal, LegoSetCard, TradeChatOffcanvas, YourTrades }
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

/* doesn't work atm... */
@media (max-width: 1000px) {
  .profil-img {
    display: none
  }
}

.border-box {
  min-width: 70vw;
  min-height: 30vh;
}

img {
  max-width: 100px;
}
</style>
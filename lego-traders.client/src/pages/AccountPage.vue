<template>
  <div class="container-fluid bg-primary account-page">
    <div class="row">
      <div class="col-lg-12">
        <div class="row m-auto justify-content-between">
          <div class="col-lg-4 order-lg-1 text-center p-3">
            <img class="img-fluid my-2 profile-img" :src="account.picture" alt="User Name">
          </div>
          <div class="bg-white col-lg-4 card order-lg-2 d-flex flex-column justify-content-between p-0 my-2">
            <div class="card-header">
              <h3>Name: {{account.name}}</h3>
            </div>
            <div class="card-body">
              <h3>About: </h3>
              <p>{{account.desc}}</p>
            </div>
            <div class="align-self-end">
              <button type="button" class="btn btn-primary me-2 mb-2" data-bs-toggle="modal"
                data-bs-target="#accountModal">Manage
                Account</button>
            </div>

          </div>
          <div class="col-lg-3 order-lg-3 my-2">
            <YourTrades />
          </div>
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
.account-page {
  flex-grow: 1;
}

.profile-img {
  max-height: auto;
}

/* doesn't work atm... */
@media (max-width: 1000px) {
  .profile-img {
    max-height: 20vh;
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
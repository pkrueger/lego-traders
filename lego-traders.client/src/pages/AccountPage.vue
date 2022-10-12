<template>
  <div class="container-fluid">
    <!-- Account Details -->
    <div class="row mt-3">
      <div class="col-md-11 d-flex">
        <!-- TODO make set to account img -->
        <div>
          <img class="img-size p-3"
            src="https://cdn.shopify.com/s/files/1/0225/9107/8480/products/headgear_bluehatwizardlightbluishgrayhairLegobricks4cheapcastle_2048x2048.jpg?v=1653610672"
            alt="User Name">
        </div>
        <div class="border border-dark border-box p-2">
          <!-- TODO add Account Details -->
          <h3>Name: Randy</h3>
          <h5>Description: </h5>
          <p>I'm a harry wizard</p>
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
        <div>
          <!-- TODO Component for My Sets -->
        </div>
      </div>
      <div class="col-12">
        <h3>WishList:</h3>
        <div>
          <!-- TODO Component for My Wishlist -->
        </div>
      </div>
    </div>
  </div>
  <AccountModal />
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import AccountModal from '../components/AccountModal.vue';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    };
  },
  components: { AccountModal }
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

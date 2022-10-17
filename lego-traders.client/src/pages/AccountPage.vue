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
            <div class="card">
              <div class="card-header">
                <h5>Trades</h5>
              </div>
              <div class="card-body">
                <div>
                  <strong>Sent</strong>
                  <div v-for="t in sentTrades" class="d-flex justify-content-around">

                    <p>
                      Requested Set: <img class="me-auto" height="30" :src="t.requestedSet.set_img_url"
                        :alt="t.requestedSet.name" :title="t.requestedSet.name">
                    </p>
                    <p>
                      Status: {{t.status}}
                      <span v-if="t.body" class="field-tip">
                        <i class="mdi mdi-note"></i>
                        <span class="tip-content">{{t.body}}</span>
                      </span>

                    </p>
                    <p>
                      Offered Set: <img class="" height="30" :src="t.offeredSet.set_img_url" :alt="t.offeredSet.name"
                        :title="t.offeredSet.name">
                    </p>
                    <i v-if="t.status != 'pending'" class="mdi mdi-close text-danger" @click="removeTrade(t.id)"></i>
                  </div>
                </div>
                <div>
                  <strong>Requested</strong>
                  <div v-for="t in receivedTrades" class="d-flex justify-content-around">

                    <p>
                      Offered Set: <img class="" height="30" :src="t.offeredSet.set_img_url" :alt="t.offeredSet.name"
                        :title="t.offeredSet.name">
                    </p>
                    <p v-if="t.status == 'pending'">
                      <button @click="changeStatus(t.id, 'accepted')">Accept</button>
                      <button @click="changeStatus(t.id, 'rejected')">Reject</button>
                    </p>
                    <p v-else>
                      Status: {{t.status}}
                      <span v-if="t.body" class="field-tip">
                        <i class="mdi mdi-note"></i>
                        <span class="tip-content">{{t.body}}</span>
                      </span>
                    </p>
                    <p>
                      Requested Set:
                      <img class="me-auto" height="30" :src="t.requestedSet.set_img_url" :alt="t.requestedSet.name"
                        :title="t.requestedSet.name">
                    </p>
                    <i v-if="t.status != 'pending'" class="mdi mdi-close text-danger selectable"
                      @click="removeTrade(t.id)"></i>
                  </div>
                </div>
              </div>
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

      async removeTrade(id) {
        try {
          await marketplaceService.removeTrade(id)
        } catch (error) {
          Pop.error('[removeTrade]', error)
        }
      },

      async changeStatus(id, status) {
        try {
          Pop.success('You Responded to a trade request')
          await marketplaceService.changeStatus(id, status)
        } catch (error) {
          Pop.error('[changeStatus]', error)
        }
      }
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

.field-tip {
  position: relative;
  cursor: pointer;
}

.field-tip .tip-content {
  position: absolute;
  top: -22px;
  /* - top padding */
  right: 9999px;
  width: 200px;
  margin-right: -220px;
  /* width + left/right padding */
  padding: 10px;
  color: #fff;
  background: #333;
  -webkit-box-shadow: 2px 2px 5px #aaa;
  -moz-box-shadow: 2px 2px 5px #aaa;
  box-shadow: 2px 2px 5px #aaa;
  opacity: 0;
  -webkit-transition: opacity 250ms ease-out;
  -moz-transition: opacity 250ms ease-out;
  -ms-transition: opacity 250ms ease-out;
  -o-transition: opacity 250ms ease-out;
  transition: opacity 250ms ease-out;
}

/* <http://css-tricks.com/snippets/css/css-triangle/> */
.field-tip .tip-content:before {
  content: ' ';
  /* Must have content to display */
  position: absolute;
  top: 50%;
  left: -16px;
  /* 2 x border width */
  width: 0;
  height: 0;
  margin-top: -8px;
  /* - border width */
  border: 8px solid transparent;
  border-right-color: #333;
}

.field-tip:hover .tip-content {
  right: -20px;
  opacity: 1;
}
</style>

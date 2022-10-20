<template>
  <!-- When Adding a Set Card it needs to be inside a ROW for proper formating -->

  <div class="card card-size">
    <router-link :to="{ name: 'SetDetails', params: { set_num: legoSet.set_num } }">
      <img :src="legoSet.set_img_url" class="img-fluid p-2 img-size" alt="" />
    </router-link>
    <div class="card-body p-2">
      <h5>{{ legoSet.name }}</h5>
      <p class="m-0">Set ID: {{ legoSet.set_num }}</p>
      <p class="m-0">Year: {{ legoSet.year }}</p>
      <!-- <p class="m-0">Number of Parts: {{legoSet.num_parts}}</p> -->

      <div v-if="account.id == legoSet.ownerId && account.id && legoSet.isOwned" class="form-check">
        <input class="form-check-input" :checked="legoSet.isUpForTrade" type="checkbox" id="isUpForTrade"
          @change="toggleIsUpForTrade(legoSet)" />
        <label class="form-check-label" for="flexCheckDefault">
          Check is this set is up for trade
        </label>
      </div>
      <div>
        <button class="btn btn-primary" v-if="!legoSet.ownerId" @click="addSetToAccount(legoSet)">
          Add to Account
        </button>
      </div>
      <!-- Add Offer Trade Button v-if="legoSet.ownerId != account.id && account.id" -->
      <div v-if="!legoSet.isOwned" class="wishlist">
        <span v-if="!legoSet.isOwned && legoSet.id">
          <i @click="moveSetToOwned(legoSet)" class="mdi mdi-plus selectable" title="Add to Owned Sets"></i>
          <i @click="deleteLegoSet(legoSet.id)" class="mdi mdi-heart text-danger selectable"
            title="Remove From Wishlist"></i>

        </span>
        <i v-else @click="addSetToWishList(legoSet)" class="mdi mdi-heart-outline selectable"
          title="Add to Wishlist"></i>
      </div>
      <div v-else class="wishlist">
        <i class="mdi mdi-delete selectable" @click="deleteLegoSet(legoSet.id)" title="Remove Set from Account"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { legoSetsService } from "../services/LegoSetsService.js";
import { notificationsService } from "../services/NotificationsService.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    legoSet: { type: Object, required: true },
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async toggleIsUpForTrade(legoSet) {
        try {
          const tradableLegoSet = await legoSetsService.toggleIsUpForTrade(
            legoSet.id
          );
          if (tradableLegoSet.isUpForTrade) {
            await notificationsService.sendWishlistNote(tradableLegoSet);
          }
        } catch (error) {
          Pop.error("[toggleIsUpForTrade]", error);
        }
      },
      async moveSetToOwned(legoSet) {
        try {
          await legoSetsService.moveSetToOwned(legoSet)
        } catch (error) {
          Pop.error('[addSetToOwned]', error)
        }
      },
      async addSetToAccount(legoSet) {
        try {
          const yes = await Pop.confirm("Do you own this?", "");
          if (!yes) {
            return
          } else {
            legoSet.isOwned = true;
            await legoSetsService.addSetToAccount(legoSet);
          }
        } catch (error) {
          Pop.error("[addToAccount]", error);
        }
      },
      async addSetToWishList(legoSet) {
        try {
          Pop.success(`You added ${legoSet.name} to your wishlist!`)
          legoSet.isOwned = false;
          await legoSetsService.addSetToAccount(legoSet);
        } catch (error) {
          Pop.error("[addToAccount]", error);
        }
      },
      async deleteLegoSet(id) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete this?')
          if (!yes) { return }
          let receivedtrades = AppState.receivedTrades.filter(t => {
            return t.requestedSetId == id
          })
          if (receivedtrades.length) {
            Pop.error("You can't delete a Set you have in a trade.(delete resolved trades)")
            return
          }
          let offeredtrades = AppState.sentTrades.filter(t => {
            return t.offeredSetId == id
          })
          if (offeredtrades.length) {
            Pop.error("You can't delete a Set you have in a trade.(delete resolved trades)")
            return
          }
          await legoSetsService.deleteLegoSet(id)
        } catch (error) {
          Pop.error('[deleteLegoSet]', error)
        }
      }
    };
  },
};
</script>

<style lang="scss" scoped>
.wishlist {
  position: absolute;
  bottom: .5rem;
  right: .5rem;

}

.img-size {
  // width: 38vh;
  max-height: 38vh;

  object-fit: contain;
}
</style>

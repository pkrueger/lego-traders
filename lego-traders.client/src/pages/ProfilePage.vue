<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <UserDetails :account="account" />

    </div>
  </div>

</template>


<script>
import { computed } from '@vue/reactivity';
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
    return {
      wishListLegoSets: computed(() => AppState.legoSet.filter(l => !l.isOwned)),
      ownedLegoSets: computed(() => AppState.legoSet.filter(l => l.isOwned)),
      activeAccount: computed(() => AppState.activeProfile),
    };
  },
  components: { UserDetails }
}
</script>


<style lang="scss" scoped>

</style>
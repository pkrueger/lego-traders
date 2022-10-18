<template>
  <span class="navbar-text">
    <button
      class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0"
      @click="login"
      v-if="!user.isAuthenticated"
    >
      Login
    </button>

    <div class="" v-else>
      <div
        class="dropdown-toggle selectable dropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="authDropdown"
      >
        <div v-if="account.picture || user.picture">
          <img
            :src="account.picture || user.picture"
            alt="account photo"
            height="65"
            class="rounded"
          />
          <!-- <span class="mx-3 text-success lighten-30">{{ account.name || user.name }}</span> -->
        </div>
      </div>
      <div
        class="dropdown-menu p-2 dropdown-menu-end me-1"
        aria-labelledby="authDropdown"
      >
        <router-link :to="{ name: 'Account' }">
          <div class="hoverable">
            <h6 class="text-start text-dark">Manage Account</h6>
          </div>
        </router-link>
        <div class="hoverable text-danger" @click="logout">
          <h6 class="text-start mdi mdi-logout">logout</h6>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  transform: scale(0);
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}
</style>

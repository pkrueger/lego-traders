<template>
  <div class="yellow-lego">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex gap-1 align-items-center">
          <img alt="logo" src="../assets/img/lego-logo.png" height="45" />
          <img
            class="img-fluid trader-img"
            src="../assets/img/lego-trader.png"
            alt="logo-text"
          />
        </div>
      </router-link>
      <button
        class="navbar-toggler bg-dark"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto">
          <li>
            <router-link :to="{ name: 'Marketplace' }">
              <button
                @click="getTradableSets()"
                class="marketplace text-shadow btn btn-danger selectable text-uppercase"
              >
                Marketplace
              </button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Forum' }">
              <button
                class="forum text-shadow btn btn-primary text-uppercase text-light"
              >
                Forum
              </button>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'MOC' }"
              class="moc text-shadow btn btn-success selectable text-uppercase text-light"
            >
              Create Your Own
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'Collection' }"
              class="collections text-shadow btn btn-secondary selectable text-uppercase text-light"
            >
              Collections
            </router-link>
          </li>
        </ul>
        <!-- NOTIFICATIONS GO HERE-->
        <div class="dropdown">
          <button
            class="btn text-white me-3"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              class="fa-solid fa-bell fs-2 text-shadow"
              title="Notifications"
              aria-label="Notification tray"
            ></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end p-0">
            <li
              v-for="n in state.notifications"
              v-if="state.notifications.length"
            >
              <Notification :key="n.id" :notification="n" />
            </li>
            <li class="p-2 text-center" v-else>
              You don't have any notifications
            </li>
          </ul>
        </div>
        <!-- LOGIN COMPONENT GO HERE -->
        <Login />
      </div>
    </nav>
  </div>
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { legoSetsService } from "../services/LegoSetsService.js";
import Login from "./Login.vue";
import Notification from "./Notification.vue";
export default {
  setup() {
    const state = reactive({
      notifications: computed(() => AppState.notifications),
    });
    return {
      state,
      async getTradableSets() {
        try {
          await legoSetsService.getTradableSets();
        } catch (error) {
          Pop.error(error, "[gettingTradableSets]");
        }
      },
    };
  },
  components: { Login, Notification },
};
</script>

<style lang="scss" scoped>
.marketplace {
  /* background-image: url('red-lego.webp'); */
  /* background-position: top left; */
  border: 2px solid black;
}

.forum {
  /* background-image: url('blue-lego.webp'); */
  /* background-position: top left; */
  border: 2px solid black;
}

.moc {
  /* background-image: url('green-lego.webp'); */
  /* background-position: top left; */
  border: 2px solid black;
}

.trader-img {
  height: 2.8rem;
}

.collections {
  /* background-image: url('grey-lego.webp'); */
  /* background-position: top left; */
  border: 2px solid black;
}

.yellow-lego {
  background-image: url("yellow-lego.webp");
  background-position: top left;
  background-size: fill;
  height: 100%;
}

.navbar {
  background-color: transparent !important;
  border: 2px solid black;
}

li {
  margin-right: 1rem;
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

/* .navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-dark);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
} */

.text-shadow {
  font-weight: 600;
  color: aliceblue;
  text-shadow: 1px 1px black, 0px 0px 5px rgba(0, 0, 0, 0.719);
  letter-spacing: 0.1rem;
}

.dropdown-menu {
  width: 70ch;

  li {
    border-bottom: 0.1rem solid rgb(0, 0, 0, 0.5);
  }
}
</style>

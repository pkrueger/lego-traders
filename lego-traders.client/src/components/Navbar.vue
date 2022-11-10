<template>
  <div class="bg-warning">
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
              <button class="forum text-shadow btn btn-primary text-uppercase">
                Forum
              </button>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'MOC' }"
              class="moc text-shadow btn btn-success selectable text-uppercase"
            >
              Create Your Own
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'Collection' }"
              class="collections text-shadow btn btn-secondary selectable text-uppercase"
            >
              Collections
            </router-link>
          </li>
        </ul>
        <!-- DARK/LIGHT THEME -->
        <div class="light-component selectable no-select">
          <i
            class="mdi fs-2"
            @click="toggleTheme()"
            :class="{
              'mdi-lightbulb-variant-outline': lightIsOn,
              'mdi-lightbulb-on text-success darken-20': !lightIsOn,
            }"
          ></i>
        </div>
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
            <div
              class="notification-dot bg-danger elevation-3"
              v-if="state.notifications.find((n) => n.hasSeen == false)"
            ></div>
          </button>

          <ul class="dropdown-menu dropdown-menu-end p-0 m-0">
            <div class="d-flex align-items-center">
              <button class="invisible p-0">Dismiss all</button>
              <div class="text-dark note-text mx-auto">Notifications</div>
              <button
                class="dismiss-all p-0 text-primary"
                @click="dismissAllNotifications"
              >
                Dismiss all
              </button>
            </div>
            <div>
              <li
                v-for="n in state.notifications"
                v-if="state.notifications.length"
                class="m-0"
                :class="n.hasSeen ? 'bg-grey' : 'bg-white'"
                :style="n.hasSeen ? 'opacity: .85' : 'opacity: 1'"
              >
                <Notification :key="n.id" :notification="n" />
              </li>
              <li
                class="m-0 p-0 text-center border-0"
                style="opacity: 0.5"
                v-else
              >
                <div class="p-2">You don't have any notifications</div>
              </li>
            </div>
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
import { onMounted, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { legoSetsService } from "../services/LegoSetsService.js";
import { notificationsService } from "../services/NotificationsService.js";
import Pop from "../utils/Pop.js";
import Login from "./Login.vue";
import Notification from "./Notification.vue";
export default {
  setup() {
    const state = reactive({
      notifications: computed(() => AppState.notifications),
      account: computed(() => AppState.account),
    });
    watchEffect(() => {
      document.body.setAttribute(
        "data-theme",
        AppState.lightIsOn ? "dark" : "light"
      );
    });
    onMounted(() => {
      const dropdown = document.querySelector(".dropdown");
      dropdown.addEventListener("hidden.bs.dropdown", flipItAndReverseHasSeen);
    });
    async function flipItAndReverseHasSeen() {
      try {
        await notificationsService.flipItAndReverseHasSeen();
      } catch (error) {
        Pop.error("[Flipping Has Seen On Notes]", error);
      }
    }
    async function dismissAllNotifications() {}
    return {
      state,
      lightIsOn: computed(() => AppState.lightIsOn),
      toggleTheme() {
        AppState.lightIsOn = !AppState.lightIsOn;
      },
      async getTradableSets() {
        try {
          await legoSetsService.getTradableSets();
        } catch (error) {
          Pop.error(error, "[gettingTradableSets]");
        }
      },
      flipItAndReverseHasSeen,
      dismissAllNotifications,
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
  text-shadow: 0 3px 1px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 1px 5px rgba(0, 0, 0, 0.12);
  letter-spacing: 0.1rem;
}

.fa-bell {
  position: relative;
}

.notification-dot {
  height: 0.8rem;
  width: 0.8rem;
  position: absolute;
  bottom: 20%;
  right: 40%;
  border-radius: 50%;
}

.dropdown-menu {
  width: 70ch;

  .invisible {
    visibility: hidden;
    margin-left: 1rem;
  }

  .note-text {
    font-size: 0.85rem;
    color: #42423f;
    opacity: 0.6;
  }

  .dismiss-all {
    text-decoration: none;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 0.85rem;
    text-decoration: underline;
    margin-right: 1rem;
  }

  .dismiss-all:hover {
    filter: brightness(90%);
  }

  li {
    border-top: 0.1rem solid rgb(0, 0, 0, 0.5);
  }
}
</style>

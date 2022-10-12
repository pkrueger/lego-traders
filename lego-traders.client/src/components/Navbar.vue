<template>
  <div class="yellow-lego">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center">
          <img alt="logo" src="../assets/img/cw-logo.png" height="45" />
        </div>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto">
          <li>
            <router-link :to="{ name: 'Marketplace' }"
              class="marketplace text-shadow btn btn-danger selectable text-uppercase">
              Marketplace
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Forum' }" class="forum text-shadow btn btn-primary selectable text-uppercase">
              Forum
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'MOC' }" class="moc text-shadow btn btn-success selectable text-uppercase">
              Create Your Own
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Collection' }"
              class="collections text-shadow btn btn-secondary selectable text-uppercase">
              Collections
            </router-link>
          </li>
        </ul>
        <!-- LOGIN COMPONENT HERE -->
        <Login />
      </div>
    </nav>
  </div>
</template>

<script>
import Login from './Login.vue'
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
.marketplace {
  background-image: url('red-lego.webp');
  background-position: top left;
}

.forum {
  background-image: url('blue-lego.webp');
  background-position: top left;
}

.moc {
  background-image: url('green-lego.webp');
  background-position: top left;
}

.collections {
  background-image: url('grey-lego.webp');
  background-position: top left;
}

.yellow-lego {
  background-image: url('yellow-lego.webp');
  background-position: top left;
  background-size: cover;

}

.navbar {
  background-color: #ffcd03 !important;
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

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-dark);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.text-shadow {
  font-weight: 600;
  color: aliceblue;
  text-shadow: 1px 1px black, 0px 0px 5px rgba(64, 64, 64, 0.719);
  letter-spacing: 0.1rem;
}
</style>

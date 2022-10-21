<template>
  <header>
    <Navbar />
  </header>
  <main class="d-flex">
    <router-view />
  </main>
  <footer>
  </footer>

</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>

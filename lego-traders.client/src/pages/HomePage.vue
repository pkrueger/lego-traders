<template>
  <div class="container-fluid home bg-primary">
    <div class="row justify-content-center">
      <div class="col-10 my-5 text-center bg-light p-5">
        <img src="../assets/img/welcome banner.png" alt="welcome banner">
      </div>
    </div>
    <div class="row">
      <div class="col-3 text-center">
        <router-link :to="{name: 'Marketplace'}">
          <button class="btn">MARKETPLACE</button>
        </router-link>
      </div>
      <div class="col-3 text-center">
        <router-link :to="{name: 'Forum'}">
          <button class="btn">FORUM</button>
        </router-link>
      </div>
      <div class="col-3 text-center">
        <router-link :to="{name:'MOC'}">
          <button class="btn">CREATE YOUR OWN</button>
        </router-link>
      </div>
      <div class="col-3 text-center">
        <router-link :to="{ name: 'Collection' }">
          <button class="btn">COLLECTIONS</button>
        </router-link>
      </div>
    </div>
  </div>
  <!-- <router-link :to="{ name: 'Collection' }">
    <button>Collection Page</button>
  </router-link> -->
</template>

<script>
export default {
  setup() {
    // const route = useRoute()
    return {}
  }
}
</script>

<style scoped lang="scss">
// .home {
//   background-image: url('blue-lego.webp');
//   background-size: cover;
//   background-position: top left;
//   height: 100vh;
// }
</style>

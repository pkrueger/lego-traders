<template>
  <div class="container-fluid home bg-primary">
    <div class="row justify-content-center">
      <div class="col-10 my-5 text-center bg-light p-5">
        <img src="../assets/img/welcome banner.png" alt="welcome banner">
      </div>
    </div>
    <div class="row">
      <div class="col-3 text-center">
        <button>MARKETPLACE</button>
      </div>
      <div class="col-3 text-center">
        <button>FORUM</button>
      </div>
      <div class="col-3 text-center">
        <button>CREATE YOUR OWN</button>
      </div>
      <div class="col-3 text-center">
        <router-link :to="{ name: 'Collection' }">
          <button>COLLECTIONS</button>
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

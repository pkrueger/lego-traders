<template>
  <div class="container-fluid home bg-primary">
    <div class="row justify-content-center">
      <div class="col-10 my-5 text-center bg-light p-5">
        <img src="../assets/img/welcome banner.png" alt="welcome banner">
      </div>
    </div>
    <div class="row">

    </div>
    <!-- <div class="row">
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
    </div>-->
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
.home {
  min-height: 100%;
  background-image: url('https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80');
  background-position: bottom;
  background-size: cover;
}
</style>

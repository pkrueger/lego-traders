<template>
  <div class="container-fluid home">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Collection' }">
          <button>Collection Page</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.home {
  background-image: url('https://wallpapers.com/images/hd/yellow-lego-inspired-background-cmi4skpi741gbpi6-cmi4skpi741gbpi6.webp');
  background-size: cover;
  background-position: center;
  height: 100vh;
}
</style>

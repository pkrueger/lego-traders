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
  background-image: url('blue-lego.webp');
  background-size: cover;
  background-position: top left;
  height: 100vh;
}
</style>

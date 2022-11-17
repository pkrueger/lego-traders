<template>
  <div class="container-fluid home bg-primary">
    <div class="row">
      <div class="col-12 p-4">
        <img class="img-fluid profile elevation-1 m-4" src="/ProfilePics/PatrickKrueger.jpg" alt="Patrick" />
        <img class="img-fluid profile elevation-1 m-4" src="/ProfilePics/CoelAllen.jpg" alt="Coel" />
        <img class="img-fluid profile elevation-1 m-4" src="/ProfilePics/RandyHall.jpg" alt="Randy" />
        <img class="img-fluid profile elevation-1 m-4" src="" alt="Eric" />
        <img class="img-fluid profile elevation-1 m-4" src="/ProfilePics/AndrewGreenlaw.jpg" alt="Andrew" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    // const route = useRoute()
    return {};
  },
};
</script>

<style scoped lang="scss">
.home {
  min-height: 100%;
  background-image: url("https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80");
  background-size: cover;
  background-position: bottom;
}

.profile {
  height: 15rem;
  width: 15rem;
  object-fit: cover;
  object-position: top;
  border-radius: 50%;
}
</style>

<template>
  <div class="container-fluid home bg-light">
    <div class="row">
      <div class="col-12 text-center p-5">
        <div class="welcome-banner bg-white p-4 rounded shadow">
          <h1 class="welcome-text font--lego">
            <span class="red">Welcome</span>
            <span class="blue">to</span>
            <span class="green">lego</span>
            <span class="yellow">trader</span>
          </h1>
        </div>
      </div>
      <div class="col-12 p-4">
        <img
          class="img-fluid profile elevation-1 m-4"
          src="/ProfilePics/PatrickKrueger.jpg"
          alt="Patrick"
        />
        <img
          class="img-fluid profile-coel elevation-1 m-4"
          src="/ProfilePics/CoelAllen.jpg"
          alt="Coel"
        />
        <img
          class="img-fluid profile elevation-1 m-4"
          src="/ProfilePics/RandyHall.jpg"
          alt="Randy"
        />
        <img
          class="img-fluid profile elevation-1 m-4"
          src="/ProfilePics/Eric.jpg"
          alt="Eric"
        />
        <img
          class="img-fluid profile elevation-1 m-4"
          src="/ProfilePics/AndrewGreenlaw.jpg"
          alt="Andrew"
        />
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
}

.welcome-banner {
}

.welcome-text {
  font-size: 8rem;

  span {
    margin-right: 2.5rem;
  }

  .red {
    color: #da291c;
  }

  .blue {
    color: #0055bf;
  }

  .green {
    color: #4b9f4a;
  }

  .yellow {
    color: #ffd700;
  }
}

.profile {
  height: 15rem;
  width: 15rem;
  object-fit: cover;
  object-position: top;
  border-radius: 50%;
}

.profile-coel {
  height: 15rem;
  width: 15rem;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
</style>

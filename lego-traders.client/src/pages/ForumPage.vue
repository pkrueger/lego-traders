<template>
  <div class="container-fluid forum-page">
    <div class="row justify-content-center p-4">
      <div class="col-md-7">
        <div class="card">
          <div class="d-flex justify-content-between p-4">
            <div>
              <h4>BatMan</h4>
            </div>
            <div><img class="" src="http://thiscatdoesnotexist.com" alt="Profile Img"></div>
          </div>
          <div class="card-body">
            post of duude
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="card">
          <div class="card-body">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { onMounted } from 'vue';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    async function getPosts() {
      try {
      } catch (error) {
        Pop.error('[getPosts]', error)
      }
    }
    onMounted(() => {
      getPosts()
    })
    return {

    }
  }
}
</script>


<style lang="scss" scoped>
.forum-page {
  background-image: url('blue-lego.webp');
  background-size: cover;
  background-position: top left;
  height: 100vh;
}
</style>
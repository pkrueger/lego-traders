<template>
  <!-- When Adding a Set Card it needs to be inside a ROW for proper formating -->
  <div class="col-3">
    <div class="card">
      <img :src="legoSet.set_img_url" class="img-fluid p-2" alt="">
      <div class="card-body">
        <h5>{{legoSet.name}}</h5>
        <p class="m-0">Set ID: {{legoSet.set_num}}</p>
        <p class="m-0">Year: {{legoSet.year}}</p>

      </div>
    </div>
  </div>
</template>


<script>
import { LegoSet } from '../models/LegoSet.js';

export default {
  props: {
    legoSet: { type: LegoSet, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>
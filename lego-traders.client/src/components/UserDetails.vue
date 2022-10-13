<template>
  <div class="col-md-11 d-flex">
    <div>
      <img class="img-size p-3" :src="account.picture" alt="User Name">
    </div>
    <div class="border border-dark border-box p-2">
      <h3>Name: {{account.name}}</h3>
      <h5>About: </h5>
      <p>{{account.desc}}</p>
    </div>
  </div>
</template>


<script>
import { Account } from '../models/Account.js';

export default {
  props: {
    account: { type: Account, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>
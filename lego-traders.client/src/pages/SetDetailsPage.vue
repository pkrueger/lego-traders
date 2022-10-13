<template>
  <h1>Hello from set details page</h1>
</template>


<script>
import { onMounted } from "vue";
import { legoSetsService } from "../services/LegoSetsService";

export default {
  setup() {
    onMounted(() => {
      legoSetsService.getSetsBySetNum()
    })
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>
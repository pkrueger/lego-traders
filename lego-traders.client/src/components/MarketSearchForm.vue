<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <div class="input-group rounded">
        <input type="text" class="form-control rounded" required="true" minlength="2" placeholder="Search for sets..."
          name="search" aria-label="Search" aria-describedby="search-addon" v-model="editable.term" />
        <span class="input-group-text border-0" id="search-addon">
          <button type="submit" class="btn btn-warning"><i class="mdi mdi-magnify"></i></button>
        </span>
      </div>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue'
import { legoSetsService } from '../services/LegoSetsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          await legoSetsService.getSetsBySearchTerm(editable.value.term)
        } catch (error) {
          logger.error('[Search]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
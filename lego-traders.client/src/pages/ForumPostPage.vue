<template>
  <div class="component">


  </div>
</template>


<script>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { forumPostsService } from '../services/ForumPostsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const route = useRoute()
    async function getPostById() {
      try {
        await forumPostsService.getPostById(route.params.postId)
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getPostById()
    })
    return {}
  }
}
</script>


<style lang="scss" scoped>
.component {
  background-image: url();
}
</style>
<template>
  <div class="container-fluid forum-page bg-light">
    <div class="row justify-content-center p-4">
      <div class="col-md-4">
        <div class="bg-primary p-5 forum-form shadow border-test">
          <div class="mb-3 text-center">
            <h4>Make A Post!</h4>
          </div>
          <div class="bg-warning p-3 w-100 mb-3">
            <ForumPostForm />
          </div>
          <div class=" p-3 w-100">
            <form>
              <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="filterRadios" v-model="editable" value="" id="All"
                  checked>
                <label class="form-check-label" for="All">All</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="filterRadios" v-model="editable" value="Star Wars"
                  id="starWars">
                <label class="form-check-label" for="starWars">Star Wars</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="filterRadios" v-model="editable" value="Technic"
                  id="technic">
                <label class="form-check-label" for="technic">Technic</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="filterRadios" v-model="editable" value="Harry Potter"
                  id="harryPotter">
                <label class="form-check-label" for="harryPotter">Harry Potter</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="filterRadios" v-model="editable" value="Architecture"
                  id="architecture">
                <label class="form-check-label" for="architecture">Architecture</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="filterRadios" v-model="editable" value="Bionical"
                  id="bionical">
                <label class="form-check-label" for="bionical">Bionical</label>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row scroll">
          <div class="col-12 mb-3" v-for="post in forumPosts">
            <ForumPostCard class="forum-card elevation-1 w-100" :key="post.id" :post="post" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { onMounted } from 'vue';
import { forumPostsService } from '../services/ForumPostsService.js'
import Pop from '../utils/Pop.js';
import ForumPostCard from '../components/ForumPostCard.vue';
import { computed, ref } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import ForumPostForm from '../components/ForumPostForm.vue';

export default {
  setup() {
    const editable = ref("")
    async function getPosts() {
      try {
        await forumPostsService.getPosts();
      }
      catch (error) {
        Pop.error("[getPosts]", error);
      }
    }
    onMounted(() => {
      getPosts();
    });
    return {
      editable,
      forumPosts: computed(() => AppState.forumPosts.filter(f => f.tag.includes(editable.value)))
    };
  },
  components: { ForumPostCard, ForumPostForm }
}
</script>


<style lang="scss" scoped>
.scroll {
  height: 85vh;
  overflow-y: auto;
}

.forum-page {
  flex-grow: 1;

  .forum-form {
    display: flex;
    flex-direction: column;
    height: 85vh;
    border-left: 1.5rem solid;
    border-image-source: url("yellow-lego.webp");
    border-image-slice: 30 0 0 30;
    border-image-repeat: repeat;
  }

  .forum-card {
    border-left: 1.5rem solid;
    border-image-source: url("yellow-lego.webp");
    border-image-slice: 30 0 0 30;
    border-image-repeat: repeat;
  }

}
</style>
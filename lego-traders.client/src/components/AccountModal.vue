<template>
  <div class="modal fade" id="accountModal" tabindex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="accountModalLabel">Edit Account</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit()">
            <div class="form-floating mb-3">
              <input type="name" class="form-control" id="name" aria-describedby="Your Name">
              <label id="name" for="name">Enter the name you would like displayed</label>
            </div>
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="email" aria-describedby="Your email">
              <label id="email" for="email">Your email</label>
            </div>
            <div class="form-floating mb-3">
              <input type="url" class="form-control" id="picture" aria-describedby="Your picture">
              <label id="url" for="url">Your Picture as a URL</label>
            </div>
            <div class="input-group mb-3">

              <label class="input-group-text" required for="theme">Select an Theme</label>
              <select class="form-select" id="theme">
                <option value="starwars">Star Wars</option>
                <option value="dc">DC</option>
                <option value="harrypotter">Harry Potter</option>
                <option value="technic">Technic</option>
              </select>

            </div>



            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
          </form>
        </div>
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


<style lang="scss" scoped>

</style>
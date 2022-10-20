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
              <input v-model="editable.name" type="name" class="form-control" id="name" aria-describedby="Your Name">
              <label id="name" for="name">Enter the name you would like displayed</label>
            </div>
            <div class="form-floating mb-3">
              <textarea v-model="editable.desc" type="description" class="form-control" aria-describedby="Description"
                id="description" rows="3"></textarea>
              <label id="description" for="description">User About</label>
            </div>
            <div class="form-floating mb-3">
              <input v-model="editable.email" type="email" class="form-control" id="email"
                aria-describedby="Your email">
              <label id="email" for="email">Your email</label>
            </div>
            <div class="input-group mb-3">
              <label class="input-group-text" required for="theme">Select an Theme</label>
              <select class="form-select" v-model="editable.userTheme" id="theme">
                <option value="starwars">Star Wars</option>
                <option value="supers">Super Heroes/Villains</option>
                <option value="harrypotter">Harry Potter</option>
                <option value="misc">Misc</option>
              </select>
            </div>

            <div class="input-group mb-3">
              <label class="input-group-text" required for="picture">Select MiniFig Picture</label>
              <select class="form-select" v-model="editable.picture" id="picture">

                <option v-if="editable.userTheme == 'harrypotter'" value="HarryPotterMiniFigs/Dobby.jpg">Dobby</option>
                <option v-if="editable.userTheme == 'harrypotter'" value="HarryPotterMiniFigs/Draco.jpg">Draco</option>
                <option v-if="editable.userTheme == 'harrypotter'" value="HarryPotterMiniFigs/dumbledoor.jpg">Dumbledoor
                </option>
                <option v-if="editable.userTheme == 'harrypotter'" value="HarryPotterMiniFigs/ginny.jpg">Ginny</option>
                <option v-if="editable.userTheme == 'harrypotter'" value="HarryPotterMiniFigs/harry.jpg">Harry</option>
                <option v-if="editable.userTheme == 'harrypotter'" value="HarryPotterMiniFigs/HarryAdult.jpg">Harry
                  Adult</option>
                <option v-if="editable.userTheme == 'harrypotter'" value="HarryPotterMiniFigs/hermoine.jpg">Hermoine
                </option>
                <option v-if="editable.userTheme == 'harrypotter'" value="HarryPotterMiniFigs/severus.jpg">Severus
                </option>
                <option v-if="editable.userTheme == 'harrypotter'" value="HarryPotterMiniFigs/voldemort.jpg">Voldemort
                </option>
                <option v-if="editable.userTheme == 'misc'" value="MiscMiniFigs/Cop.jpg">Cop</option>
                <option v-if="editable.userTheme == 'misc'" value="MiscMiniFigs/Ninja.jpg">Ninja</option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/admiralThrawn.jpg">Admiral
                  Thrawn
                </option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/AdmiralYularen.jpg">
                  Admiral Yularen
                </option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/Anakin.jpg">Anakin</option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/battleDroid.jpg">Battle Droid
                </option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/BobbaFet.jpg">BobbaFet</option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/C3PORedArm.jpg">C3PORedArm
                </option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/Chewbaca.jpg">Chewbacca</option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/CloneTrooperLieutenant.jpg">
                  Clone Trooper Lieutenant</option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/DarthRevan.jpg">Darth Revan
                </option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/darthvader.jpg">Darth Vader
                </option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/FirstOrderTrooper.jpg">First
                  Order Trooper</option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/leia.jpg">Leia</option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/LukeSkyDark.jpg">Luke Skywalker
                </option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/ObiWan.jpg">ObiWan</option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/QuiGon Jinn.jpg">QuiGon Jinn
                </option>
                <option v-if="editable.userTheme == 'starwars'" value="StarWarsMiniFigs/Yoda.jpg">Yoda</option>
                <option v-if="editable.userTheme == 'supers'" value="superhero/batman.jpg">Batman</option>
                <option v-if="editable.userTheme == 'supers'" value="superhero/deadpool.jpg">DeadPool</option>
                <option v-if="editable.userTheme == 'supers'" value="superhero/ironMan.jpg">Iron Man</option>
                <option v-if="editable.userTheme == 'supers'" value="superhero/Joker.jpg">Joker</option>
                <option v-if="editable.userTheme == 'supers'" value="superhero/spiderman.jpg">SpiderMan</option>
                <option v-if="editable.userTheme == 'supers'" value="superhero/superman.jpg">Superman</option>
                <option v-if="editable.userTheme == 'supers'" value="superhero/WonderWoman.jpg">Wonder Woman</option>
                <option v-if="editable.userTheme == 'supers'" value="superhero/venom.jpg">Venom</option>
              </select>

            </div>






            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { accountService } from '../services/AccountService.js';
import Pop from '../utils/Pop.js';

// Add editable form stuff
export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...AppState.account }
    })
    return {
      editable,
      async handleSubmit() {
        try {
          await accountService.editAccount(editable.value)
        } catch (error) {
          Pop.error('[handleSubmit]', error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
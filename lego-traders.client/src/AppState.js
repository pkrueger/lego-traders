import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/LegoSet.js').LegoSet[]} */
  // Our Database Items
  legoSet: [],
  // StarWars 18, 158
  legoSetThemes: { starwars: 158 },
  /** @type {import('./models/ApiSet.js').ApiSet[]} */
  apiSets: []
})

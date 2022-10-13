import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Account.js').Account | null} */
  activeProfile: null,
  /** @type {import('./models/LegoSet.js').LegoSet[]} */
  // Our Database Items
  legoSet: [],
  // StarWars 18, 158
  legoSetThemes: {},
  /** @type {import('./models/ApiSet.js').ApiSet[]} */
  apiSets: [],
  activeApiSet: [],
  nextPage: null,
  previousPage: null,
  activeCollection: null,
  /** @type {import('./models/ForumPost.js).ForumPost[]} */
  forumPosts: []
})

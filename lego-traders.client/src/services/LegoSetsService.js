import { AppState } from "../AppState"
import { ApiSet } from "../models/ApiSet";
import { LegoSet } from "../models/LegoSet.js";
import { api, legoApi } from "./AxiosService"

class LegoSetsService {
  async addSetToAccount(legoSet) {
    console.log(legoSet);
    const res = await api.post('/account/sets', legoSet)
    console.log('addSetToAccount', res.data);
  }
  async getMyLegoSets(accountId) {
    const res = await api.get(`api/sets/profile/` + accountId)
    // TODO Change after server side gets updated
    console.log('getMyLegoSets', res);
    AppState.legoSet = res.data.map(s => new LegoSet(s))
  }
  async getSetsByThemeId(theme_id,) {
    const res = await legoApi.get(`sets`, {
      params: {
        theme_id,
        page_size: 50
      },
    })
    console.log('theme from api', res.data);
    AppState.apiSets = res.data.results
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
  }
  async goPage(page) {
    const res = await legoApi.get(page)
    AppState.apiSets = res.data.results
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
  }
}
export const legoSetsService = new LegoSetsService()
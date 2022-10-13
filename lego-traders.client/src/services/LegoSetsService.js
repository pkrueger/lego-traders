import { AppState } from "../AppState"
import { ApiSet } from "../models/ApiSet";
import { LegoSet } from "../models/LegoSet.js";
import { api, legoApi } from "./AxiosService"

class LegoSetsService {
  async getMyLegoSets(accountId) {
    const res = await api.get(`api/sets/` + accountId + '/sets')
    // TODO Change after server side gets updated
    console.log('getMyLegoSets', res.data);
    // AppState.legoSet = res.data.map(s => new LegoSet(s))
  }
  async getSetsByThemeId(theme_id,) {
    const res = await legoApi.get(`sets`, {
      params: {
        theme_id,
        page_size: 20
      },
    })
    console.log('theme from api', res.data);
    AppState.apiSets = res.data.results
  }
}
export const legoSetsService = new LegoSetsService()
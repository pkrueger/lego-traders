import { AppState } from "../AppState"
import { ApiSet } from "../models/ApiSet";
import { LegoSet } from "../models/LegoSet.js";
import { api, legoApi } from "./AxiosService"

class LegoSetsService {
  async getMyLegoSets(accountId) {
    const res = await api.get(`api/sets/${accountId}/sets`)
    console.log('getMyLegoSets', res.data);
    // AppState.legoSet = res.data.map(l => new LegoSet(l))
  }
  async getSetsByThemeId(theme_id) {
    const res = await legoApi.get(`sets`, { params: { theme_id } })
    console.log('theme from api', res.data);
    AppState.apiSets = res.data.results
  }
}
export const legoSetsService = new LegoSetsService()
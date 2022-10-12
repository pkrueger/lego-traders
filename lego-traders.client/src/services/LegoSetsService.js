import { AppState } from "../AppState"
import { ApiSet } from "../models/ApiSet";
import { legoApi } from "./AxiosService"

class LegoSetsService {
  async getSetsByThemeId(theme_id) {
    const res = await legoApi.get(`sets`, { params: { theme_id } })
    console.log('theme from api', res.data);
    AppState.apiSets = res.data.results
  }
}
export const legoSetsService = new LegoSetsService()
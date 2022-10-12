import { AppState } from "../AppState"
import { legoApi } from "./AxiosService"

class LegoSetsService {
  async getSetsByThemeId(id) {
    const res = await legoApi.get(`/themes/${id}`)
    AppState.legoSets = res.data
  }
}
export const legoSetsService = new LegoSetsService()
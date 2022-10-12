import { AppState } from "../AppState"
import { legoApi } from "./AxiosService"

class LegoSetsService {
  async getSetsByThemeId() {
    const res = await legoApi.get(`/themes/18`)
    AppState.legoSetThemes = res.data
  }
}
export const legoSetsService = new LegoSetsService()
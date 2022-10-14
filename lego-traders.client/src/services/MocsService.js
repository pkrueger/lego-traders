import { AppState } from "../AppState.js"
import { Moc } from "../models/Moc.js"

class MocsService {
  async getMocSets() {
    const res = await api.get('/api/mocs')
    console.log(res.data)
    AppState.mocSets = res.data
  }
}
export const mocsService = new MocsService()
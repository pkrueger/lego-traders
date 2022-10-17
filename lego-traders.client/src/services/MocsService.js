import { AppState } from "../AppState.js"
import { Moc } from "../models/Moc.js"
import { api } from "./AxiosService.js"

class MocsService {
  async createMoc(MocData) {
    const res = await api.post(`/api/mocs`, MocData)
    console.log(res.data)
    AppState.customMOCSets.unshift(res.data)
  }
  async getMocById(id) {
    const res = await api.get(`/api/mocs/${id}`)
    console.log(res.data)
    AppState.activeMOCset = res.data
  }
  async getMocSets() {
    const res = await api.get('/api/mocs')
    console.log(res.data)
    AppState.customMOCSets = res.data
  }
}
export const mocsService = new MocsService()
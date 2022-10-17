import { AppState } from "../AppState.js"
import { Moc } from "../models/Moc.js"
import { api } from "./AxiosService.js"

class MocsService {
  async createStep(id, stepData) {
    const res = await api.put(`/api/mocs/${id}`, stepData)
    console.log(res.data)
    AppState.activeMOCset = res.data
  }
  async createMoc(mocData) {
    const res = await api.post(`/api/mocs`, mocData)
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
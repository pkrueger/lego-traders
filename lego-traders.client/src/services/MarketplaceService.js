import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js"

class MarketplaceService {
  async offerTrade(formData) {
    formData.requestedSetId = AppState.activeLegoSet.id
    formData.requestedAccountId = AppState.activeLegoSet.ownerId
    await api.post('api/trade', formData)
    console.log(formData);
  }
  async getSentTrades() {
    const res = await api.get('api/trade/sent')
    console.log('getSentTrades', res.data);
    AppState.sentTrades = res.data
  }
  async getReceivedTrades() {
    const res = await api.get('api/trade/received')
    console.log('getreceivedTrades', res.data);
    AppState.receivedTrades = res.data
  }
  async changeStatus(id, status) {
    const res = await api.put(`api/trade/` + id, { status })
    console.log('changeStatus', res.data);
  }
}
export const marketplaceService = new MarketplaceService()
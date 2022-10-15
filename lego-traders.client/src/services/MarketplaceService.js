import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js"

class MarketplaceService {
  async offerTrade(formData) {
    await api.post('api/trade', formData)
  }
  async getSentTrades() {
    const res = await api.get('api/trade/sent')
    console.log('getSentTrades', res.data);
    AppState.sentTrades = res.data
  }
  async getReceivedTrades() {
    const res = await api.get('api/trade/received')
    console.log('getreceivedTrades', res.data);
    AppState.sentReceived = res.data
  }
}
export const marketplaceService = new MarketplaceService()
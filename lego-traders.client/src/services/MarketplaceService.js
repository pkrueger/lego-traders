import { api } from "./AxiosService.js"

class MarketplaceService{
  async offerTrade(formData){
    const trade = await api.post('api/trade', formData)
  }
}
export const marketplaceService = new MarketplaceService()
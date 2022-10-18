import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";
import { legoSetsService } from "./LegoSetsService.js";

class MarketplaceService {
  async offerTrade(formData) {
    formData.requestedSetId = AppState.activeLegoSet.id;
    formData.requestedAccountId = AppState.activeLegoSet.ownerId;
    const res = await api.post("api/trade", formData);
    return res.data;
  }
  async getSentTrades() {
    const res = await api.get("api/trade/sent");
    console.log("getSentTrades", res.data);
    AppState.sentTrades = res.data;
  }
  async getReceivedTrades() {
    const res = await api.get("api/trade/received");
    console.log("getReceivedTrades", res.data);
    AppState.receivedTrades = res.data;
  }
  async changeStatus(id, status) {
    const res = await api.put(`api/trade/` + id, { status });
    console.log("changeStatus", res.data);

    const requestedTrade = AppState.receivedTrades.find((t) => t.id == id);
    requestedTrade.status = res.data.status;
  }
  async removeTrade(id) {
    const res = await api.delete("api/trade/" + id);
    console.log("remove trade", res);
    AppState.sentTrades = AppState.sentTrades.filter(
      (s) => s.id != res.data.id
    );
    AppState.receivedTrades = AppState.receivedTrades.filter(
      (s) => s.id != res.data.id
    );
  }
}
export const marketplaceService = new MarketplaceService();

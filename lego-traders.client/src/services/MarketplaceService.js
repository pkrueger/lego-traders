import { defineSSRCustomElement } from "vue";
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
    AppState.sentTrades = res.data;
  }
  async getReceivedTrades() {
    const res = await api.get("api/trade/received");
    AppState.receivedTrades = res.data;
  }
  async changeStatus(id, status) {
    const res = await api.put(`api/trade/` + id, { status });

    const requestedTrade = AppState.receivedTrades.find((t) => t.id == id);
    requestedTrade.status = res.data.status;
    return requestedTrade;
  }
  async removeTrade(id) {
    const res = await api.delete("api/trade/" + id);
    AppState.sentTrades = AppState.sentTrades.filter(
      (s) => s.id != res.data.id
    );
    AppState.receivedTrades = AppState.receivedTrades.filter(
      (s) => s.id != res.data.id
    );
  }
  async getTradableSetBySearch(term) {
    debugger;
    AppState.tradableSet = AppState.tradableSet.filter((s) =>
      s.name.toUpperCase().includes(term.toUpperCase())
    );
  }
}
export const marketplaceService = new MarketplaceService();

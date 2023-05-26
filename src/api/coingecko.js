import axios from "axios";

const API_BASE_URL = "https://api.coingecko.com/api/v3";

export const getMarketData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/`, {
      params: {
        vs_currency: "USD",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get market data from Coingecko API.");
  }
};

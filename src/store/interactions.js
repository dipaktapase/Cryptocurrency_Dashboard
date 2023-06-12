import {
  getChartData,
  getMarketData,
  exchangeRates,
  getMarketCap,
} from "../api/coingecko";

// Load cryptocurrencies market data
export const fetchCryptoData = () => {
  return async (dispatch) => {
    try {
      const marketData = await getMarketData();
      dispatch({ type: "SET_CRYPTO_DATA", payload: marketData });
    } catch (error) {
      console.error("Error fetching market data:", error);
      dispatch({
        type: "SET_ERROR_DATA",
        payload: "Error fetching market data",
      });
    }
  };
};

// Load the chart data
export const fetchChartData = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const selectedCoin = state.coinReducer.selectedCoin;
      const selectedCurrency = state.coinReducer.selectedCurrency;
      const days = state.coinReducer.days;

      const chartData = await getChartData(
        selectedCoin,
        selectedCurrency,
        days
      );
      dispatch({ type: "SET_CHART_DATA", payload: chartData });
    } catch (error) {
      console.error("Error fetching chart data:", error);
      dispatch({
        type: "SET_ERROR_DATA",
        payload: "Error fetching chart data",
      });
    }
  };
};

// Load exchange data
export const fetchExchangeData = () => {
  return async (dispatch) => {
    try {
      const exchangeData = await exchangeRates();
      dispatch({ type: "SET_EXCHANGE_DATA", payload: exchangeData });

      return exchangeData;
    } catch (error) {
      console.error("Error fetching exchangeData:", error);
    }
  };
};

// Load Market Capital
export const fetchMarketCap = () => {
  return async (dispatch) => {
    try {
      const marketCap = await getMarketCap();
      dispatch({ type: "SET_MARKET_CAP", payload: marketCap });
    } catch (error) {
      console.error("Error fetching market cap", error);
    }
  };
};

import { getChartData, getMarketData } from "../api/coingecko";

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

export const fetchChartData = () => {
  return async (dispatch) => {
    try {
      const chartData = await getChartData();
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

export default fetchChartData;

import axios from "axios";

export const getMarketData = async () => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/`, {
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

export const getChartData = async (selectedCoin, selectedCurrency, days) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=${selectedCurrency}&days=${days}`
    );

    const coinData = response.data;
    console.log(coinData);

    const formatChartData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Price",
          data: coinData?.prices.map((dataPoint) => dataPoint[1]),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    return formatChartData;
  } catch (error) {
    throw new Error("Failed to get chart data from Coingecko API.");
  }
};

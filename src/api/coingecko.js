import axios from "axios";

export const getMarketData = async () => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/`,
      {
        params: {
          vs_currency: "USD",
          order: "market_cap_desc",
          per_page: 50,
          page: 1,
          sparkline: false,
        },
      }
    );
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

    const formatChartData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Price",
          data: coinData?.prices.map((dataPoint) => dataPoint[1]),
          // data: ['0', '1k', '1K', '10k', '20k', '50k'],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          tension: 0.1,
        },
      ],
    };

    return formatChartData;
  } catch (error) {
    throw new Error("Failed to get chart data from Coingecko API.");
  }
};

export const getGlobalData = async () => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/global");

    const data = Object.entries(response.data.data.market_cap_percentage);

    data.sort((a, b) => b[1] - a[1]);

    const pieData = data?.map(([currency, percentage]) => ({
      label: currency.toUpperCase(),
      value: percentage.toFixed(2),
    }));

    const formatChartData = {
      labels: pieData.map((item) => item.label),
      datasets: [
        {
          label: "%",
          data: pieData.map((item) => item.value),
          backgroundColor: [
            "rgba(201, 77, 109)",
            "rgba(65, 116, 201)",
            "rgba(228, 191, 88)",
            "rgba(60, 157, 78)",
            "rgba(112, 49, 172)",
            "rgba(228, 191, 88)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return formatChartData;
  } catch (error) {
    throw new Error("Failed to get global chart data from Coingecko API");
  }
};

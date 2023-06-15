import axios from "axios";

// Fetching the market data from coingecko api
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

// Fetching the data for various charts
export const getChartData = async (selectedCoin, selectedCurrency, days) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=${selectedCurrency}&days=${days}`
    );

    const coinData = response.data;
    let epochTimes = coinData.prices.map((data) => data[0]);
    // console.log("epochTimes", epochTimes);
    // console.log("datet",  aa.getHours());

    const formatChartData = {
      labels: epochTimes.map((val) => {
        let date = new Date(val);
        // console.log("date", epochTimes);
        let time =
          date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()}PM`
            : `${date.getHours()}:${date.getMinutes()}AM`;
        return days === 1
          ? time
          : date.toLocaleDateString("default", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
      }),
      datasets: [
        {
          label: `${selectedCoin} in ${selectedCurrency}`,
          data: coinData?.prices.map((data) => data[1]),
          borderColor: "rgb(255, 99, 132)",
          pointRadius: 2,
          pointBorderColor: "transparent",
          spanGaps: true,
          fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          // barThickness: 2,
          // tension: 0.5,
        },
      ],
    };
    // console.log(formatChartData);

    return formatChartData;
  } catch (error) {
    throw new Error("Failed to get chart data from Coingecko API.");
  }
};

// Fetching data for exchange conversions
export const exchangeRates = async () => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/exchange_rates`
    );
    const exchangeRates = response.data.rates;
    return exchangeRates;
  } catch (error) {
    throw new Error("Failed to fetch exchange rates");
  }
};

// Fetching data for portfolio pie chart
export const getMarketCap = async (selectedCurrency) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/`,
      {
        params: {
          order: "market_cap_desc",
          per_page: 3,
          page: 1,
          sparkline: false,
        },
      }
    );

    const marketData = response.data;
    // console.log("coingeccoodata", marketData, selectedCurrency);
    const formatChartData = {
      labels: marketData.map((coin) => coin.name),
      datasets: [
        {
          label: "$",
          data: marketData.map(
            (coin) => coin.market_data.market_cap[selectedCurrency]
          ),
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
      totalValue: marketData
        .map((coin) => coin.market_data.market_cap[selectedCurrency])
        .reduce((sum, a) => sum + a, 0)
        .toFixed(0),
    };
    return formatChartData;
  } catch (error) {
    console.log("Market cap error: ", error);
  }
};

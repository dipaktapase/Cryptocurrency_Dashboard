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
    // let date = coinData.prices.map((data) => data[0]);

    let epochTimes = coinData.prices.map((data) => data[0]);
    // console.log("epochTimes", epochTimes);
    // let  aa = new Date (coinData.prices[0][0]) 
    // console.log("datet",  aa.getHours());

    const formatChartData = {
      labels: epochTimes.map((val) => {
        let date = new Date(val);
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
          pointBorderColor: 'transparent',
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

export const getMarketCap = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tether%2Cethereum%2Cbitcoin&order=market_cap_desc"
    );
    const marketData = response.data;
    // console.log("coingeccoodata", marketData);
    const formatChartData = {
      labels: marketData.map((coin) => coin.name),
      datasets: [
        {
          label: "$",
          data: marketData.map((coin) => coin.market_cap),
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
        .map((coin) => coin.market_cap)
        .reduce((sum, a) => sum + a, 0)
        .toFixed(0),
    };
    return formatChartData;

    // return marketData
  } catch (error) {
    console.log("Market cap error: ", error);
  }
};

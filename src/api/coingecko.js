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
    let date =coinData.prices.map((data) => (data[0]))

    let epochTimes = coinData.prices.map((data) => data[0])
    console.log('epochTimes', epochTimes)
    console.log('datet',date)

    const months = ["",
      "Jan", "Febr", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sept", "Oct", "Nov", "Dec",
    ];

    const Dates = epochTimes.map((epochTime) => {
      const date = new Date(epochTime);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are zero-based, so add 1
      const day = date.getDate();
      return `${months[month]} ${day}, ${year}`;
    });

    console.log('convertedDates', Dates)

    const formatChartData = {
      labels: Dates,
      datasets: [
        {
          label: "Price",
          data: coinData?.prices.map((data) => data[1]),
          // data: ['0', '1k', '1K', '10k', '20k', '50k'],
          borderColor: '#ffa600',
          pointRadius: 2, 
          fill: false,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.5,
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


// export const cryptoConverter = async (exchangeCoin, exchangeCurrecy) => {
//   try {
//     const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${exchangeCoin}&vs_currencies=${exchangeCurrecy}`)
  
//     const exchangeRate = response.data[exchangeCoin]['usd']
//     console.log('exchangeasdjfdsf',exchangeRate)
//     return exchangeRate
//   } catch (error) {
//     throw new Error("Failed to convert currency ");
//   }
// }

export const exchangeRates = async () => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/exchange_rates`)
    const exchangeRates = response.data.rates
    return exchangeRates
  } catch (error) {
    throw new Error("Failed to fetch exchange rates")
  }
}

// export const calculatePrice = async (exchangeCoin,exchangeCurrency) => {
//   try {
//     const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${exchangeCoin}&vs_currencies=${exchangeCurrency}`)
//     const calculatedPrice = response.data[exchangeCoin][exchangeCurrency]
//     return calculatedPrice
//   } catch (error) {
//     throw new Error("Filed to calculate Price")
//   }
// }


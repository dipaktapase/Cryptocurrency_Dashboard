import { getChartData, getMarketData, getGlobalData, cryptoConverter, exchangeRates, calculatePrice } from "../api/coingecko";
// import {selectedCoin, selectedCurrency, days} from "../components/PriceChart"

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
  return async (dispatch, getState) => {
    try {
        const state = getState();
        const selectedCoin = state.coinReducer.selectedCoin;
        const selectedCurrency = state.coinReducer.selectedCurrency;
        const days = state.coinReducer.days;

      const chartData = await getChartData(selectedCoin, selectedCurrency, days);
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

export const fetchGobalData = () => {
    return async (dispatch) => {
        try {
            const globalData = await getGlobalData();
            dispatch({ type: "SET_GLOBAL_DATA", payload: globalData });
        } catch (error) {
            console.error("Error fetching global data:", error);
        }
    }
}


// export const fetchCurrencyData = (exchangeCoin, exchangeCurrecy, exchangeAmount) => {
//   return async (dispatch, getState) => {
//     try {
//       const state = getState();
//       const exchangeCoin = state.exchangeReducer.exchangeCoin;
//       const exchangeCurrecy = state.exchangeReducer.exchangeCurrecy;
//       // const exchangeAmount = state.exchangeReducer.exchangeAmount;

//       const exchangeData = await cryptoConverter(exchangeCoin, exchangeCurrecy)
//       const exchangeValue = exchangeData
//       dispatch({ type: "SET_EXCHANGE_DATA", payload: exchangeValue });

//       return exchangeValue;

//     } catch (error) {
//       console.error("Error fetching exchangeData:", error);
//     }
//   }
// }

export const fetchExchangeData = () => {
  return async (dispatch) => {
    try {
      const exchangeData = await exchangeRates()
      dispatch({type: "SET_EXCHANGE_DATA", payload: exchangeData})

      return exchangeData
    } catch (error) {
      console.error("Error fetching exchangeData:", error);
    }
    
  }
}


// export const fetchCalculatedPrice = () => {
//   return async (dispatch, getState) => {
//       try {
//       const state = getState()
//       const exchangeCoin = state.exchangeReducer.exchangeCoin
//       const exchangeCurrecy = state.exchangeReducer.exchangeCurrecy
//       const calculatedPrice = await calculatePrice(exchangeCoin, exchangeCurrecy)
//       dispatch({type: "SET_CALCULATED_PRICE", payload: calculatedPrice })
//       console.log('calculatedPrice', calculatedPrice)
//       return calculatedPrice;
//     } catch (error) {
//       console.error("Error fetching calculatedPrice:", error);
//     }
//   }
// }
// import {
//   FETCH_CRYPTO_DATA,
//   FETCH_CRYPTO_FAILURE,
// } from "../constants/actionTypes";

// const initailState = {
//   cryptoData: null,
//   error: null,
// };

// export const cryptoReducer = (state = initailState, action) => {
//   switch (action.type) {
//     case 'FETCH_CRYPTO_DATA':
//       return {
//         ...state,
//         cryptoData: action.payload,
//         error: null,
//       };
//     case 'FETCH_CRYPTO_FAILURE':
//       return {
//         ...state,
//         cryptoData: null,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

const DEFAULT_COIN_STATE = {
  selectedCoin: "bitcoin",
  selectedCurrency: "usd",
  days: "1D",
};

export const coinReducer = (state = DEFAULT_COIN_STATE, action) => {
  switch (action.type) {
    case "SET_SELECTED_COIN":
      return {
        ...state,
        selectedCoin: action.payload,
      };
    case "SET_SELECTED_CURRENCY":
      return {
        ...state,
        selectedCurrency: action.payload,
      };
    case "SET_SELECTED_DAYS":
      return {
        ...state,
        days: action.payload,
      };
    default:
      return state;
  }
};

export const chartReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CRYPTO_DATA":
      return {
        ...state,
        CryptoData: action.payload,
      };
    case "SET_CHART_DATA":
      // console.log("Payload in SET_CHART_DATA:", action.payload);
      return {
        ...state,
        chartData: action.payload,
      };
    default:
      return state;
  }
};

// Default state for coin reducers
const DEFAULT_COIN_STATE = {
  selectedCoin: "bitcoin",
  selectedCurrency: "usd",
  days: "365",
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
        cryptoData: action.payload,
      };
    case "SET_CHART_DATA":
      // console.log("Payload in SET_CHART_DATA:", action.payload);
      return {
        ...state,
        chartData: action.payload,
      };
    case "SET_GLOBAL_DATA":
      return {
        ...state,
        globalData: action.payload,
      };
    case "SET_MARKET_CAP":
      return {
        ...state,
        marketCap: action.payload,
      };
    case "SET_ERROR_DATA":
      return {
        ...state,
        errorData: action.payload,
      };
    default:
      return state;
  }
};

// Default state for exchange reducers
const DEFAULT_EXCHANGE_STATE = {
  exchangeCoin: "btc",
  exchangeCurrecy: "usd",
  // exchangeAmount: 1,
  calculatedPrice: 0,
};

export const exchangeReducer = (state = DEFAULT_EXCHANGE_STATE, action) => {
  switch (action.type) {
    case "SET_EXCHANGE_DATA":
      return {
        ...state,
        exchangeData: action.payload,
      };
    case "SET_EXCHANGE_COIN":
      return {
        ...state,
        exchangeCoin: action.payload,
      };
    case "SET_EXCHANGE_CURRENCY":
      return {
        ...state,
        exchangeCurrecy: action.payload,
      };
    case "SET_CALCULATED_PRICE":
      return {
        ...state,
        calculatedPrice: action.payload,
      };
    default:
      return state;
  }
};

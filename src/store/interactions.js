export const selectedCoin = async (coin) => {
  return {
    type: "SET_SELECTED_COIN",
    payload: coin,
  };
};

export const selectedCurrency = async (value) => {
  return {
    type: "SET_SELECTED_CURRENCY",
    payload: value,
  };
};

export const selectedDays = async (value) => {
  return {
    type: "SET_SELECTED_DAYS",
    payload: value,
  };
};

export const cryptoData = async (value) => {
  return {
    type: "SET_CRYPTO_DATA",
    payload: value,
  };
};

export const chartData = (value) => {
  return {
    type: "SET_CHART_DATA",
    payload: value,
  };
};

export const errorData = async (value) => {
  return {
    type: "SET_ERROR_DATA",
    payload: value,
  };
};

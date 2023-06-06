import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExchangeData } from "../store/interactions";

const Exchange = () => {
  const exchangeData = useSelector(
    (state) => state.exchangeReducer.exchangeData
  );
  const exchangeCoin = useSelector(
    (state) => state.exchangeReducer.exchangeCoin
  );
  const exchangeCurrecy = useSelector(
    (state) => state.exchangeReducer.exchangeCurrecy
  );
  const calculatedPrice = useSelector(
    (state) => state.exchangeReducer.calculatedPrice
  );
  // const exchangeAmount = useSelector(
  //   (state) => state.exchangeReducer.exchangeAmount
  // );

  const [inputValue, setInputValue] = useState("");

  console.log(
    "exchangeData",
    exchangeData,
    calculatedPrice,
    exchangeCoin
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExchangeData());
    // getResult();
  }, [exchangeCoin, exchangeCurrecy, dispatch]);

  const getResult = () => {
    const value =
      exchangeData &&
      exchangeData[exchangeCoin] &&
      exchangeData[exchangeCoin].value;
    const value2 =
      exchangeData &&
      exchangeData[exchangeCurrecy] &&
      exchangeData[exchangeCurrecy].value;

    if (value && value2 && inputValue) {
      const result = (value2 / value) * inputValue;
      dispatch({ type: "SET_CALCULATED_PRICE", payload: result });
      return result;
    } else {
      console.log("Data is not available");
    }
  };

  const handleExchangeCoin = (e) => {
    dispatch({ type: "SET_EXCHANGE_COIN", payload: e });
  };

  const handleExchangeCurrency = (e) => {
    dispatch({ type: "SET_EXCHANGE_CURRENCY", payload: e });
  };

  const handleExchange = () => {
    getResult();
  };

  return (
    <div className="border border-red-300 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold p-2 ml-5">Exchange Coins</h2>

      <div className="flex flex-row p-2 ">
        <div className="p-2 items-center">
          <div className="flex my-1 content-center items-center py-1 px-2">
            <p className="text-red-500 font-semibold mr-3 text-xs">Sell</p>
            <select
              value={exchangeCoin}
              onChange={(e) => handleExchangeCoin(e.target.value)}
              className="lg:pl-8 w-[150px] h-[2.5rem] bg-gray-50 hover:bg-gray-100 font-semibold py-2 px-4 shadow rounded "
            >
              {exchangeData &&
                Object.keys(exchangeData).map((coin, index) => (
                  <option value={coin} key={index}>
                    {exchangeData[coin].name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex my-2 content-center items-center py-1 px-2 ">
            <p className="text-green-500 font-semibold mr-3 text-xs">Buy</p>
            <select
              value={exchangeCurrecy}
              onChange={(e) => handleExchangeCurrency(e.target.value)}
              className="lg:pl-8 w-[150px] h-[2.5rem] bg-gray-50 hover:bg-gray-100 font-semibold py-2 px-4 shadow rounded "
            >
              {exchangeData &&
                Object.keys(exchangeData).map((currency, index) => (
                  <option value={currency} key={index}>
                    {exchangeData[currency].name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="lg:pl-10 w-36 h-10">
          <div>
            <label className="text-xs">Enter value</label>
            <div>
              <input
                type="number"
                className="appearance-none block w-full bg-gray-100 bg-opacity-20 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 rounded border border-gray-400 px-3 py-1 text-sm outline-none pt-2 pb-2"
                placeholder=""
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <p className="p-4 text-green-500">
              {calculatedPrice !== undefined && calculatedPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto w-1/2 flex items-center justify-center pt-2">
        <button
          onClick={handleExchange}
          className="border border-gray-500 p-2 mb-2 bg-red rounded-lg background-opacity-10 text-sm  font-semibold hover:bg-red-300"
        >
          Exchange
        </button>
      </div>
    </div>
  );
};

export default Exchange;

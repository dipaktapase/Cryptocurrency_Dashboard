import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExchangeData, fetchCalculatedPrice } from "../store/interactions";

const Exchange = () => {
  //   const cryptoData = useSelector((state) => state.chartReducer.cryptoData);
  const exchangeData = useSelector(
    (state) => state.exchangeReducer.exchangeData
  );
  const exchangeCoin = useSelector(
    (state) => state.exchangeReducer.exchangeCoin
  );
  const exchangeCurrecy = useSelector(
    (state) => state.exchangeReducer.exchangeCurrecy
  );
  const exchangeValue = useSelector(
    (state) => state.chartReducer.currencyValue
  );
  const exchangeAmount = useSelector(
    (state) => state.chartReducer.exchangeAmount
  );
  const calculatedPrice = useSelector(
    (state) => state.chartReducer.calculatedPrice
  );

  const [conversionResult, setConversionResult] = useState("");
  const [symbol, setSymbol] = useState("aed");

  const sourceRate = exchangeData && exchangeData[exchangeCurrecy].value;

  console.log("exchangeData", exchangeData, sourceRate);
  // const [cryptoData, setCryptoData] = useState('')

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExchangeData());
    // dispatch(fetchCalculatedPrice());
    getResult()
  }, [exchangeCoin, exchangeCurrecy, exchangeValue, dispatch]);

  // dispatch(fetchCryptoData());
  // dispatch(fetchCurrencyData(exchangeCoin, exchangeCurrecy, exchangeValue));

  const getResult = () => {
    const value = exchangeData && exchangeData[exchangeCoin] && exchangeData[exchangeCoin].value;
    const value2 = exchangeData && exchangeData[exchangeCurrecy] && exchangeData[exchangeCurrecy].value;

    const result = value2 / value;
    console.log('result', result.toFixed(20));
    return result;
  };

  //   const handleExchangeData = (e) => {
  //     dispatch({ type: "SET_EXCHANGE_DATA", payload: e });
  //   };

  const handleExchangeCoin = (e) => {
    dispatch({ type: "SET_EXCHANGE_COIN", payload: e });
  };

  const handleExchangeCurrency = (e) => {
    dispatch({ type: "SET_EXCHANGE_CURRENCY", payload: e });
  };

  const handleCovertedAmount = (e) => {
    dispatch({ type: "SET_EXCHANGE_AMOUNT", payload: e });
  };

  return (
    <div>
      <div className="p-2">
        <h1 className="font-bold p px-6 pt-2">Exchange Coins</h1>
        <div className="inline items-center">
          <div>
            <p>Sell</p>
            <select
              value={exchangeCoin}
              onChange={(e) => handleExchangeCoin(e.target.value)}
              className="bg-gray-50 hover:bg-gray-100 font-semibold py-2 px-4 shadow rounded"
            >
              {exchangeData &&
                Object.keys(exchangeData).map((coin, index) => (
                  <option value={coin} key={index}>
                    {exchangeData[coin].name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <p>Buy</p>
            <select
              value={exchangeCurrecy}
              onChange={(e) => handleExchangeCurrency(e.target.value)}
              className="bg-gray-50 hover:bg-gray-100 font-semibold py-2 px-4 shadow rounded"
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
      </div>

      <div className="p-2">
        <h2>Enter Value</h2>
        <input
          type="number"
          value={exchangeAmount}
          placeholder="Enter Value"
          onChange={handleCovertedAmount}
        />

        {/* <p className="p-4">{`exchangeData.${exchangeCoin}.${exchangeCurrecy}` * exchangeValue}</p> */}
        <p className="p-4 text-green-500">{getResult()}</p>
      </div>
      <div>
        <button type="submit" className="p-2">
          Convert
        </button>
      </div>
    </div>
  );
};

export default Exchange;

import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import greenTriangle from "../assets/up.png";
import redTriangle from "../assets/down.png";
import { fetchCryptoData } from "../store/interactions";

const Markets = () => {
  const cryptoData = useSelector((state) => state.chartReducer.cryptoData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  // console.log(cryptoData);

  let priceChangeColor = (price) => {
    if (price > 0) {
      return {
        colorClass: "text-green-500",
        imgSrc: greenTriangle,
      };
    } else if (price < 0) {
      return {
        colorClass: "text-red-500",
        imgSrc: redTriangle,
      };
    } else {
      return {
        colorClass: "",
        imgSrc: "",
      };
    }
  };

  const slicedCoinData = cryptoData?.slice(0, 11);

  return (
    <div className="container-fluid w-full h-full p-2 border border-red-300 rounded-lg shadow-lg">
      <h1 className="text-lg font-semibold pl-4">Cryptocurrency by Market cap</h1>
      <ul className="m-2 mb-4 overflow-hidden">
        {slicedCoinData?.map((crypto, index) => (
          <li
            key={index}
            className="flex items-center justify-between item-center p-2"
          >
            <div>
              <h3 className="font-semibold">{crypto.name}</h3>
              <p className="text-xs text-gray-500 ">
                Mkt.Cap ${crypto.market_data.market_cap.usd.toLocaleString()}
              </p>
            </div>

            <div className="flex relative item-ceter gap-4">
              <img
                src={
                  priceChangeColor(
                    crypto.market_data.market_cap_change_percentage_24h
                  ).imgSrc
                }
                alt="price up indicator"
                className="w-4 h-4 mt-1"
              />
              <p
                className={`text-sm ${
                  priceChangeColor(
                    crypto.market_data.market_cap_change_percentage_24h
                  ).colorClass
                }`}
              >
                {Math.abs(
                  crypto.market_data.market_cap_change_percentage_24h
                ).toFixed(2)}
                %
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Markets;

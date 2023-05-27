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
  }, []);

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

  const slicedCoinData = cryptoData?.slice(0, 10);

  return (
    <div className="container overflow-hidden p-2">
      <h1 className=" font-medium pb-4">Cryptocurrency by Market cap</h1>
      <ul>
        {slicedCoinData?.map((crypto, index) => (
          <li
            key={index}
            className=" flex items-center justify-between item-center p-2"
          >
            <div>
              <h3 className="font-bold">{crypto.name}</h3>
              <p className="text-xs text-gray-500 ">
                Mkt.Cap ${crypto.market_data.current_price.usd.toLocaleString()}
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

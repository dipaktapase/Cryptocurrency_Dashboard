import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMarketCap } from "../store/interactions";
import { Chart as ChartJS, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(...registerables);

const Portfolio = () => {
  const marketCap = useSelector((state) => state.chartReducer.marketCap);
  const totalCapValue = marketCap && marketCap.totalValue;
  const selectedCurrency = useSelector((state) => state.coinReducer.selectedCurrency);
  const currencySymbol = useSelector((state) => state.coinReducer.currencySymbol);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMarketCap(selectedCurrency, currencySymbol));
  }, [selectedCurrency, currencySymbol,dispatch]);

  const options = {
    responsive: true,
    aspectRatio: 3,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          pointStyle: "circle",
          padding: 20,
          pointStyleWidth: 15,
          usePointStyle: true,
        },
      },
    },
  };
  
  // console.log("Market cap data", marketCap, totalCapValue);

  return (

    <>
      <div className="border border-red-300 rounded-lg shadow-lg p-2">
        <div className="flex items-center justify-between p-4">
          <span className="text-lg font-semibold">
            Portfolio
          </span>
          {/* <h1 className="font-bold">Portfolio</h1> */}
          <span>
          Total value : <span className="font-semibold">{currencySymbol && currencySymbol}{totalCapValue}</span>{" "}
          </span>
          <p className="font-semibold text-sm">
          </p>
        </div>
        {marketCap && <Pie data={marketCap} options={options} />}
      </div>
    </>
  );
};

export default Portfolio;

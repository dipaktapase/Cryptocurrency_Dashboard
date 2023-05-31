import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMarketCap } from "../store/interactions";
import { Chart as ChartJS, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(...registerables);

const Portfolio = () => {
  const marketCap = useSelector((state) => state.chartReducer.marketCap);
  const totalCapValue = marketCap && marketCap.totalValue;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMarketCap());
  }, []);

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
      <div className="p-2">
        <div className="flex items-center justify-between p-4">
          <h1 className="font-bold">Portfolio</h1>
          <p className="font-semibold text-sm">
            Total value : <span>${totalCapValue}</span>{" "}
          </p>
        </div>
        {marketCap && <Pie data={marketCap} options={options} />}
      </div>
    </>
  );
};

export default Portfolio;

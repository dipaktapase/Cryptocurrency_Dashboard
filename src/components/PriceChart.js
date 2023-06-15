import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCryptoData, fetchChartData } from "../store/interactions";
import {
  horizontalChartOptions,
  lineChartOptions,
  verticalChartOptions,
} from "./PriceChart.config";
import {
  Chart as Chartjs,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

Chartjs.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PriceChart = () => {
  const selectedCoin = useSelector((state) => state.coinReducer.selectedCoin);
  const selectedCurrency = useSelector(
    (state) => state.coinReducer.selectedCurrency
  );
  const days = useSelector((state) => state.coinReducer.days);
  const chartData = useSelector((state) => state.chartReducer.chartData);
  const cryptoData = useSelector((state) => state.chartReducer.cryptoData);

  const [errorData, setErrorData] = useState("");
  const [chartType, setChartType] = useState("line");

  const dispatch = useDispatch();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (selectedCoin) {
        dispatch(fetchCryptoData());
        dispatch(fetchChartData());
      }
    }, 1000);
    return () => clearTimeout(delay);
  }, [selectedCoin, selectedCurrency, days, dispatch]);

  // console.log(selectedCoin, selectedCurrency, days, chartData);

  const handleDays = (e) => {
    dispatch({ type: "SET_SELECTED_DAYS", payload: e.target.value });
  };

  const handleCryptoData = (e) => {
    dispatch({ type: "SET_SELECTED_COIN", payload: e });
  };

  const handleChartType = (e) => {
    setChartType(e.target.value);
  };

  return (
    <div className="container-fluid flex inline w-full h-96 border border-red-300 mb-2 rounded-lg shadow-lg px-4 pt-3 mt-2 gap-2">
      <div className="flex absolute py-0 pt-28 ml-2 md:pt-20 md:ml-4 font-semibold text-md">
        {selectedCurrency.toUpperCase()}
      </div>
      <div className="flex absolute lg-gap-3 items-center lg-ml-48 ml-16 gap-2 lg-left-34 left-4 md:mt-3 lg:mt-3 sm:mt-3 mt-3">
        <button
          className="px-3 py-1.5 border rounded-md text-xs bg-gray-50 hover:bg-gray-100 bg-opacity-30 lg:mg-auto"
          value="1"
          onClick={handleDays}
        >
          1D
        </button>
        <button
          className="px-3 py-1.5 border rounded-md text-xs bg-gray-50 hover:bg-gray-100 bg-opacity-30 lg:mg-auto"
          value="7D"
          onClick={handleDays}
        >
          1W
        </button>
        <button
          className="px-3 py-1.5 border rounded-md text-xs bg-gray-50 hover:bg-gray-100 bg-opacity-30 lg:mg-auto"
          value="30D"
          onClick={handleDays}
        >
          1M
        </button>
        <button
          className="px-3 py-1.5 border rounded-md text-xs bg-gray-50 hover:bg-gray-100 bg-opacity-30 lg:mg-auto"
          value="60D"
          onClick={handleDays}
        >
          6M
        </button>
        <button
          className="px-3 py-1.5 border rounded-md text-xs bg-gray-50 hover:bg-gray-100 bg-opacity-30 lg:mg-auto"
          value="365D"
          onClick={handleDays}
        >
          1Y
        </button>
        <div className="flex absolute items-center rounded-md p-2 w-36 md:w-44 lg:left-[22rem] lg:mt-1 md:left-[22rem] md:mt-1 sm:right-[9rem] mt-20 ml-2">
          <select
            value={selectedCoin}
            onChange={(e) => handleCryptoData(e.target.value)}
            className="w-full lg:w-auto relative bg-gray-50 hover:bg-gray-100 font-semibold py-2 text-transform: capitalize outline-none shadow rounded"
            // placeholder="Search coins..."
          >
            {cryptoData?.map((coin, index) => (
              <option value={coin.id.toLowerCase()} key={index}>
                {coin.name}
              </option>
            ))}
          </select>

          <div className="rounded-md bg-opacity-30 p-2 absolute lg:left-[10rem] md:left-[10rem] left-[8rem] sm:left-[8rem] w-28 sm:w-32 md:w-36 ml-5">
            <select
              value={chartType}
              onChange={handleChartType}
              className="w-full lg:w-auto h-10 bg-gray-50 hover:bg-gray-100 font-semibold py-2 shadow rounded"
            >
              <option value="line">Line Chart</option>
              <option value="vertical">Vertical Bar Chart</option>
              <option value="horizontal">Horizontal Bar Chart</option>
            </select>
          </div>
        </div>
      </div>

      <div className="h-auto sm:h-86 w-full overflow-hidden mt-24 md:mt-16 lg:mt-16">
        {!errorData &&
          chartData &&
          chartType === "line" &&
          Object.keys(chartData).length > 0 && (
            <Line data={chartData} options={lineChartOptions} />
          )}
        {!errorData &&
          chartData &&
          chartType === "vertical" &&
          Object.keys(chartData).length > 0 && (
            <Bar
              data={chartData}
              options={verticalChartOptions}
              height="100%"
            />
          )}
        {!errorData &&
          chartData &&
          chartType === "horizontal" &&
          Object.keys(chartData).length > 0 && (
            <Bar
              data={chartData}
              height="100%"
              options={horizontalChartOptions}
            />
          )}
      </div>
    </div>
  );
};

export default PriceChart;

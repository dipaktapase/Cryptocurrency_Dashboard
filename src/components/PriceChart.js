import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getChartData } from "../api/coingecko";
import searchImg from "../assets/search.png";
import {
  Chart as Chartjs,
  ArcElement,
  CategoryScale,
  LiniearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chartjs.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PriceChart = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [chartData, setChartData] = useState({});
  const [days, setDays] = useState("1");
  const [error, setError] = useState("");
  console.log(chartData);

  console.log(days);

  useEffect(() => {
    const delay = setTimeout(() => {
      const fetchData = async () => {
        try {
          const data = await getChartData(selectedCoin, selectedCurrency, days);
          setChartData(data);
          setError("");
        } catch (error) {
          console.error("Error fetching chart data:", error);
          setError("Error fetching chart data. Please try again.");
        }
      };

      if (selectedCoin) {
        fetchData();
      }
    }, 1000);
    return () => clearTimeout(delay);
  }, [selectedCoin, selectedCurrency, days]);

  console.log(selectedCoin, selectedCurrency, chartData, days);

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleSearch = (e) => {
    setSelectedCoin(e.target.value);
  };

  const handleDays = (e) => {
    setDays(e.target.value);
  };

  return (
    <div>
      {/* Drop down menu */}


      <div className="flex items-center p-2 ">
        <div>
          <select
            id="currency"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select>
        </div>
        <div className="flex p-2 w-full gap-2 ">
          <div>
            <img src={searchImg} alt="searchImg" className="h-6 w-6 ml-4" />
          </div>
          <div className="">
            <input
              type="text"
              id="serach"
              value={selectedCoin}
              onChange={handleSearch}
              // onClick={handleSearch}
              placeholder="Search by coin"
              className="ml-4 w-full"
            />
          </div>
        </div>
        </div>

      <div className="flex items-container mt-4">
        <label htmlFor="timeFrame" className="mr-2">
          Time Frame:
        </label>
        <select id="timeFrame" onChange={handleDays}>
          <option value="1D">1D</option>
          <option value="7D">7D</option>
          {/* Add more time frame options */}
        </select>
      </div>

      <div className="mt-4 chart-container w-">
        {!error && Object.keys(chartData).length > 0 && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "center" },
                title: { display: true, text: `${selectedCoin}` },
              },
            }}
          />
        )}
      </div>

    </div>
  );
};

export default PriceChart;

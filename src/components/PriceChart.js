import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChartData, getMarketData } from "../api/coingecko";
import searchImg from "../assets/search.png";
import {
  Chart as Chartjs,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
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
  const selectedCoin = useSelector((state) => state.coinReducer.selectedCoin);
  const selectedCurrency = useSelector(
    (state) => state.coinReducer.selectedCurrency
  );
  const days = useSelector((state) => state.coinReducer.days);
  const errorData = useSelector((state) => state.coinReducer.errorData);
  const chartData = useSelector((state) => state.chartReducer.chartData);
  // const cryptoData = useSelector((state) => state.chartReducer.cryptoData);

  const dispatch = useDispatch();

  console.log(chartData);

  useEffect(() => {
    const delay = setTimeout(() => {
      const fetchData = async () => {
        try {
          const data = await getChartData(selectedCoin, selectedCurrency, days);
          // console.log(data);
          // const marketData = await getMarketData();
          // setCryptoData(marketData);
          // dispatch({type: "SET_CRYPTO_DATA", payload: marketData})
          dispatch({ type: "SET_CHART_DATA", payload: data });
          await console.log("chartdata comp:", chartData);
          // setChartData(data);
          dispatch({ type: "SET_ERROR_DATA", payload: errorData });
          // setError("");
        } catch (error) {
          console.error("Error fetching chart data:", error);
          dispatch({
            type: "SET_ERROR_DATA",
            payload: "Error fetching chart data. Please try again.",
          });
        }
      };

      if (selectedCoin) {
        fetchData();
      }
    }, 1000);
    return () => clearTimeout(delay);
  }, [selectedCoin, selectedCurrency, days]);

  useEffect(() => {
    console.log("chartData iis:", chartData);
  }, [chartData]);

  console.log(selectedCoin, selectedCurrency, chartData, days);

  const handleCurrencyChange = (e) => {
    dispatch({ type: "SET_SELECTED_CURRENCY", payload: e.target.value });
  };

  const handleSearch = (e) => {
    dispatch({ type: "SET_SELECTED_COIN", payload: e.target.value });
  };

  const handleSubmitSearch = () => {
    dispatch({ type: "SET_SELECTED_COIN", payload: "" });
  };

  const handleDays = (e) => {
    dispatch({ type: "SET_SELECTED_DAYS", payload: e.target.value });
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
              onClick={handleSubmitSearch}
              placeholder="Search by coin"
              className="ml-4 w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex items-container mt-4">
        {/* TimeFrame */}
        <div className="flex items-center ml-2 gap-2 p-2  " id="timeFrame">
          <button className="cursor-pointer" value="1D" onClick={handleDays}>
            1D
          </button>
          <button className="cursor-pointer" value="7D" onClick={handleDays}>
            1W
          </button>
          <button className="cursor-pointer" value="30D" onClick={handleDays}>
            1M
          </button>
          <button className="cursor-pointer" value="60D" onClick={handleDays}>
            6M
          </button>
          <button className="cursor-pointer" value="365D" onClick={handleDays}>
            1Y
          </button>
        </div>

        {/* Coin Dropdown Menu */}
        {/* {getMarketData.data} */}
        <div>
          <select></select>
        </div>
      </div>

      <div className="mt-4 chart-container w-">
        {!errorData && Object.keys(chartData).length > 0 && (
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

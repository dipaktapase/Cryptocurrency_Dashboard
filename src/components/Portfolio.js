import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGobalData } from "../store/interactions";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {
  const globalData = useSelector((state) => state.chartReducer.globalData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGobalData());
  }, []);

  console.log("global data", globalData);

  return (
    <div>
      <div className="flex item-cente gap-10 p-2">
        <h1 className="font-bold flex ml-4">Portfolio</h1>
        <p className="text-grey-500">Total value ${"1000"}</p>
      </div>

      <div className="p-4">
        {globalData && <Pie data={globalData} height="20%" />}
      </div>
    </div>
  );
};

export default Portfolio;

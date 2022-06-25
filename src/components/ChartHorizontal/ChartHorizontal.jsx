import { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useInterval } from "../hooks/useInterval";
import s from "./ChartHorizontal.module.css";

import dataExample from "../../layout/dataExample.json";
import { getRandomNumber } from "../../helpers/getRandomNumber";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartHorizontal() {
  const [labels, setLabels] = useState([]);
  const [seconds, setSeconds] = useState([]);

  useEffect(() => {
    setLabels(dataExample.map((item) => item.name));
    setSeconds(dataExample.map((item) => item.time));
  }, []);

  useInterval(() => {
    changeTime();
  }, 30000);

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {},
      title: {
        display: true,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: [],
        data: seconds,
        borderColor: "rgb(99, 166, 149)",
        backgroundColor: "rgba(99, 166, 149, 0.5)",
      },
    ],
  };

  const changeTime = () => {
    const newSeconds = seconds.map((item) => (item = getRandomNumber(0, 300)));
    setSeconds(newSeconds);
  };

  const handleClick = () => {
    changeTime();
  };

  return (
    <div className={s.container}>
      <h2>SPENT TIME (SECONDS)</h2>
      <Bar options={options} data={data} />
      <button type="button" className={s.button} onClick={handleClick}>
        RANDOMIZE
      </button>
    </div>
  );
}

export default ChartHorizontal;

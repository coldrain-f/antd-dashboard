import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import { Bar } from "react-chartjs-2";

defaults.font.family = "Noto Sans KR";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    title: {
      display: false,
      text: "Todo",
    },
  },
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  legend: {
    position: "left",
  },
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
    },
  },
};

const labels = ["지난 달", "이번 달"];

const data = {
  labels,
  datasets: [
    {
      label: "해야 할 일",
      data: [64, 127, 30],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "진행중",
      data: [10, 20, 30],
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "완료",
      data: [10, 20, 30],
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};

const TodoBarChart: React.FC = () => {
  return <Bar options={options} data={data} />;
};

export default TodoBarChart;

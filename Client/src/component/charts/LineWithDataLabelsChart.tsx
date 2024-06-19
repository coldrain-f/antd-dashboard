import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { useRecoilState } from "recoil";
import { antdRecoilState } from "../../recoil/antdRecoilState";

interface MyComponentProps {}

const LineWithDataLabelsChart: React.FC = () => {
  const [recoilState] = useRecoilState(antdRecoilState);

  const [data, setData] = useState([
    {
      name: "해야 할 일",
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
    },
    {
      name: "진행 중",
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
    },
    {
      name: "완료",
      data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
    },
  ]);

  const chartOptions: ApexOptions = {
    // Define your chart options here
    chart: {
      fontFamily: "Noto Sans KR, Arial, sans-serif",
      background: recoilState.isDarkMode ? "#141414" : "#ffffff",
      redrawOnParentResize: true, // resize
      redrawOnWindowResize: true,
      toolbar: {
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
    },

    theme: {
      mode: recoilState.isDarkMode ? "dark" : "light",
    },

    colors: ["#008FFBD9", "#00E396D9", "#FEB019D9"],

    series: data,

    dataLabels: {
      enabled: false,
    },

    stroke: {
      width: [5, 7, 5],
      curve: "straight",
      dashArray: [0, 8, 5],
    },
    title: {
      text: "",
      align: "left",
    },

    legend: {
      position: "top",
      horizontalAlign: "left",
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - <strong>" +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          "</strong>"
        );
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    yaxis: {
      title: {
        text: "Timeline",
      },
    },
    xaxis: {
      categories: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ],
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },

    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="line"
        height={500}
        width={"100%"}
      />
    </div>
  );
};

export default LineWithDataLabelsChart;

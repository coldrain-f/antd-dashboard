import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { useRecoilState } from "recoil";
import { antdRecoilState } from "../../recoil/antdRecoilState";

interface MyComponentProps {}

const ColumnWithDataLabelsChart: React.FC<MyComponentProps> = () => {
  const [recoilState] = useRecoilState(antdRecoilState);

  const chartOptions: ApexOptions = {
    // Define your chart options here
    chart: {
      fontFamily: "Noto Sans KR, Arial, sans-serif",
      redrawOnParentResize: true, // resize
      redrawOnWindowResize: true,
      background: recoilState.isDarkMode ? "#141414" : "#ffffff",
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
      // stacked: true,
    },

    theme: {
      mode: recoilState.isDarkMode ? "dark" : "light",
    },

    plotOptions: {
      bar: {
        // borderRadius: 10,
        // columnWidth: "45%",
        horizontal: false, // 가로 세로
        // distributed: true,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },

    series: [
      {
        name: "해야 할 일",
        data: [47, 64],
      },
      {
        name: "진행 중",
        data: [102, 127],
      },
      {
        name: "완료",
        data: [15, 30],
      },
    ],

    colors: ["#008FFBD9", "#00E396D9", "#FEB019D9"],

    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "개";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: [recoilState.isDarkMode ? "#ffffff" : "#304758"],
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      onItemClick: {
        toggleDataSeries: true,
      },
    },
    stroke: {
      width: 1,
      show: true,
      // colors: ["#fff"],
      colors: ["transparent"],
    },

    yaxis: {
      title: {
        text: "Todo",
      },
    },
    xaxis: {
      categories: [
        ["지난 달", "2024-05"],
        ["이번 달", "2024-06"],
      ],
      // position: "top", // 카테고리 위에 표시
      axisBorder: {
        // show: false,
        show: true,
      },
      axisTicks: {
        // show: false,
        show: true,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={375}
        style={{ maxWidth: 529 }}
      />
    </div>
  );
};

export default ColumnWithDataLabelsChart;

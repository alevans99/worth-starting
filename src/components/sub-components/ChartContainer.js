import "../../styles/ChartContainer.css";
import { getElementAtEvent, Chart } from "react-chartjs-2";
import barChartIcon from "../../assets/bar-chart-icon.svg";
import lineChartIcon from "../../assets/line-chart-icon.svg";

import {
  Chart as ChartJS,
  CategoryScale,
  BarController,
  LineController,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef, useState } from "react";

ChartJS.register(
  CategoryScale,
  BarController,
  LineController,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartContainer({ episodesInfo, setModalData, setShowModal }) {
  const chartRef = useRef();
  // const dataSetIdKey = episodesInfo.showName;
  const [chartOrientation, setChartOrientation] = useState("vertical");
  const [chartType, setChartType] = useState("bar");
  const fontSize =
    (window.innerWidth / 100) * 1.5 > 10 ? (window.innerWidth / 100) * 1.5 : 10;
  const chartButtons = [
    { type: "bar", orientation: "vertical" },
    { type: "bar", orientation: "horizontal" },
    { type: "line", orientation: "vertical" },
    { type: "line", orientation: "horizontal" },
  ];

  const handleEpisodeClick = (event) => {
    const episodeElement = getElementAtEvent(chartRef.current, event);
    if (episodeElement[0] !== undefined) {
      const episodeIndex = episodeElement[0].index;
      setModalData(episodesInfo.modalData[episodeIndex]);
      setShowModal(true);
    }
  };

  const handleChartButtonClick = (
    chartOrientationSelected,
    chartTypeSelected
  ) => {
    setChartOrientation(chartOrientationSelected);

    if (chartType !== chartTypeSelected) {
      setChartType(chartTypeSelected);
      chartRef.current.config.type = chartTypeSelected;
    }
  };

  const createChartOptions = () => {
    const chartIsHorizontal = chartOrientation === "horizontal";

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: chartIsHorizontal ? "y" : "x",

      scales: {
        y: {
          max: !chartIsHorizontal ? 10 : null,
          beginAtZero: !chartIsHorizontal ? false : true,

          // min: 0,
          ticks: {
            stepSize: !chartIsHorizontal ? 0.5 : null,
            font: {
              size: fontSize,
              family: "'Lato', sans-serif",
            },
          },
        },
        x: {
          max: chartIsHorizontal ? 10 : null,
          beginAtZero: chartIsHorizontal ? false : true,

          ticks: {
            stepSize: chartIsHorizontal ? 0.5 : null,
            font: {
              size: fontSize,
              family: "'Lato', sans-serif",
            },
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: fontSize,
              family: "'Lato', sans-serif",
            },
          },
        },
        tooltip: {
          titleFont: {
            size: fontSize,
            family: "'Lato', sans-serif",
          },
          bodyFont: {
            size: fontSize,
            family: "'Lato', sans-serif",
          },
          footerFont: {
            size: fontSize,
            family: "'Lato', sans-serif",
          },
        },
      },
    };
    return chartOptions;
  };

  const data = {
    labels: episodesInfo.episodeNumbers,
    datasets: [
      {
        label: "Episode Rating",
        data: episodesInfo.episodeRatings,
        backgroundColor: "#1C0F13",
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "#8d1539",
        pointHitRadius: 50,
        hoverBackgroundColor: "#8d1539",
      },
    ],
  };

  return (
    <div className="ChartContainer">
      <div className="chart-button-container">
        {chartButtons.map((button, index) => {
          const buttonSelected =
            chartOrientation === button.orientation &&
            chartType === button.type;

          const iconToUse =
            button.type === "bar" ? barChartIcon : lineChartIcon;

          return (
            <img
              key={`${button.type}${index}`}
              className={`${button.orientation}-${
                button.type
              }-button chart-button ${
                buttonSelected ? "chart-button-selected" : ""
              }`}
              alt={`${button.orientation} ${button.type} chart`}
              src={iconToUse}
              onClick={() => {
                handleChartButtonClick(button.orientation, button.type);
              }}
            ></img>
          );
        })}
      </div>

      <div
        className={`${
          chartOrientation === "horizontal"
            ? `horizontal-chart`
            : `vertical-chart`
        }`}
      >
        <Chart
          type={chartType}
          ref={chartRef}
          className="chart"
          options={createChartOptions()}
          data={data}
          onClick={handleEpisodeClick}
        ></Chart>
      </div>
    </div>
  );
}

export default ChartContainer;

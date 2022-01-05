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
  const [dynamicAxis, setDynamicAxis] = useState(true);

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

  const handleAxisButtonClick = () => {
    setDynamicAxis((previousValue) => {
      return !previousValue;
    });
    const newAxisSettings = createAxisSettings();

    if (chartOrientation === "horizontal") {
      chartRef.current.scales.x.max = newAxisSettings.xMax;
      chartRef.current.scales.x.beginAtZero = newAxisSettings.xBeginAtZero;
    } else {
      chartRef.current.scales.y.max = newAxisSettings.yMax;
      chartRef.current.scales.y.beginAtZero = newAxisSettings.yBeginAtZero;
    }
  };

  const createAxisSettings = () => {
    const axisSettings = {};
    const fontSize =
      (window.innerWidth / 100) * 1.5 > 10
        ? (window.innerWidth / 100) * 1.5
        : 10;
    axisSettings.fontSize = fontSize;
    axisSettings.fontFamily = "'Lato', sans-serif";

    if (chartOrientation === "vertical") {
      axisSettings.yMax = dynamicAxis ? null : 10;
      axisSettings.yBeginAtZero = dynamicAxis ? false : true;
      axisSettings.xMax = null;
      axisSettings.xBeginAtZero = true;
      axisSettings.indexAxis = "x";
      axisSettings.yStep = 0.5;
      axisSettings.xStep = null;
    } else {
      axisSettings.yMax = null;
      axisSettings.yBeginAtZero = true;
      axisSettings.xMax = dynamicAxis ? null : 10;
      axisSettings.xBeginAtZero = dynamicAxis ? false : true;
      axisSettings.indexAxis = "y";
      axisSettings.yStep = null;
      axisSettings.xStep = 0.5;
    }
    return axisSettings;
  };

  const createChartOptions = () => {
    const chartIsHorizontal = chartOrientation === "horizontal";

    const axisSettings = createAxisSettings();

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: axisSettings.indexAxis,

      scales: {
        y: {
          max: axisSettings.yMax,
          beginAtZero: axisSettings.yBeginAtZero,
          ticks: {
            stepSize: axisSettings.yStep,
            font: {
              size: axisSettings.fontSize,
              family: axisSettings.fontFamily,
            },
          },
        },
        x: {
          max: axisSettings.xMax,
          beginAtZero: axisSettings.xBeginAtZero,

          ticks: {
            stepSize: axisSettings.xStep,
            font: {
              size: axisSettings.fontSize,
              family: axisSettings.fontFamily,
            },
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: axisSettings.fontSize,
              family: axisSettings.fontFamily,
            },
          },
        },
        tooltip: {
          titleFont: {
            size: axisSettings.fontSize,
            family: axisSettings.fontFamily,
          },
          bodyFont: {
            size: axisSettings.fontSize,
            family: axisSettings.fontFamily,
          },
          footerFont: {
            size: axisSettings.fontSize,
            family: axisSettings.fontFamily,
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
      <div className="axis-switch-container">
        <label className="switch">
          <input
            type="checkbox"
            defaultChecked={true}
            onClick={() => {
              handleAxisButtonClick();
            }}
          />

          <span className="slider round"></span>
        </label>
        <p className="axis-switch-label">
          {dynamicAxis ? "Dynamic " : "Fixed"} Axis
        </p>
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

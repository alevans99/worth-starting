import "../../styles/VerticalBarChart.css";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function VerticalBarChart({ episodesInfo, setModalData,setShowModal }) {
  const chartRef = useRef();
  const dataSetIdKey = episodesInfo.showName;

  const handleEpisodeClick = (event) => {
    const episodeElement = getElementAtEvent(chartRef.current, event);
    if (episodeElement[0] != undefined){
        const episodeIndex = episodeElement[0].index
        setModalData(episodesInfo.modalData[episodeIndex])
        setShowModal(true)
    }

  };

  const data = {
    labels: episodesInfo.episodeNumbers,
    datasets: [
      {
        label: "Episode Ratings",
        data: episodesInfo.episodeRatings,
        backgroundColor: "#8267BE",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        max: 10,
        // min: 0,
        ticks: {
          stepSize: 0.5,
        },
        beginAtZero: false,
      },
    },
  };
  return (
    <div className="VerticalBarChart">
      <Bar
        ref={chartRef}
        className="chart"
        options={options}
        data={data}
        onClick={handleEpisodeClick}
      ></Bar>
    </div>
  );
}

export default VerticalBarChart;

import "../../styles/ChartContainer.css";
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
import { screenIsPortrait } from "../../utils/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartContainer({ episodesInfo, setModalData,setShowModal }) {
  const chartRef = useRef();
  const dataSetIdKey = episodesInfo.showName;

  const handleEpisodeClick = (event) => {
    const episodeElement = getElementAtEvent(chartRef.current, event);
    if (episodeElement[0] !== undefined){
        const episodeIndex = episodeElement[0].index
        setModalData(episodesInfo.modalData[episodeIndex])
        setShowModal(true)
    }

  };

  const createChartOptions = (screenIsPortrait) =>{

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: screenIsPortrait ? 'y' : 'x',

      scales: {
        y: {
          max: !screenIsPortrait ? 10 : null,
          // min: 0,
          ticks: {
            stepSize: !screenIsPortrait ? 0.5 : null,
            font: {
              size: 30,
              family: "'Lato', sans-serif"
          }
          },
          beginAtZero: !screenIsPortrait ? false : null
        },
        x: {
          max: screenIsPortrait ? 10 : null,
          ticks: {
            stepSize: screenIsPortrait ? 0.5 : null,
            font: {
              size: 30,
              family: "'Lato', sans-serif"
          },
          beginAtZero: screenIsPortrait ? false : null
          },
        
        },
      },
      plugins: {
        legend: {
            labels: {
                font: {
                    size: 40,
                    family: "'Lato', sans-serif"
  
                }
            }
        },
        tooltip: {
          titleFont:{
            size: 40,
            family: "'Lato', sans-serif"
          },
          bodyFont: {
            size: 30,
            family: "'Lato', sans-serif" 
                 },
          footerFont: {
            size: 30,
            family: "'Lato', sans-serif" 
          }
        }
    }
  
    };

    return chartOptions
  }


  const data = {
    labels: episodesInfo.episodeNumbers,
    datasets: [
      {
        label: "Episode Rating",
        data: episodesInfo.episodeRatings,
        // backgroundColor: "#fbf700",
        backgroundColor: "#000",

      },
    ],
  };


  return (
    <div className={`ChartContainer ${screenIsPortrait() ? `horizontal-chart` : `vertical-chart`}`}>
      
      <Bar
        ref={chartRef}
        className="chart"
        options={createChartOptions(screenIsPortrait())}
        data={data}
        onClick={handleEpisodeClick}
      ></Bar>
    </div>
  );
}

export default ChartContainer;

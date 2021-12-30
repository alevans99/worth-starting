import "../../styles/VerticalBarChart.css";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function VerticalBarChart({episodesInfo}) {

const dataSetIdKey = episodesInfo.showName

const data = {
    labels: episodesInfo.episodeNumbers,
    datasets: [
        {
            label: "Episode Ratings",
            data: episodesInfo.episodeRatings,
            backgroundColor: '#8267BE',

        }
    ]
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            max: 10,
            // min: 0,
            ticks: {
                stepSize: 0.5
            },
            beginAtZero: false
        }
    }
}
  return (

      <div className="VerticalBarChart">
          <Bar className="chart" options={options} data={data}></Bar>
      </div>
 
  );
}

export default VerticalBarChart;

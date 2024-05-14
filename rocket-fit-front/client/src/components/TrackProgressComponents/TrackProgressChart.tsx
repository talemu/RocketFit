import { Line } from "react-chartjs-2";
import { ExerciseRecord } from "../../services/exerciseRecordService";
import moment from "moment"; // Import moment library
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  records: ExerciseRecord[];
}

const TrackProgressChart = ({ records }: Props) => {
  const chartData = {
    labels: records.map((record) =>
      moment(record.createdDate).format("MMM DD YYYY")
    ),
    datasets: [
      {
        label: "Weight",
        data: records.map((record) => record.weight),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Progress",
      },
    },
  };

  return (
    <>
      <Line data={chartData} options={options} />
    </>
  );
};

export default TrackProgressChart;

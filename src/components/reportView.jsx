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

import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Diesel Level Sensors" },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [1, 2, 2, 3, 2],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [1, 2, 2, 3, 2],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function ReportView() {
  return (
    <div
      className="container bg-light text-center border border-2 border-danger"
      style={{ height: 300 }}
    >
      <Line options={options} data={data} />
    </div>
  );
}

export default ReportView;

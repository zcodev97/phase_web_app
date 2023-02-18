import { useEffect, useState } from "react";
import Warehouse from "../node_modules/esiur/src/Resource/Warehouse";
import GaugeChart from "react-gauge-chart";
import ReactSpeedometer from "react-d3-speedometer";
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
import GeneratorChart from "./components/generatorChart";
import DieselLevelSensor from "./components/dieselLevelSensorChart";

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

function App() {
  const [loading, setLoading] = useState(false);

  const [generators, setGenerators] = useState(null);
  const [levelSensors, setLevelSensors] = useState(null);

  async function connectToEsiur() {
    try {
      setLoading(true);
      let connection = await Warehouse.get(
        "iip://phase.delta.iq:40401/sys/service",
        { autoReconnect: true, reconnect: true }
      );

      console.log(connection);
      if (connection !== null || connection !== undefined) {
        setGenerators(connection.Generators);
        setLevelSensors(connection.LevelSensors);

        connection.Generators[2].on(":L1A", () => {
          setGenerators(connection.Generators);
          // console.log("modified");
        });

        setLoading(false);
      }
    } catch (e) {
      // alert(e);
      console.log(e);
      setLoading(false);
    }
  }

  async function getLevelSensorReport() {}

  useEffect(() => {
    connectToEsiur();
  }, []);

  return (
    <div className="App">
      <div className="container-fluid text-center text-light mt-2 p-1 ">
        {loading ? (
          <div className="container-fluid bg-primary text-light text-center">
            Loading....
          </div>
        ) : (
          <div className="container-fluid border rounded bg-dark text-white">
            <div
              className="container bg-light text-center border border-2 border-danger"
              style={{ height: 300 }}
            >
              <Line options={options} data={data} />
            </div>
            {levelSensors === null
              ? "check Connection"
              : levelSensors.map((levelSensor) =>
                  DieselLevelSensor(
                    levelSensor.Name,
                    levelSensor.Volume.toFixed(0),
                    levelSensor.LastUpdate
                  )
                )}{" "}
            {generators === null
              ? "check Connection"
              : generators.map((g) =>
                  GeneratorChart(
                    g.Name,
                    g.L1A.toFixed(0),
                    g.L2A.toFixed(0),
                    g.L3A.toFixed(0),
                    g.L1V.toFixed(0),
                    g.L2V.toFixed(0),
                    g.L3V.toFixed(0),
                    g.LastUpdate
                  )
                )}{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

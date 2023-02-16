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
  responsive: true,
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

  function DieselLevelSensor(name, currentLevel, lastUpdate) {
    return (
      <div className="container border rounded mt-2 p-1">
        <h4 className="text-light m-3 p-3">{name}</h4>
        <div className="container text-light">
          <p>
            <b>{"Last Update : "} </b>
            {lastUpdate.toLocaleDateString()} {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="container bg-light text-center border border-2 border-danger">
              <Line options={options} data={data} />
            </div>
          </div>
          <div className="col-md-6">
            <ReactSpeedometer
              width={300}
              maxValue={10000}
              value={currentLevel}
              needleColor="blue"
              startColor="red"
              segments={10}
              endColor="green"
              textColor={"#AAA"}
            />
          </div>
        </div>
      </div>
    );
  }

  function GeneratorChart(
    Name,
    l1a,
    l2a,
    l3a,
    l1v,
    l2v,
    l3v,
    lastUpdate,
    freq,
    powerFactor
  ) {
    return (
      <div className="container-fluid mt-2 border rounded mb-2 mt-2">
        {/* ampere levels */}
        <div className="row p-3  d-flex justify-content-center">
          <div className="container text-light">
            <h5>{Name}</h5>
          </div>
          <div className="container text-light">
            <p>
              <b>{"Last Update : "} </b>
              {lastUpdate.toLocaleDateString()}{" "}
              {lastUpdate.toLocaleTimeString()}
            </p>
          </div>

          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12   text-center">
            <div className="container p-2">L1A Gauge</div>
            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={l1a}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12   text-center">
            <div className="container p-2">L2A Gauge</div>
            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={l2a}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12  text-center">
            <div className="container p-2">L3A Gauge</div>
            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={l3a}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
            />
          </div>
        </div>

        {/* voltage levels */}
        <div className="row   d-flex justify-content-center">
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12  text-center">
            <div className="container p-2">L1V Gauge</div>
            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={l1v}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12  text-center">
            <div className="container p-2">L2V Gauge</div>

            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={l2v}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12  text-center">
            <div className="container p-2">L3V Gauge</div>

            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={l3v}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import { useEffect, useState } from "react";
import Warehouse from "../node_modules/esiur/src/Resource/Warehouse";
import GaugeChart from "react-gauge-chart";
import ReactSpeedometer from "react-d3-speedometer";

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

      if (connection !== null || connection !== undefined) {
        setGenerators(connection.Generators);
        setLevelSensors(connection.LevelSensors);

        connection.Generators[2].on(":L1A", () => {
          setGenerators(connection.Generators);
          console.log("modified");
        });

        setLoading(false);
      }
    } catch (e) {
      // alert(e);
      console.log(e);
      setLoading(false);
    }
  }

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
            {levelSensors.map((levelSensor) =>
              DieselLevelSensor(
                levelSensor.Name,
                levelSensor.Volume.toFixed(0),
                levelSensor.LastUpdate
              )
            )}{" "}
            {generators.map((g) =>
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

          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 p-4 text-center">
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
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 p-4 text-center">
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
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 p-4 text-center">
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
        <div className="row p-3 d-flex justify-content-center">
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 p-4 text-center">
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
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 p-4 text-center">
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
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 p-4 text-center">
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

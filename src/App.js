import { useEffect, useState } from "react";
import Warehouse from "../node_modules/esiur/src/Resource/Warehouse";
import GaugeChart from "react-gauge-chart";
import ReactSpeedometer from "react-d3-speedometer";

function App() {
  const [isCalled, setIsCalled] = useState(false);

  const [items, setItems] = useState();
  const [loading, setLoading] = useState(false);

  const [Generator0L1A, setGenerator0L1A] = useState(0);
  const [Generator0L2A, setGenerator0L2A] = useState(0);
  const [Generator0L3A, setGenerator0L3A] = useState(0);
  const [Generator0L1V, setGenerator0L1V] = useState(0);
  const [Generator0L2V, setGenerator0L2V] = useState(0);
  const [Generator0L3V, setGenerator0L3V] = useState(0);

  const [Generator1L1A, setGenerator1L1A] = useState(0);
  const [Generator1L2A, setGenerator1L2A] = useState(0);
  const [Generator1L3A, setGenerator1L3A] = useState(0);
  const [Generator1L1V, setGenerator1L1V] = useState(0);
  const [Generator1L2V, setGenerator1L2V] = useState(0);
  const [Generator1L3V, setGenerator1L3V] = useState(0);

  const [Generator2L1A, setGenerator2L1A] = useState(0);
  const [Generator2L2A, setGenerator2L2A] = useState(0);
  const [Generator2L3A, setGenerator2L3A] = useState(0);
  const [Generator2L1V, setGenerator2L1V] = useState(0);
  const [Generator2L2V, setGenerator2L2V] = useState(0);
  const [Generator2L3V, setGenerator2L3V] = useState(0);

  const [generators, setGenerators] = useState(null);
  const [levelSensors, setLevelSensors] = useState(null);

  const [lastUpdateDieselLevel, setLastUpdateDieselLevel] = useState("");

  const [LevelSensor, setLevelSensor] = useState(0);

  async function connectToEsiur() {
    try {
      setLoading(true);
      let connection = await Warehouse.get(
        "iip://phase.delta.iq:40401/sys/service",
        { autoReconnect: true, reconnect: true }
      );

      setLoading(false);

      if (connection !== null || connection !== undefined) {
        setItems(connection.Items);

        setGenerators(connection.Generators);
        setLevelSensors(connection.LevelSensors);

        console.log(generators);
        console.log(levelSensors);

        connection.Generators[2].on(":L1A", () => {
          setGenerators(connection.Generators);
          console.log("modified");
        });
      }

      // if (service === null || service === undefined) return;

      // if (connection !== null || connection !== undefined) {
      //   setServ(connection.Items);

      //   connection.Items[3].on(":LastUpdate", () => {
      //     // console.log(connection.Items[3].LastUpdate);
      //     console.log(ser[3].LastUpdate.toLocaleDateString());
      //     console.log(ser[3].LastUpdate.toLocaleTimeString("en-US"));
      //   });
      // }

      // console.log(service);
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
        {items === undefined ? (
          <div className="container-fluid bg-primary text-light text-center">
            Loading....
          </div>
        ) : (
          <div className="container-fluid border rounded bg-dark text-white">
            {levelSensors.map((levelSensor) =>
              DieselLevelSensor(
                levelSensor.Name,
                levelSensor.Volume,
                levelSensor.LastUpdate
              )
            )}{" "}
            {generators.map((g) =>
              GeneratorChart(
                g.Name,
                g.L1A,
                g.L2A,
                g.L3A,
                g.L1V,
                g.L2V,
                g.L3V,
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

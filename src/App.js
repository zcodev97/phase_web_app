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

        console.log(items);

        setGenerator0L1A(connection.Generators[0].L1A.toFixed(0));
        setGenerator0L2A(connection.Generators[0].L2A.toFixed(0));
        setGenerator0L3A(connection.Generators[0].L3A.toFixed(0));
        setGenerator1L1A(connection.Generators[1].L1A.toFixed(0));
        setGenerator1L2A(connection.Generators[1].L2A.toFixed(0));
        setGenerator1L3A(connection.Generators[1].L3A.toFixed(0));
        setGenerator2L1A(connection.Generators[2].L1A.toFixed(0));
        setGenerator2L2A(connection.Generators[2].L2A.toFixed(0));
        setGenerator2L3A(connection.Generators[2].L3A.toFixed(0));
        setGenerator0L1V(connection.Generators[0].L1V.toFixed(0));
        setGenerator0L2V(connection.Generators[0].L2V.toFixed(0));
        setGenerator0L3V(connection.Generators[0].L3V.toFixed(0));
        setGenerator1L1V(connection.Generators[1].L1V.toFixed(0));
        setGenerator1L2V(connection.Generators[1].L2V.toFixed(0));
        setGenerator1L3V(connection.Generators[1].L3V.toFixed(0));
        setGenerator2L1V(connection.Generators[2].L1V.toFixed(0));
        setGenerator2L2V(connection.Generators[2].L2V.toFixed(0));
        setGenerator2L3V(connection.Generators[2].L3V.toFixed(0));

        setLevelSensor(connection.LevelSensors[0].Volume.toFixed(0));
        setLastUpdateDieselLevel(
          connection.LevelSensors[0].LastUpdate.toString()
        );

        connection.Generators[2].on(":L1A", () => {
          setGenerator0L1A(connection.Generators[0].L1A.toFixed(0));
          setGenerator0L2A(connection.Generators[0].L2A.toFixed(0));
          setGenerator0L3A(connection.Generators[0].L3A.toFixed(0));
          setGenerator1L1A(connection.Generators[1].L1A.toFixed(0));
          setGenerator1L2A(connection.Generators[1].L2A.toFixed(0));
          setGenerator1L3A(connection.Generators[1].L3A.toFixed(0));
          setGenerator2L1A(connection.Generators[2].L1A.toFixed(0));
          setGenerator2L2A(connection.Generators[2].L2A.toFixed(0));
          setGenerator2L3A(connection.Generators[2].L3A.toFixed(0));
          setGenerator0L1V(connection.Generators[0].L1V.toFixed(0));
          setGenerator0L2V(connection.Generators[0].L2V.toFixed(0));
          setGenerator0L3V(connection.Generators[0].L3V.toFixed(0));
          setGenerator1L1V(connection.Generators[1].L1V.toFixed(0));
          setGenerator1L2V(connection.Generators[1].L2V.toFixed(0));
          setGenerator1L3V(connection.Generators[1].L3V.toFixed(0));
          setGenerator2L1V(connection.Generators[2].L1V.toFixed(0));
          setGenerator2L2V(connection.Generators[2].L2V.toFixed(0));
          setGenerator2L3V(connection.Generators[2].L3V.toFixed(0));

          setLevelSensor(connection.LevelSensors[0].Volume.toFixed(0));
          setLastUpdateDieselLevel(
            connection.LevelSensors[0].LastUpdate.toString()
          );

          // console.log("modified");
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
            <ul>
              {" "}
              {items.map((element) => (
                <li> {element.Name}</li>
              ))}{" "}
            </ul>
            {/* {DieselLevelSensor()}
            {Generator0Charts()}
            {Generator1Charts()}
            {Generator2Charts()} */}
          </div>
        )}
      </div>
    </div>
  );

  function DieselLevelSensor() {
    return (
      <div className="container border rounded mt-2 p-1">
        <h4 className="text-light m-3 p-3">
          {items === null ? "Loading" : items[1].Name}
        </h4>
        <h4 className="text-light m-3 p-3">{lastUpdateDieselLevel ?? "ss"}</h4>
        <ReactSpeedometer
          width={300}
          maxValue={10000}
          value={items === null ? 0 : LevelSensor}
          needleColor="blue"
          startColor="red"
          segments={10}
          endColor="green"
          textColor={"#AAA"}
        />
      </div>
    );
  }

  function Generator2Charts() {
    return (
      <div className="container-fluid mt-2 border rounded">
        <div className="row p-3">
          <div className="container text-light">
            <h4>{items === null ? "Loading" : items[0].Name}</h4>
          </div>
          <div className="col-md-4 p-4">
            <div className="container p-2">L1A Gauge</div>

            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator2L1A}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
            />
          </div>
          <div className="col-md-4 p-4">
            <div className="container p-2">L2A Gauge</div>

            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator2L2A}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
            />
          </div>
          <div className="col-md-4 p-4">
            <div className="container p-2">L3A Gauge</div>

            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator2L3A}
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
              value={Generator2L1V}
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
              value={Generator2L2V}
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
              value={Generator2L3V}
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
  function Generator1Charts() {
    return (
      <div className="container-fluid mt-2  border rounded">
        <div className="row p-3 ">
          <div className="container text-light">
            <h4>{items === null ? "Loading" : items[2].Name}</h4>
          </div>
          <div className="col-md-4  p-4">
            <div className="container p-2">L1A Gauge</div>

            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator1L1A}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
            />
          </div>
          <div className="col-md-4  p-4">
            <div className="container p-2">L2A Gauge</div>

            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator1L2A}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
            />
          </div>
          <div className="col-md-4  p-4">
            <div className="container p-2">L3A Gauge</div>

            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator1L3A}
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
              value={Generator1L1V}
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
              value={Generator1L2V}
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
              value={Generator1L3V}
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
  function Generator0Charts() {
    return (
      <div className="container-fluid mt-2 border rounded mb-2 mt-2">
        {/* ampere levels */}
        <div className="row p-3  d-flex justify-content-center">
          <div className="container text-light">
            <h4>{items === null ? "Loading" : items[3].Name}</h4>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 p-4 text-center">
            <div className="container p-2">L1A Gauge</div>
            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator0L1A}
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
              value={Generator0L2A}
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
              value={Generator0L3A}
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
              value={Generator0L1V}
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
              value={Generator0L2V}
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
              value={Generator0L3V}
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

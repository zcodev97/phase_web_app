import { useEffect, useState } from "react";
import Warehouse from "../node_modules/esiur/src/Resource/Warehouse";
import GaugeChart from "react-gauge-chart";
import ReactSpeedometer from "react-d3-speedometer";

function App() {
  const [isCalled, setIsCalled] = useState(false);

  const [service, setService] = useState();
  const [loading, setLoading] = useState(false);

  const [Generator0L1A, setGenerator0L1A] = useState(0);
  const [Generator0L2A, setGenerator0L2A] = useState(0);
  const [Generator0L3A, setGenerator0L3A] = useState(0);
  const [Generator1L1V, setGenerator1L1V] = useState(0);
  const [Generator1L2V, setGenerator1L2V] = useState(0);
  const [Generator1L3V, setGenerator1L3V] = useState(0);

  const [Generator1L1A, setGenerator1L1A] = useState(0);
  const [Generator1L2A, setGenerator1L2A] = useState(0);
  const [Generator1L3A, setGenerator1L3A] = useState(0);
  const [Generator2L1V, setGenerator2L1V] = useState(0);
  const [Generator2L2V, setGenerator2L2V] = useState(0);
  const [Generator2L3V, setGenerator2L3V] = useState(0);

  const [Generator2L1A, setGenerator2L1A] = useState(0);
  const [Generator2L2A, setGenerator2L2A] = useState(0);
  const [Generator2L3A, setGenerator2L3A] = useState(0);
  const [Generator3L1V, setGenerator3L1V] = useState(0);
  const [Generator3L2V, setGenerator3L2V] = useState(0);
  const [Generator3L3V, setGenerator3L3V] = useState(0);

  const [LevelSensor, setLevelSensor] = useState(0);

  async function connectToEsiur() {
    console.log("loading.");
    try {
      setLoading(true);
      let connection = await Warehouse.get(
        "iip://phase.delta.iq:40401/sys/service",
        { autoReconnect: true, reconnect: true }
      );

      setService(connection);

      setLoading(false);

      if (connection === null || connection === undefined) return;

      service.Generators[2].on(":L1A", () => {
        setGenerator0L1A(service.Generators[0].L1A.toFixed(0));
        setGenerator0L2A(service.Generators[0].L2A.toFixed(0));
        setGenerator0L3A(service.Generators[0].L3A.toFixed(0));
        setGenerator1L1A(service.Generators[1].L1A.toFixed(0));
        setGenerator1L2A(service.Generators[1].L2A.toFixed(0));
        setGenerator1L3A(service.Generators[1].L3A.toFixed(0));
        setGenerator2L1A(service.Generators[2].L1A.toFixed(0));
        setGenerator2L2A(service.Generators[2].L2A.toFixed(0));
        setGenerator2L3A(service.Generators[2].L3A.toFixed(0));

        setLevelSensor(service.LevelSensors[0].Volume.toFixed(0));

        console.log("modified");
      });

      setGenerator0L1A(service.Generators[0].L1A.toFixed(0));
      setGenerator0L2A(service.Generators[0].L2A.toFixed(0));
      setGenerator0L3A(service.Generators[0].L3A.toFixed(0));
      setGenerator1L1A(service.Generators[1].L1A.toFixed(0));
      setGenerator1L2A(service.Generators[1].L2A.toFixed(0));
      setGenerator1L3A(service.Generators[1].L3A.toFixed(0));
      setGenerator2L1A(service.Generators[2].L1A.toFixed(0));
      setGenerator2L2A(service.Generators[2].L2A.toFixed(0));
      setGenerator2L3A(service.Generators[2].L3A.toFixed(0));

      setLevelSensor(service.LevelSensors[0].Volume.toFixed(0));

      console.log(service);
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
        {service === undefined ? (
          <div className="container-fluid bg-primary text-light text-center">
            Loading....
          </div>
        ) : (
          <div className="container-fluid border rounded bg-dark text-white">
            {DieselLevelSensor()}
            {Generator2Charts()}
            {Generator1Charts()}
            {Generator0Charts()}
          </div>

          // service.Generators.map((item) => (
          //   <ul key={item.id}>
          //     <div className="container bg-light rounded p-3">
          //       <h3> {item.Name} </h3>
          //       <div className="row ">
          //         <div className="col-md-6">
          //           <div className="container btn btn-success">Reports</div>
          //         </div>

          //       </div>
          //     </div>
          //   </ul>
          // ))
        )}
      </div>
    </div>
  );

  function DieselLevelSensor() {
    return (
      <div className="container border rounded mt-2 p-1">
        <h4 className="text-light m-3 p-3">
          {service === null ? "Loading" : service.LevelSensors[0].Name}
        </h4>
        <ReactSpeedometer
          width={300}
          maxValue={10000}
          value={service === null ? 0 : LevelSensor}
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
      <div className="container-fluid mt-2">
        <div className="row p-3 border rounded ">
          <div className="container text-light">
            <h4>{service === null ? "Loading" : service.Generators[2].Name}</h4>
          </div>
          <div className="col-md-4 p-4">
            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator2L1A}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
              currentValueText={`L1A : ${Generator0L2A}`}
            />
          </div>
          <div className="col-md-4 p-4">
            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator2L2A}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
              currentValueText={`L2A : ${Generator0L2A}`}
            />
          </div>
          <div className="col-md-4 p-4">
            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator2L3A}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
              currentValueText={`L3A : ${Generator0L2A}`}
            />
          </div>
        </div>
      </div>
    );
  }
  function Generator1Charts() {
    return (
      <div className="container-fluid mt-2 ">
        <div className="row p-3 border rounded">
          <div className="container text-light">
            <h4>{service === null ? "Loading" : service.Generators[1].Name}</h4>
          </div>
          <div className="col-md-4  p-4">
            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator1L1A}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
              currentValueText={`L1A : ${Generator0L2A}`}
            />
          </div>
          <div className="col-md-4  p-4">
            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator1L2A}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
              currentValueText={`L2A : ${Generator0L2A}`}
            />
          </div>
          <div className="col-md-4  p-4">
            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator1L3A}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
              currentValueText={`L3A : ${Generator0L2A}`}
            />
          </div>
        </div>
      </div>
    );
  }
  function Generator0Charts() {
    return (
      <div className="container-fluid mt-2">
        <div className="row p-3 border rounded d-flex justify-content-center">
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 p-4 text-center">
            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator0L1A}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
              currentValueText={`L1A : ${Generator0L2A}`}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 p-4 text-center">
            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator0L2A}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
              currentValueText={`L2A : ${Generator0L2A}`}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 p-4 text-center">
            <ReactSpeedometer
              width={300}
              maxValue={500}
              value={Generator0L3A}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
              textColor={"#AAA"}
              currentValueText={`L3A : ${Generator0L2A}`}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

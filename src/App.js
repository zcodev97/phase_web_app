import { useEffect, useState } from "react";
import Warehouse from "../node_modules/esiur/src/Resource/Warehouse";
import GaugeChart from "react-gauge-chart";
import ReactSpeedometer from "react-d3-speedometer";

import GeneratorChart from "./components/generatorChart";
import DieselLevelSensor from "./components/dieselLevelSensorChart";
import DateTimePicker from "react-datetime-picker";

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
  const [value, onChange] = useState(new Date());

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
          <div className="container-fluid border rounded bg-dark text-light">
            <div className="container bg-light text-dark p-2 mt-2 mb-2 rounded">
              Start{" "}
              <DateTimePicker
                onChange={onChange}
                value={value}
                disableClock={true}
                format="y-MM-dd h:mm:ss a"
                clearIcon={null}
              />{" "}
              End{" "}
              <DateTimePicker
                onChange={onChange}
                value={value}
                disableClock={true}
                format="y-MM-dd h:mm:ss a"
                clearIcon={null}
              />
            </div>
            {levelSensors === null
              ? "check Connection"
              : levelSensors.map((levelSensor) =>
                  DieselLevelSensor(
                    levelSensor.Name,
                    levelSensor.Volume.toFixed(0),
                    levelSensor.LastUpdate
                  )
                )}
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

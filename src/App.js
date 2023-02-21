import { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import ReactSpeedometer from "react-d3-speedometer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GeneratorChart from "./components/generatorChart";
import DieselLevelSensor from "./components/dieselLevelSensorChart";
import DateTimePicker from "react-datetime-picker";
import GeneratorsPage from "./pages/Generators";
import LevelSensorsPage from "./pages/LevelSensors";
import ReportsPage from "./pages/Reports";
import Footer from "./components/footer";
import Warehouse from "../node_modules/esiur/src/Resource/Warehouse";

window.connection = null;

async function connectToEsiur() {
  try {
    let esiurConnection = await Warehouse.get(
      "iip://phase.delta.iq:40401/sys/service",
      { autoReconnect: true, reconnect: true }
    );

    return esiurConnection;
  } catch (e) {
    // alert(e);
    console.log(e);
    return e;
  }
}

function App() {
  // const [connection, setConnection] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    connectToEsiur().then((connection) => {
      window.connection = connection;
      // console.log(connection);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <div className="container-fluid text-center text-light mt-2 p-1 ">
        {loading ? (
          <div
            className="container-fluid bg-dark text-light rounded"
            style={{ height: "100vh" }}
          >
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-12">Loading...</div>
            </div>
          </div>
        ) : (
          <div className="container-fluid" style={{ height: "100vh" }}>
            <BrowserRouter>
              <Routes>
                {/* <Route path="/" element={<GeneratorsPage />} /> */}
                <Route path="/" element={<GeneratorsPage />} />
                <Route path="/generators" element={<GeneratorsPage />} />
                <Route path="/level_sensors" element={<LevelSensorsPage />} />
                <Route path="/reports" element={<ReportsPage />} />s
              </Routes>
            </BrowserRouter>

            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

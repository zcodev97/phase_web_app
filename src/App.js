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

function App() {
  const [connection, setConnection] = useState(false);

  return (
    <div className="App">
      <div className="container-fluid text-center text-light mt-2 p-1 ">
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
      </div>
    </div>
  );
}

export default App;

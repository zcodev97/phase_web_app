import { useEffect, useState } from "react";
import DieselLevelSensor from "../components/dieselLevelSensorChart";
import NavBar from "../components/navBar";
import Warehouse from "../../node_modules/esiur/src/Resource/Warehouse";
import Loading from "../components/loading";

function LevelSensorsPage() {
  const [levelSensors, setLevelSensors] = useState(null);
  const [loading, setLoading] = useState(false);

  async function connectToEsiur() {
    try {
      setLoading(true);

      setLevelSensors(window.connection.LevelSensors);

      window.connection.LevelSensors[0].on(":LastUpdate", () => {
        setLevelSensors(window.connection.LevelSensors);
        // console.log("modified");
      });
    } catch (e) {
      // alert(e);
      console.log(e);
      setLoading(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    connectToEsiur();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container border-bottom border-primary rounded border-3 text-dark mt-3">
        <h5>Level Sensors</h5>
      </div>
      {levelSensors === null ? (
        <Loading />
      ) : (
        levelSensors.map((levelSensor) =>
          DieselLevelSensor(
            levelSensor.Name,
            levelSensor.Volume.toFixed(0),
            levelSensor.LastUpdate
          )
        )
      )}
    </>
  );
}

export default LevelSensorsPage;

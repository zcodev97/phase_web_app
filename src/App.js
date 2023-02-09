import { useEffect, useState } from "react";
import Warehouse from "../node_modules/esiur/src/Resource/Warehouse";
import GaugeChart from "react-gauge-chart";

function App() {
  const [isCalled, setIsCalled] = useState(false);

  const [service, setService] = useState();
  const [loading, setLoading] = useState(false);

  async function connectToEsiur() {
    console.log("loading.");
    try {
      setLoading(true);
      let connection = await Warehouse.get(
        "iip://phase.delta.iq:40401/sys/service"
      );

      setService(connection);

      setLoading(false);

      service.Generators[2].on(":L1A", () => {
        console.log("modified");
      });

      console.log(service);
    } catch (e) {
      // alert(e);
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
          service.Generators.map((item) => (
            <ul key={item.id}>
              <div className="container bg-dark rounded p-3">
                <h3> {item.Name} </h3>
                <div className="row ">
                  <div className="col-md-6">
                    <div className="container btn btn-success">Reports</div>
                  </div>
                  <GaugeChart id="gauge-chart2" percent={item.L1AMax} />
                </div>
              </div>
            </ul>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

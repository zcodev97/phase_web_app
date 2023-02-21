import { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import { useLocation } from "react-router-dom";
import Warehouse from "../../node_modules/esiur/src/Resource/Warehouse";
import GeneratorChart from "../components/generatorChart";
import Loading from "../components/loading";

function GeneratorsPage() {
  const location = useLocation();
  const [generators, setGenerators] = useState(null);
  const [loading, setLoading] = useState(false);

  async function connectToEsiur() {
    try {
      setLoading(true);
      let esiurConnection = await Warehouse.get(
        "iip://phase.delta.iq:40401/sys/service",
        { autoReconnect: true, reconnect: true }
      );

      setGenerators(esiurConnection.Generators);

      esiurConnection.Generators[2].on(":L1A", () => {
        setGenerators(esiurConnection.Generators);
        // console.log("modified");
      });

      console.log(esiurConnection);
    } catch (e) {
      // alert(e);
      console.log(e);
      setLoading(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    // connectToEsiur();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container border-bottom border-primary rounded border-3 text-dark mt-3">
        <h5>Generators</h5>
      </div>
      {generators === null ? (
        <Loading />
      ) : (
        generators.map((g) =>
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
        )
      )}
    </>
  );
}

export default GeneratorsPage;

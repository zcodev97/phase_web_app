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

      setGenerators(window.connection.Generators);

      window.connection.Generators[0].on(":LastUpdate", () => {
        setGenerators(window.connection.Generators);
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

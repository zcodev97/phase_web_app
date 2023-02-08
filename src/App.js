import { useEffect, useState } from "react";
import Warehouse from "../node_modules/esiur/src/Resource/Warehouse";

function App() {
  const [isCalled, setIsCalled] = useState(false);

  async function connectToEsiur() {
    try {
      var x = await Warehouse.get("iip://phase.delta.iq:40401/sys/service");

      console.log(x);
    } catch (e) {}
  }

  useEffect(() => {
    connectToEsiur();
  }, []);

  return (
    <div className="App">
      <div className="container btn btn-dark text-light ">test</div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import ReactSelect from "react-select";
import NavBar from "../components/navBar";
import Warehouse from "../../node_modules/esiur/src/Resource/Warehouse";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function ReportsPage() {
  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const [dropDownItems, setDropDownItems] = useState(null);

  let items = [];

  async function connectToEsiur() {
    try {
      setLoading(true);
      let esiurConnection = await Warehouse.get(
        "iip://phase.delta.iq:40401/sys/service",
        { autoReconnect: true, reconnect: true }
      );

      esiurConnection.Items.forEach((e) => {
        items.push({
          value: e.Name,
          label: e.Name,
        });
      });

      setDropDownItems(items);
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
        <h5>Reports</h5>
      </div>
      <div className="row  d-flex justify-content-center align-items-center">
        <div className="col-md-3">
          <div className="container mt-2 mb-2 p-2 text-dark  border border-2  rounded">
            Start{" "}
            <DateTimePicker
              onChange={setFirstDate}
              value={firstDate}
              disableClock={true}
              format="y-MM-dd h:mm:ss a"
              clearIcon={null}
            />{" "}
          </div>
        </div>
        <div className="col-md-3">
          <div className="container mt-2 mb-2 p-2 text-dark  border border-2  rounded">
            End{" "}
            <DateTimePicker
              onChange={setSecondDate}
              value={secondDate}
              disableClock={true}
              format="y-MM-dd h:mm:ss a"
              clearIcon={null}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="container mt-2 mb-2 p-1 text-dark  border border-2  rounded">
            <ReactSelect
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={dropDownItems}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="container btn mt-2 mb-2 p-1  border border-2 border-primary text-primary  rounded">
            Get Report
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportsPage;

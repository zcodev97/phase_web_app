import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import ReactSelect from "react-select";
import NavBar from "../components/navBar";
import Warehouse from "../../node_modules/esiur/src/Resource/Warehouse";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ReportsPage() {
  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [dropDownItems, setDropDownItems] = useState(null);

  const [Items, setItems] = useState(null);

  const [volume, setVolume] = useState([]);
  const [dateReport, setDateReport] = useState([]);

  let items = [];

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Diesel Level Sensors" },
    },
  };

  const labels = dateReport.length === 0 ? [] : dateReport;
  const data = {
    labels,
    datasets: [
      {
        label: "Volume",
        data: volume.length === 0 ? [] : volume,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Date",
        data: dateReport.length === 0 ? [] : dateReport,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  async function connectToEsiur() {
    try {
      setLoading(true);
      let esiurConnection = await Warehouse.get(
        "iip://phase.delta.iq:40401/sys/service",
        { autoReconnect: true, reconnect: true }
      );

      setItems(esiurConnection.Items);

      if (items.length === 0) {
        esiurConnection.Items.forEach((e) => {
          items.push({
            value: e.ModbusId,
            label: e.Name,
          });
        });
      }

      setDropDownItems(items);

      // console.log(items);
    } catch (e) {
      // alert(e);
      console.log(e);
      setLoading(false);
    }
    setLoading(false);
  }

  async function GetReport() {
    // console.log(selectedItem);

    const item = Items.find((h) => h.ModbusId === selectedItem);
    console.log(item);

    let result = await item.GetRecords(firstDate, secondDate, 0, 50);

    // console.log(result);

    let dates = result.map(
      (item) =>
        new Date(item.Time).toLocaleDateString() +
        " " +
        new Date(item.Time).toLocaleTimeString()
    );

    setDateReport(dates);

    let TextVolumes = result.map((item) => item.Volume.toFixed(0));

    // // Convert the data to an array of numbers
    // const volumes = TextVolumes.map(Number);

    // // Calculate the mean and standard deviation of the data
    // const mean = volumes.reduce((acc, val) => acc + val, 0) / volumes.length;
    // const sd = Math.sqrt(
    //   volumes.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
    //     volumes.length
    // );

    // // Filter out values that have a Z-score greater than 3 (i.e. 3 standard deviations from the mean)
    // const filteredData = volumes.filter(
    //   (val) => Math.abs((val - mean) / sd) <= 3
    // );

    let myData = filterMyData(result);

    console.log(myData);
    setVolume(myData);

    // console.log(volumes);
    // console.log(filteredData);
  }

  function filterMyData(results) {
    let rt = [];
    for (var i = 0; i < results.length - 1; i++) {
      rt.push(
        Math.abs(Number(results[i].Volume) - Number(results[i + 1].Volume)) /
          (Math.abs(results[i].Time - results[i + 1].Time) / 1000)
      );
    }

    return rt;
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
              defaultValue={selectedItem}
              onChange={(opt) => setSelectedItem(opt.value)}
              options={dropDownItems}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="container btn mt-2 mb-2 p-1  border border-2 border-primary text-primary  rounded"
            onClick={GetReport}
          >
            Get Report
          </div>
        </div>
      </div>

      <div
        className="container bg-light text-center border border-2 border-danger"
        style={{ height: 300 }}
      >
        <Line options={options} data={data} />
      </div>
    </>
  );
}

export default ReportsPage;

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
  const [connection, setConnection] = useState(window.connection);

  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [dropDownItems, setDropDownItems] = useState(null);

  const [Items, setItems] = useState();
  const [generatorData, setGeneratorData] = useState([]);

  const [phase1Currents, setPhase1Currents] = useState([]);
  const [phase2Currents, setPhase2Currents] = useState([]);
  const [phase3Currents, setPhase3Currents] = useState([]);
  const [phase1Voltages, setPhase1Voltages] = useState([]);
  const [phase2Voltages, setPhase2Voltages] = useState([]);
  const [phase3Voltages, setPhase3Voltages] = useState([]);

  const [volume1, setVolume1] = useState([]);
  const [volume2, setVolume2] = useState([]);
  const [dateReport, setDateReport] = useState([]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Chart Report" },
    },
  };

  const labels = dateReport.length === 0 ? [] : dateReport;
  const data = {
    labels,
    datasets: [
      {
        label: "Correct Volume",
        data: volume1.length === 0 ? [] : volume1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Error Volume",
        data: volume2.length === 0 ? [] : volume2,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Date",
        data: dateReport.length === 0 ? [] : dateReport,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const generatorDataChart = {
    labels,
    datasets: [
      {
        label: "Phase 1 Current",
        data: phase1Currents.length === 0 ? [] : phase1Currents,
        borderColor: "rgb(51, 204, 51)",
        backgroundColor: "rgb(51, 204, 51)",
      },
      {
        label: "Phase 2 Current",
        data: phase2Currents.length === 0 ? [] : phase2Currents,
        borderColor: "rgb(255, 204, 102)",
        backgroundColor: "rgb(255, 204, 102)",
      },
      {
        label: "Phase 3 Current",
        data: phase3Currents.length === 0 ? [] : phase3Currents,
        borderColor: "rgb(51, 153, 255)",
        backgroundColor: "rgb(51, 153, 255)",
      },

      {
        label: "Phase 1 Voltage",
        data: phase1Voltages.length === 0 ? [] : phase1Voltages,
        borderColor: "rgb(153, 0, 0)",
        backgroundColor: "rgb(153, 0, 0)",
      },

      {
        label: "Phase 2 Voltage",
        data: phase2Voltages.length === 0 ? [] : phase2Voltages,
        borderColor: "rgb(153, 0, 153)",
        backgroundColor: "rgb(153, 0, 153)",
      },

      {
        label: "Phase 3 Voltage",
        data: phase3Voltages.length === 0 ? [] : phase3Voltages,
        borderColor: "rgb(51, 51, 0)",
        backgroundColor: "rgb(51, 51, 0)",
      },
      // {
      //   label: "Date",
      //   data: dateReport.length === 0 ? [] : dateReport,
      //   borderColor: "rgb(53, 222, 235)",
      //   backgroundColor: "rgba(53, 100, 235, 0.5)",
      // },
    ],
  };

  function setDropdownItems() {
    let items = [];

    if (items.length === 0) {
      connection.Items.forEach((e) => {
        items.push({
          value: e.ModbusId,
          label: e.Name,
        });
      });
    }
    setItems(connection.Items);
    setDropDownItems(items);
  }

  async function GetReport() {
    setLoading(true);
    const item = Items.find((h) => h.ModbusId === selectedItem);

    try {
      let result = await item.GetRecords(firstDate, secondDate, 0, 999);

      // data for testing report 2023-02-01 1 AM to 2023-02-01 2 AM Mini Generator
      //check the selected item if its a generator or diesel level sensor
      if (result[0]?.Type?.name === "ThreePhase") {
        let phase1CurrentsRawData = Object.values(result).map((e) =>
          e.Phase1Current.toFixed(0)
        );
        let phase2CurrentsRawData = Object.values(result).map((e) =>
          e.Phase2Current.toFixed(0)
        );
        let phase3CurrentsRawData = Object.values(result).map((e) =>
          e.Phase3Current.toFixed(0)
        );
        let phase1VoltageRawData = Object.values(result).map((e) =>
          e.Phase1Voltage.toFixed(0)
        );
        let phase2VoltageRawData = Object.values(result).map((e) =>
          e.Phase2Voltage.toFixed(0)
        );
        let phase3VoltageRawData = Object.values(result).map((e) =>
          e.Phase3Voltage.toFixed(0)
        );
        let time = Object.values(result).map(
          (e) =>
            formatDate(e.Time) +
            " : " +
            new Date(e.Time).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
        );

        setPhase1Currents(phase1CurrentsRawData);
        setPhase2Currents(phase2CurrentsRawData);
        setPhase3Currents(phase3CurrentsRawData);
        setPhase1Voltages(phase1VoltageRawData);
        setPhase2Voltages(phase2VoltageRawData);
        setPhase3Voltages(phase3VoltageRawData);

        setDateReport(time);

        setLoading(false);
      } else {
        // diesel level sensor report
        setVolume2(result.map((x) => x.Volume));
        let datesWithVolume = result.map((item) => {
          let data = {
            volume: Math.floor(item.Volume.toFixed(0)),
            date: new Date(item.Time).toLocaleDateString(),
            time: new Date(item.Time).toLocaleTimeString(),
          };
          return data;
        });
        let volumeData = datesWithVolume.map((x) => Number(x.volume));
        let reportDate = datesWithVolume.map((x) => x.date + " " + x.time);
        let d = [];
        for (let index = 0; index < result.length - 1; index++) {
          let dx =
            (result[index + 1].Volume - result[index].Volume) /
            (result[index + 1].Time - result[index].Time);
          //d.push(dx < 1 ? dx : 0);
          if (dx > 0.001) result[index + 1].Volume = result[index].Volume;
          d.push(result[index].Volume);
          //else d.push(0);
        }
        // console.log(d);
        setVolume1(d);

        setLoading(false);
      }
      // setDateReport(reportDate);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
    setDropdownItems();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container border-bottom border-primary rounded border-3 text-dark mt-3">
        <h5>Reports </h5>
      </div>
      <div className="row  d-flex justify-content-center align-items-center">
        <div className="col-lg-3">
          {DatePickerCompo("Start", setFirstDate, firstDate)}
        </div>
        <div className="col-lg-3">
          {DatePickerCompo("End", setSecondDate, secondDate)}
        </div>
        <div className="col-lg-3">
          {ItemsSelectorCompo(selectedItem, setSelectedItem, dropDownItems)}
        </div>
        <div className="col-lg-3">
          <div
            className="container btn mt-2 mb-2 p-1  border border-2 border-primary text-primary  rounded"
            onClick={GetReport}
          >
            Get Report
          </div>
        </div>
      </div>
      {loading ? (
        <div className="container text-center text-dark">
          <h4>Loading...</h4>
        </div>
      ) : generatorData.length !== 0 ? (
        // GeneratorReportChart()
        <div className="container">test</div>
      ) : (
        <div
          className="container bg-light text-center border border-2 border-danger"
          style={{ height: 300 }}
        >
          <Line options={options} data={generatorDataChart} />
        </div>
      )}
    </>
  );

  function DatePickerCompo(title, onChange, value) {
    return (
      <div className="container mt-2 mb-2 p-2 text-dark  border border-2  rounded">
        {title}{" "}
        <DateTimePicker
          onChange={onChange}
          value={value}
          disableClock={true}
          format="y-MM-dd HH a"
          clearIcon={null}
        />{" "}
      </div>
    );
  }
  function ItemsSelectorCompo(selectedItem, setSelectedItem, dropDownItems) {
    return (
      <div className="container mt-2 mb-2 p-1 text-dark  border border-2  rounded">
        <ReactSelect
          defaultValue={selectedItem}
          onChange={(opt) => setSelectedItem(opt.value)}
          options={dropDownItems}
        />
      </div>
    );
  }

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
}

export default ReportsPage;

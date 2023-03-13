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

  const [generatorReportDetials, setGeneratorReportDetails] = useState({
    frequency: [],
    phase1Current: { values: [], dates: [] },
    phase2Current: { values: [], dates: [] },
    phase3Current: { values: [], dates: [] },
    phase1Voltage: { values: [], dates: [] },
    phase2Voltage: { values: [], dates: [] },
    phase3Voltage: { values: [], dates: [] },
  });

  const [phase1Currents, setPhase1Currents] = useState([]);

  const [volume1, setVolume1] = useState([]);
  const [volume2, setVolume2] = useState([]);
  const [dateReport, setDateReport] = useState([]);

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
        label: "Current",
        data: phase1Currents.length === 0 ? [] : phase1Currents,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Date",
        data: dateReport.length === 0 ? [] : dateReport,
        borderColor: "rgb(53, 222, 235)",
        backgroundColor: "rgba(53, 100, 235, 0.5)",
      },
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

      console.log(result);

      // console.log(result);

      if (result[0]?.Type?.name === "ThreePhase") {
        //generator report
        // setGeneratorReportDetails({
        //   frequency: Object.values(result).map((e) => e.Frequency),
        //   phase1Current: Object.values(result).map((e) => e.Phase1Current),
        //   phase2Current: Object.values(result).map((e) => e.Phase2Current),
        //   phase3Current: Object.values(result).map((e) => e.Phase3Current),
        //   phase1Voltage: Object.values(result).map((e) => e.Phase1Voltage),
        //   phase2Voltage: Object.values(result).map((e) => e.Phase2Voltage),
        //   phase3Voltage: Object.values(result).map((e) => e.Phase3Voltage),
        // });
        let phase1CurrentsData = Object.values(result).map((e) =>
          e.Phase1Current.toFixed(0)
        );
        let phase2Currents = Object.values(result).map((e) => e.Phase2Current);
        let phase3Currents = Object.values(result).map((e) => e.Phase3Current);
        let phase1Voltage = Object.values(result).map((e) => e.Phase1Voltage);
        let phase2Voltage = Object.values(result).map((e) => e.Phase2Voltage);
        let phase3Voltage = Object.values(result).map((e) => e.Phase3Voltage);
        let time = Object.values(result).map(
          (e) =>
            new Date(e.Time).toLocaleDateString("en-US") +
            "-" +
            new Date(e.Time).toLocaleString("en-US", {
              hour: "numeric",
              hour12: true,
            })
        );

        console.log(phase1CurrentsData);

        setPhase1Currents(phase1CurrentsData);
        setDateReport(time);
        // time.forEach((value) => {
        //   console.log(new Date(value).toLocaleDateString("en-US"));
        //   console.log(
        //     new Date(value).toLocaleString("en-US", {
        //       hour: "numeric",
        //       hour12: true,
        //     })
        //   );
        // });

        // let val3 = Object.values(result).map((e) => e.Phase2Current);

        // setGeneratorReportDetails(generatorReportDetials.phase1Current.values);
        // setGeneratorReportDetails(generatorReportDetials.phase2Current.values);
        // setGeneratorReportDetails(generatorReportDetials.phase2Current.values);
        // setGeneratorReportDetails(generatorReportDetials.phase1Current.values);
        // setGeneratorReportDetails(generatorReportDetials.phase1Current.values);
        // setGeneratorReportDetails(generatorReportDetials.phase1Current.values);

        // setTimeout(() => {}, 2000);

        // console.log(generatorReportDetials);

        // console.log(generatorData);

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

  // function GeneratorReportChart() {
  //   setPhase1Current(result.map((x) => x.Phase1Current));
  //   let phase2Current = generatorData.map((g) => {
  //     return g.Phase2Current;
  //   });
  //   let phase3Current = generatorData.map((g) => {
  //     return g.Phase2Current;
  //   });
  //   let phase1Voltage = generatorData.map((g) => {
  //     return g.Phase1Voltage;
  //   });
  //   let phase2Voltage = generatorData.map((g) => {
  //     return g.Phase2Voltage;
  //   });
  //   let phase3Voltage = generatorData.map((g) => {
  //     return g.Phase3Voltage;
  //   });

  //   let data = {
  //     labels,
  //     datasets: [
  //       {
  //         label: "Current",
  //         data: phase1Current.length === 0 ? [] : phase1Current,
  //         borderColor: "rgb(53, 162, 235)",
  //         backgroundColor: "rgba(53, 162, 235, 0.5)",
  //       },
  //       {
  //         label: "Date",
  //         data: dateReport.length === 0 ? [] : dateReport,
  //         borderColor: "rgb(53, 162, 235)",
  //         backgroundColor: "rgba(53, 162, 235, 0.5)",
  //       },
  //     ],
  //   };
  //   return (
  //     <div
  //       className="container bg-light text-center border border-2 border-danger"
  //       style={{ height: 300 }}
  //     >
  //       <Line
  //         options={{
  //           maintainAspectRatio: false,
  //           responsive: true,
  //           plugins: {
  //             legend: { position: "top" },
  //             title: { display: true, text: "Generator" },
  //           },
  //         }}
  //         data={data}
  //       />
  //     </div>
  //   );
  // }

  function DatePickerCompo(title, onChange, value) {
    return (
      <div className="container mt-2 mb-2 p-2 text-dark  border border-2  rounded">
        {title}{" "}
        <DateTimePicker
          onChange={onChange}
          value={value}
          disableClock={true}
          format="y-MM-dd"
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
}

export default ReportsPage;

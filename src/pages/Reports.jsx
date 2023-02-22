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
        label: "Volume1",
        data: volume1.length === 0 ? [] : volume1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Volume2",
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
    const item = Items.find((h) => h.ModbusId === selectedItem);

    try {
      let result = await item.GetRecords(firstDate, secondDate, 0, 1000);

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

      console.log(d);
      setVolume1(d);
      setDateReport(reportDate);

      // let sortedData = datesWithVolume.sort((a, b) => a.volume - b.volume);
      // let q1Index = Math.floor(sortedData.length * 0.25);
      // let q3Index = Math.floor(sortedData.length * 0.75);
      // let q1 = Number(sortedData[q1Index].volume);
      // let q3 = Number(sortedData[q3Index].volume);

      // // Calculate the interquartile range (IQR)
      // let iqr = q3 - q1;

      // // Find the lower and upper bounds for outliers
      // let lowerBound = q1 - 1.5 * iqr;
      // let upperBound = q3 + 1.5 * iqr;

      // // Remove any outliers from the data
      // let filteredData = datesWithVolume.filter(
      //   (datum) => datum.volume >= lowerBound && datum.volume <= upperBound
      // );

      // let sortedFilteredData = filteredData.sort((a, b) => {
      //   // Compare the date property
      //   const dateComparison =
      //     new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time);

      //   // If the date is the same, compare the time property
      //   if (dateComparison === 0) {
      //     return new Date(a.time) - new Date(b.time);
      //   }

      //   // Otherwise, use the date comparison
      //   return dateComparison;
      // });

      // let volumeData = sortedFilteredData.map((x) => x.volume);
      // let reportDate = sortedFilteredData.map((x) => x.date + " " + x.time);

      // setVolume(volumeData);
      // setDateReport(reportDate);
      // console.log(sortedFilteredData);

      // console.log(datesWithVolume);
    } catch (error) {
      console.log(error);
    }

    // console.log(result);

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

    // let myData = filterMyData(result);

    // console.log(myData);
    // setVolume(myData);

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
    setDropdownItems();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container border-bottom border-primary rounded border-3 text-dark mt-3">
        <h5>Reports </h5>
      </div>
      <div className="row  d-flex justify-content-center align-items-center">
        <div className="col-md-3">
          {DatePickerCompo("Start", setFirstDate, firstDate)}
        </div>
        <div className="col-md-3">
          {DatePickerCompo("End", setSecondDate, secondDate)}
        </div>
        <div className="col-md-3">
          {ItemsSelectorCompo(selectedItem, setSelectedItem, dropDownItems)}
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

  function DatePickerCompo(title, onChange, value) {
    return (
      <div className="container mt-2 mb-2 p-2 text-dark  border border-2  rounded">
        {title}{" "}
        <DateTimePicker
          onChange={onChange}
          value={value}
          disableClock={true}
          format="y-MM-dd h:mm:ss a"
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

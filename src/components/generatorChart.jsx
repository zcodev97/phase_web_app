import { useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import DateTimePicker from "react-datetime-picker";
import DatePicker from "./datePicker";

function GeneratorChart(
  Name,
  l1a,
  l2a,
  l3a,
  l1v,
  l2v,
  l3v,
  lastUpdate,
  freq,
  powerFactor
) {
  return (
    <div
      className="container-fluid m-0 p-0 bg-dark mt-2 border rounded"
      key={Math.random()}
    >
      {/* ampere levels */}
      <div className="row  d-flex justify-content-center">
        <div className="container p-2 text-light">
          <h5>{Name}</h5>
        </div>
        <div className="container text-light">
          <p>
            <b>{"Last Update : "} </b>
            {lastUpdate.toLocaleDateString()} {lastUpdate.toLocaleTimeString()}
          </p>
        </div>

        <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12   text-center">
          <div className="container ">L1A Gauge</div>
          <ReactSpeedometer
            key={Math.random()}
            width={300}
            maxValue={500}
            value={Number(l1a)}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
            textColor={"#AAA"}
          />
        </div>
        <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12   text-center">
          <div className="container ">L2A Gauge</div>
          <ReactSpeedometer
            key={Math.random()}
            width={300}
            maxValue={500}
            value={Number(l2a)}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
            textColor={"#AAA"}
          />
        </div>
        <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12  text-center">
          <div className="container ">L3A Gauge</div>
          <ReactSpeedometer
            key={Math.random()}
            width={300}
            maxValue={500}
            value={Number(l3a)}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
            textColor={"#AAA"}
          />
        </div>
      </div>
      {/* voltage levels */}
      <div className="row   d-flex justify-content-center">
        <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12  text-center">
          <div className="container">L1V Gauge</div>
          <ReactSpeedometer
            key={Math.random()}
            width={300}
            maxValue={500}
            value={Number(l1v)}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
            textColor={"#AAA"}
          />
        </div>
        <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12  text-center">
          <div className="container">L2V Gauge</div>

          <ReactSpeedometer
            key={Math.random()}
            width={300}
            maxValue={500}
            value={Number(l2v)}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
            textColor={"#AAA"}
          />
        </div>
        <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12  text-center">
          <div className="container">L3V Gauge</div>

          <ReactSpeedometer
            key={Math.random()}
            width={300}
            maxValue={500}
            value={Number(l3v)}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
            textColor={"#AAA"}
          />
        </div>
      </div>
    </div>
  );
}

export default GeneratorChart;

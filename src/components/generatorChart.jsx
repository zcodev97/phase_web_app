import ReactSpeedometer from "react-d3-speedometer";

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
    <div className="container-fluid mt-2 border rounded mb-2 mt-2">
      {/* ampere levels */}
      <div className="row p-3  d-flex justify-content-center">
        <div className="container text-light">
          <h5>{Name}</h5>
        </div>
        <div className="container text-light">
          <p>
            <b>{"Last Update : "} </b>
            {lastUpdate.toLocaleDateString()} {lastUpdate.toLocaleTimeString()}
          </p>
        </div>

        <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12   text-center">
          <div className="container p-2">L1A Gauge</div>
          <ReactSpeedometer
            width={300}
            maxValue={500}
            value={l1a}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
            textColor={"#AAA"}
          />
        </div>
        <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12   text-center">
          <div className="container p-2">L2A Gauge</div>
          <ReactSpeedometer
            width={300}
            maxValue={500}
            value={l2a}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
            textColor={"#AAA"}
          />
        </div>
        <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12  text-center">
          <div className="container p-2">L3A Gauge</div>
          <ReactSpeedometer
            width={300}
            maxValue={500}
            value={l3a}
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
          <div className="container p-2">L1V Gauge</div>
          <ReactSpeedometer
            width={300}
            maxValue={500}
            value={l1v}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
            textColor={"#AAA"}
          />
        </div>
        <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12  text-center">
          <div className="container p-2">L2V Gauge</div>

          <ReactSpeedometer
            width={300}
            maxValue={500}
            value={l2v}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
            textColor={"#AAA"}
          />
        </div>
        <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12  text-center">
          <div className="container p-2">L3V Gauge</div>

          <ReactSpeedometer
            width={300}
            maxValue={500}
            value={l3v}
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

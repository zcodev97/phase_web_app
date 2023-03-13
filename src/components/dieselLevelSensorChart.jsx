import ReactSpeedometer from "react-d3-speedometer";

function DieselLevelSensor(name, currentLevel, lastUpdate) {
  return (
    <div
      className="container bg-dark border rounded mt-2 p-1"
      key={Math.random()}
    >
      <h4 className="text-light m-3 p-3">{name}</h4>
      <div className="container text-light">
        <p>
          <b>{"Last Update : "} </b>
          {lastUpdate.toLocaleDateString()} {lastUpdate.toLocaleTimeString()}
        </p>
      </div>

      <ReactSpeedometer
        key={Math.random()}
        width={300}
        maxValue={10000}
        value={Number(currentLevel)}
        needleColor="blue"
        startColor="red"
        segments={10}
        endColor="green"
        textColor={"#AAA"}
      />
    </div>
  );
}

export default DieselLevelSensor;

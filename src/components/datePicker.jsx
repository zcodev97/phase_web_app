import { useState } from "react";
import DateTimePicker from "react-datetime-picker";

function DatePicker() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="container bg-light text-dark mt-2 mb-2 p-2">
      <DateTimePicker
        onChange={onChange}
        value={value}
        disableClock={true}
        format="y-MM-dd h:mm:ss a"
        clearIcon={null}
      />
    </div>
  );
}

export default DatePicker;

import {  useState  } from "react";
import {  TimePicker  } from "antd";

import FlightSimulatorApi from "./services/flight-simulator-api";

const Timer = () => {
  const [value, setValue] = useState(null);
  const onChange = (time) => {
    const currentTime = time.$H*3600 + time.$m*60 + time.$s;
    const flightSimulatorApi = new FlightSimulatorApi('http://localhost:8023');

    console.log(currentTime);
    flightSimulatorApi.getFlightByHour(currentTime).then((result) => console.log(result));

    setValue(time);
  };
  return <TimePicker value={value} onChange={onChange} />;
};

export default Timer
import {  useState  } from "react";
import {  TimePicker  } from "antd";

const Timer = () => {
  const [value, setValue] = useState(null);
  const onChange = (time) => {
    console.log(time.$H*3600+time.$m*60+time.$s)
    setValue(time);
  };
  return <TimePicker value={value} onChange={onChange} />;
};

export default Timer
import {  useState  } from "react";
import {  TimePicker  } from "antd";

const Timer = (props) => {
  const [value, setValue] = useState(null);
  const { onChange } = props;
  const callback = (time) => {
      onChange(time);
      setValue(time);
  }

  return <TimePicker value={value} onChange={callback} />;
};

export default Timer;

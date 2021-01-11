import React, { useState } from "react";
import PropTypes from "prop-types";
import DateTimePicker from "react-datetime-picker";

const ReactDateTimePicker = props => {
  const [value, setValue] = useState(props.inputval);
  const format = props.format || "MM/dd/yyyy hh:mm aa";
  const onchange = e => {
    setValue(e);
    props.callback(e);
  };
  return (
    <div className="date-picker">
      <DateTimePicker
        className={`${props.className || ""}`}
        onChange={onchange}
        value={value}
        name={props.name}
        required={props.required}
        alt={props.alt}
        disabled={props.readOnly === "readOnly" ? true : false}
        clearIcon={null}
        calendarIcon={null}
        disableClock={true}
        format={format}
        yearPlaceholder="YYYY"
        monthPlaceholder="MM"
        dayPlaceholder="DD"
        hourPlaceholder="hh"
        minutePlaceholder="mm"
        disableCalendar={props.disableCalendar}
      />
    </div>
  );
};

ReactDateTimePicker.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.oneOf([true, false, ""]),
  alt: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  readOnly: PropTypes.string,
  disableCalendar: PropTypes.bool,
  callback: PropTypes.func,
  format: PropTypes.string,
  inputval: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default ReactDateTimePicker;

/*
 *
 *  * All Application code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
 *  *
 *  * Please see LICENSE.txt for details.
 *
 */

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import "./LabelledDateTimePickerStartEnd.css";
import "../Inputs.scss";
import LabelledInputDisplayWrapper from "../LabelledInputDecorator";
import { Container, Row } from "react-bootstrap";
const REQUIRED = "required";
const LabelledDateTimePickerStartEnd = props => {
  const changeEta = event => {
    setStartDate(event);
    props.startMut(event);
    const update = {
      etaStart: event,
      etaEnd: endDate
    };
    const dateRangeUpdate ={
      name: "datepicker",
      value: update
    }
    props.callback(dateRangeUpdate);
  };

  const changeEtd = event => {
    setEndDate(event);
    props.endMut(event);
    const update = {
      etaStart: startDate,
      etaEnd: event
    };
    const dateRangeUpdate ={
      name: "datepicker",
      value: update
    }
    props.callback(dateRangeUpdate);
  };
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);

  return (
    <div className="date-picker-container">
      <div>
        <label>Start Date</label>
      </div>

      <DatePicker
        selected={startDate}
        onChange={changeEta}
        selectsStart
        {...props}
        startDate={startDate}
        endDate={endDate}
      />

      <div>
        <label>End Date</label>
      </div>

      <DatePicker
        selected={endDate}
        onChange={changeEtd}
        selectsEnd
        {...props}
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </div>
  );
};

LabelledDateTimePickerStartEnd.propTypes = {
  name: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  inputType: PropTypes.oneOf(["dateTime", "date"]).isRequired,
  callback: PropTypes.func.isRequired,
  inputVal: PropTypes.objectOf(Date),
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  required: PropTypes.oneOf([REQUIRED, "", undefined]),
  isVisible: PropTypes.bool,
  readOnly: PropTypes.string,
  dateRange: PropTypes.object
};
export default LabelledInputDisplayWrapper(
  React.memo(LabelledDateTimePickerStartEnd, (oldProps, newProps) => {
    // True when an update should not happen.
    return oldProps === newProps || oldProps.children === newProps.children;
  })
);

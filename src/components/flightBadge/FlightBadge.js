import React from "react";
import "./FlightBadge.scss";
import LabelledInput from "../labelledInput/LabelledInput";

const FlightBadge = props => {
  const arrival = props.arrival;
  const departure = props.departure;
  const flightNumebr = props.flightnumber;
  return (
    <>
      <LabelledInput
        alt="Flight"
        inputStyle="big-name-sidebar fa fa-plane"
        inputType="label"
        inputVal={flightNumebr}
      />
      <LabelledInput
        alt="Flight"
        inputStyle="big-name-sidebar fa fa-arrow-circle-up"
        inputType="label"
        inputVal={departure}
      />
      <LabelledInput
        alt="Flight"
        inputStyle="big-name-sidebar fa fa-arrow-circle-down"
        inputType="label"
        inputVal={arrival}
      />
    </>
  );
};

export default FlightBadge;

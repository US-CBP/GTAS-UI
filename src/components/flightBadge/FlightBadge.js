import React from "react";
import "./FlightBadge.scss";
import LabelledInput from "../labelledInput/LabelledInput";
import { fas, faPlaneArrival } from "@fortawesome/free-solid-svg-icons";

const FlightBadge = props => {
  const arrival = props.arrival;
  const departure = props.departure;
  const flightNumber = props.flightNumber;
  return (
    <>
      <LabelledInput
        alt="Flight"
        inputStyle="big-name-sidebar fa fa-plane"
        inputType="label"
        inputVal={flightNumber}
      />
      <LabelledInput
        alt="Flight"
        inputStyle="big-name-sidebar fa fa-arrow-circle-up"
        inputType="label"
        inputVal={departure}
      />
      <LabelledInput
        alt="Flight"
        inputStyle="big-name-sidebar fas fa-arrow-circle-down"
        inputType="label"
        inputVal={arrival}
      />
    </>
  );
};

export default FlightBadge;

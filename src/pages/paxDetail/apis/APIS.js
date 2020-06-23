import React from "react";
import Table from "../../../components/table/Table";
import {} from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import { Container } from "react-bootstrap";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import { hasData, asArray } from "../../../utils/utils";

const APIS = props => {
  const data = hasData(props.data) ? props.data : {};
  const headers = {
    bags: {
      bagId: "Bag Id"
    },
    phoneNumbers: {
      number: "Phone Number"
    },
    passengersOnReservation: {
      lastName: "Last Name",
      firstName: "first Name",
      middleName: "Middle Name",
      passengerType: "Type",
      residencyCountry: "Residence",
      portOfFirstArrival: "Destination Airport",
      resRefNumber: "Ref Number"
    }
  };

  const bags = asArray(data.bags);
  const phoneNumbers = asArray(data.phoneNumbers);
  const passengersOnReservation = asArray(data.passengersOnReservation);
  return (
    <Container fluid className="paxdetail-container">
      <Title title="APIS"></Title>
      <CardWithTable
        data={bags}
        headers={headers.bags}
        title={`Total APIS Baggage(${bags.length})`}
      />
      <CardWithTable
        data={phoneNumbers}
        headers={headers.phoneNumbers}
        title={`Phone Numbers(${phoneNumbers.length})`}
      />
      <CardWithTable
        data={passengersOnReservation}
        headers={headers.passengersOnReservation}
        title={`Passenger on Reservation(${passengersOnReservation.length})`}
      />
    </Container>
  );
};

export default APIS;

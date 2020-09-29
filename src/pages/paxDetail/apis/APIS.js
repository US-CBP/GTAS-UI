import React from "react";
import Xl8 from "../../../components/xl8/Xl8";
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
      <Title title={<Xl8 xid="apis001">APIS</Xl8>}></Title>
      <CardWithTable
        data={bags}
        headers={headers.bags}
        title={<Xl8 xid="apis001">Total APIS Baggage</Xl8>}
      />
      <CardWithTable
        data={phoneNumbers}
        headers={headers.phoneNumbers}
        title={<Xl8 xid="apis001">Phone Numbers</Xl8>}
      />
      <CardWithTable
        data={passengersOnReservation}
        headers={headers.passengersOnReservation}
        title={<Xl8 xid="apis001">`Passenger on Reservation</Xl8>}
      />
    </Container>
  );
};

export default APIS;

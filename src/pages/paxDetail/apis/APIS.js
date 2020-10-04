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
      bagId: <Xl8 xid="apis005">Bag Id</Xl8>
    },
    phoneNumbers: {
      number: <Xl8 xid="apis006">Phone Number</Xl8>
    },
    passengersOnReservation: {
      lastName: <Xl8 xid="apis007">Last Name</Xl8>,
      firstName: <Xl8 xid="apis008">first Name</Xl8>,
      middleName: <Xl8 xid="apis009">Middle Name</Xl8>,
      passengerType: <Xl8 xid="apis010">Type</Xl8>,
      residencyCountry: <Xl8 xid="apis011">Residence</Xl8>,
      portOfFirstArrival: <Xl8 xid="apis012">Destination Airport</Xl8>,
      resRefNumber: <Xl8 xid="apis013">Ref Number</Xl8>
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
        title={<Xl8 xid="apis002">Total APIS Baggage</Xl8>}
      />
      <CardWithTable
        data={phoneNumbers}
        headers={headers.phoneNumbers}
        title={<Xl8 xid="apis003">Phone Numbers</Xl8>}
      />
      <CardWithTable
        data={passengersOnReservation}
        headers={headers.passengersOnReservation}
        title={<Xl8 xid="apis004">`Passenger on Reservation</Xl8>}
      />
    </Container>
  );
};

export default APIS;

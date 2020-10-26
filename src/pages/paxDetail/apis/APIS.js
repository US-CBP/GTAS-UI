import React from "react";
import Xl8 from "../../../components/xl8/Xl8";
import { CardColumns } from "react-bootstrap";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import Main from "../../../components/main/Main";
import { hasData, asArray } from "../../../utils/utils";
import { Link } from "@reach/router";

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
  const passengersOnReservation = asArray(data.flightpaxs).map(passenger => {
    return {
      ...passenger,
      lastName: (
        <Link to={`/gtas/paxDetail/${passenger.flightId}/${passenger.passengerId}`}>
          {passenger.lastName}
        </Link>
      )
    };
  });
  return (
    <Main className="one-column-container">
      <CardColumns>
        <CardWithTable
          data={bags}
          headers={headers.bags}
          title={
            <span>
              <Xl8 xid="apis002">Total APIS Baggage</Xl8> ({data.bagWeight || 0}
              <Xl8 xid="apis014">kg</Xl8>)
            </span>
          }
        />
        <CardWithTable
          data={phoneNumbers}
          headers={headers.phoneNumbers}
          title={<Xl8 xid="apis003">Phone Numbers</Xl8>}
        />
        <CardWithTable
          data={passengersOnReservation}
          headers={headers.passengersOnReservation}
          title={<Xl8 xid="apis004">Passenger on Reservation</Xl8>}
        />
      </CardColumns>
    </Main>
  );
};

export default APIS;

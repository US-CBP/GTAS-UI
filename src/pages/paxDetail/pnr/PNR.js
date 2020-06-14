import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Title from "../../../components/title/Title";
import SegmentTable from "../../../components/segmentTable/SegmentTable";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import "./PNR.scss";

const PNR = props => {
  console.log(props.data);
  const data = props.data;

  const rawPnrSegments = data.segmentList;

  const itinerary = (data.flightLegs || []).map((leg, index) => {
    return {
      leg: index + 1,
      flightNumber: leg.flightNumber,
      origin: leg.originAirport,
      destination: leg.destinationAirport,
      departure: leg.etd,
      arrivval: leg.eta
    };
  });
  const itineraryHeaders = {
    leg: "Leg",
    flightNumber: "Flight Number",
    origin: "Origin",
    destination: "Destination",
    departure: "Departure",
    arrivval: "Arrival"
  };

  const passengers = data.passengers || [];
  const passengerHeaders = {
    lastName: "Last Name",
    firstName: "First Name",
    middleName: "Middle Name",
    gender: "Gender",
    age: "Age"
  };

  const documents = data.documents || [];
  const documentHeaders = {
    lastName: "Last Name",
    firstName: "First Name",
    documentType: "Type",
    issuanceCountry: "Issuance Country",
    expirationDate: "Expiration Date",
    documentNumber: "Number"
  };

  const addresses = (data.addresses || []).map(address => {
    return {
      ...address,
      street: address.line1
    };
  });
  const addressHeaders = {
    street: "Street",
    city: "City",
    state: "State/Province",
    country: "Country"
  };

  const phoneNumbers = data.phoneNumbers || [];
  const phoneNumberHeaders = {
    number: "Number"
  };

  const emails = data.emails || [];
  const emailHeaders = {
    address: "Email Adrress"
  };

  const creditCards = data.creditCards || [];
  const creditCardHeaders = {
    accountHolder: "Holder",
    cardType: "Type",
    expiration: "Exp. Date",
    number: "Number"
  };

  const frequentFlyerDetails = data.frequentFlyerDetails || [];
  const frequentFlyerDetailHeaders = {
    carrier: "Airline",
    number: "Number"
  };

  const agencies = data.agencies || [];
  const agenciesHeaders = {
    type: "Type",
    country: "Country",
    city: "City",
    identifier: "ID",
    location: "Location",
    name: "Name",
    phone: "Phone"
  };

  const seatAssignments = data.seatAssignments || [];
  const seatAssignmentHeaders = {
    firstName: "First Name",
    lastName: "Last Name",
    flightNumber: "Flight Number",
    number: "Seat Number"
  };

  const segmentRef = React.createRef();
  const [foo, setFoo] = useState(0);

  // To fire on the onclick event of child tables, passing the key of the matching raw pnr record.
  // Use as the child's callback reference
  // Currently just iterates through the numeric keys as a demo
  const setActiveKeyWrapper = key => {
    setFoo(foo + 1);
    segmentRef.current.setActiveKey(foo);
    // segmentRef.current.setActiveKey(key);
  };

  return (
    <Row>
      <Col sm="4" md="4" lg="4">
        <div className="top">
          <input type="button" onClick={setActiveKeyWrapper} value="click"></input>
          <SegmentTable
            title="Segment Table"
            data={rawPnrSegments}
            id="rawPnrSegments"
            ref={segmentRef}
          />
        </div>
      </Col>
      <Col>
        <Container fluid className="pnr-card-container">
          <CardWithTable
            data={itinerary}
            headers={itineraryHeaders}
            title={`Itinerary (${itinerary.length})`}
          />
          <CardWithTable
            data={passengers}
            headers={passengerHeaders}
            title={`PNR Names (${passengers.length})`}
          />
          <CardWithTable
            data={documents}
            headers={documentHeaders}
            title={`Documents(${documents.length})`}
          />
          <CardWithTable
            data={addresses}
            headers={addressHeaders}
            title={`Addresses(${addresses.length})`}
          />
          <CardWithTable
            data={phoneNumbers}
            headers={phoneNumberHeaders}
            title={`Phone Numbers(${phoneNumbers.length})`}
          />
          <CardWithTable
            data={emails}
            headers={emailHeaders}
            title={`Email Addresses(${emails.length})`}
          />
          <CardWithTable
            data={creditCards}
            headers={creditCardHeaders}
            title={`Credit Cards(${creditCards.length})`}
          />
          <CardWithTable
            data={frequentFlyerDetails}
            headers={frequentFlyerDetailHeaders}
            title={`Frequent Flyer Numbers(${frequentFlyerDetails.length})`}
          />
          <CardWithTable
            data={seatAssignments}
            headers={seatAssignmentHeaders}
            title="Seat Information"
          />

          <CardWithTable
            data={agencies}
            headers={agenciesHeaders}
            title={`Agencies(${agencies.length})`}
          />
        </Container>
      </Col>
    </Row>
  );
};

export default PNR;

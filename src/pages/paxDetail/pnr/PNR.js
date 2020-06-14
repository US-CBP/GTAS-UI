import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Title from "../../../components/title/Title";
import SegmentTable from "../../../components/segmentTable/SegmentTable";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import "./PNR.scss";

const PNR = props => {
  const data = props.data;
  const headers = {
    itinerary: {
      leg: "Leg",
      flightNumber: "Flight Number",
      origin: "Origin",
      destination: "Destination",
      departure: "Departure",
      arrivval: "Arrival"
    },
    passengers: {
      lastName: "Last Name",
      firstName: "First Name",
      middleName: "Middle Name",
      gender: "Gender",
      age: "Age"
    },
    documents: {
      lastName: "Last Name",
      firstName: "First Name",
      documentType: "Type",
      issuanceCountry: "Issuance Country",
      expirationDate: "Expiration Date",
      documentNumber: "Number"
    },
    addresses: {
      street: "Street",
      city: "City",
      state: "State/Province",
      country: "Country"
    },
    phoneNumbers: {
      number: "Number"
    },
    emails: {
      address: "Email Adrress"
    },
    creditCards: {
      accountHolder: "Holder",
      cardType: "Type",
      expiration: "Exp. Date",
      number: "Number"
    },
    frequentFlyerDetails: {
      carrier: "Airline",
      number: "Number"
    },
    agencies: {
      type: "Type",
      country: "Country",
      city: "City",
      identifier: "ID",
      location: "Location",
      name: "Name",
      phone: "Phone"
    },
    seatAssignments: {
      firstName: "First Name",
      lastName: "Last Name",
      flightNumber: "Flight Number",
      number: "Seat Number"
    }
  };
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

  const passengers = data.passengers || [];
  const documents = data.documents || [];
  const addresses = (data.addresses || []).map(address => {
    return {
      ...address,
      street: address.line1
    };
  });
  const phoneNumbers = data.phoneNumbers || [];
  const emails = data.emails || [];
  const creditCards = data.creditCards || [];
  const frequentFlyerDetails = data.frequentFlyerDetails || [];
  const agencies = data.agencies || [];
  const seatAssignments = data.seatAssignments || [];

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
            headers={headers.itinerary}
            title={`Itinerary (${itinerary.length})`}
          />
          <CardWithTable
            data={passengers}
            headers={headers.passengers}
            title={`PNR Names (${passengers.length})`}
          />
          <CardWithTable
            data={documents}
            headers={headers.documents}
            title={`Documents(${documents.length})`}
          />
          <CardWithTable
            data={addresses}
            headers={headers.addresses}
            title={`Addresses(${addresses.length})`}
          />
          <CardWithTable
            data={phoneNumbers}
            headers={headers.phoneNumbers}
            title={`Phone Numbers(${phoneNumbers.length})`}
          />
          <CardWithTable
            data={emails}
            headers={headers.emails}
            title={`Email Addresses(${emails.length})`}
          />
          <CardWithTable
            data={creditCards}
            headers={headers.creditCards}
            title={`Credit Cards(${creditCards.length})`}
          />
          <CardWithTable
            data={frequentFlyerDetails}
            headers={headers.frequentFlyerDetails}
            title={`Frequent Flyer Numbers(${frequentFlyerDetails.length})`}
          />
          <CardWithTable
            data={seatAssignments}
            headers={headers.seatAssignments}
            title="Seat Information"
          />

          <CardWithTable
            data={agencies}
            headers={headers.agencies}
            title={`Agencies(${agencies.length})`}
          />
        </Container>
      </Col>
    </Row>
  );
};

export default PNR;

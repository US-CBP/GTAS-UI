import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Title from "../../../components/title/Title";
import SegmentTable from "../../../components/segmentTable/SegmentTable";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import { asArray } from "../../../utils/utils";
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
  const itinerary = asArray(data.flightLegs).map((leg, index) => {
    return {
      leg: index + 1,
      flightNumber: leg.flightNumber,
      origin: leg.originAirport,
      destination: leg.destinationAirport,
      departure: leg.etd,
      arrivval: leg.eta,
      key: `TVL${leg.originAirport} `
    };
  });

  const passengers = asArray(data.passengers).map(passenger => {
    return {
      ...passenger,
      key: `SSR${passenger.firstName} `
    };
  });
  const documents = asArray(data.documents).map(doc => {
    return {
      ...doc,
      key: `DOCS${doc.documentNumber} `
    };
  });
  const addresses = asArray(data.addresses).map(address => {
    return {
      ...address,
      street: address.line1,
      key: `ADD${address.city} `
    };
  });
  const phoneNumbers = asArray(data.phoneNumbers).map(pNumber => {
    return {
      ...pNumber,
      key: `PHONE${pNumber.number} `
    };
  });
  const emails = asArray(data.emails).map(email => {
    return {
      ...email,
      key: `EMAIL${email.address} `
    };
  });
  const creditCards = asArray(data.creditCards).map(ccData => {
    return {
      ...ccData,
      key: `FOP${ccData.number} `
    };
  });
  const frequentFlyerDetails = asArray(data.frequentFlyerDetails).map(ffd => {
    return {
      ...ffd,
      key: `FTI${ffd.number} `
    };
  });
  const agencies = asArray(data.agencies).map(agency => {
    return {
      ...agency,
      key: `AGEN${agency.identifier} `
    };
  });
  const seatAssignments = asArray(data.seatAssignments).map(seatAssignment => {
    return {
      ...seatAssignment,
      key: `SEAT${seatAssignment.number}`
    };
  });

  const segmentRef = React.createRef();

  // To fire on the onclick event of child tables, passing the key of the matching raw pnr record.
  // Use as the child's callback reference
  const setActiveKeyWrapper = key => {
    segmentRef.current.setActiveKey(key);
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
            callback={setActiveKeyWrapper}
          />
          <CardWithTable
            data={passengers}
            headers={headers.passengers}
            title={`PNR Names (${passengers.length})`}
            callback={setActiveKeyWrapper}
          />
          <CardWithTable
            data={documents}
            headers={headers.documents}
            title={`Documents(${documents.length})`}
            callback={setActiveKeyWrapper}
          />
          <CardWithTable
            data={addresses}
            headers={headers.addresses}
            title={`Addresses(${addresses.length})`}
            callback={setActiveKeyWrapper}
          />
          <CardWithTable
            data={phoneNumbers}
            headers={headers.phoneNumbers}
            title={`Phone Numbers(${phoneNumbers.length})`}
            callback={setActiveKeyWrapper}
          />
          <CardWithTable
            data={emails}
            headers={headers.emails}
            title={`Email Addresses(${emails.length})`}
            callback={setActiveKeyWrapper}
          />
          <CardWithTable
            data={creditCards}
            headers={headers.creditCards}
            title={`Credit Cards(${creditCards.length})`}
            callback={setActiveKeyWrapper}
          />
          <CardWithTable
            data={frequentFlyerDetails}
            headers={headers.frequentFlyerDetails}
            title={`Frequent Flyer Numbers(${frequentFlyerDetails.length})`}
            callback={setActiveKeyWrapper}
          />
          <CardWithTable
            data={seatAssignments}
            headers={headers.seatAssignments}
            title="Seat Information"
            callback={setActiveKeyWrapper}
          />

          <CardWithTable
            data={agencies}
            headers={headers.agencies}
            title={`Agencies(${agencies.length})`}
            callback={setActiveKeyWrapper}
          />
        </Container>
      </Col>
    </Row>
  );
};

export default PNR;

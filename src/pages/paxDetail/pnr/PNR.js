import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import SegmentTable from "../../../components/segmentTable/SegmentTable";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import {
  asArray,
  hasData,
  localeDate,
  localeDateOnly,
  localeMonthYear
} from "../../../utils/utils";
import Xl8 from "../../../components/xl8/Xl8";
import { Link } from "@reach/router";

const PNR = props => {
  const data = hasData(props.data) ? props.data : {};
  const segmentTitle = `Reservation Number: ${data.recordLocator} ${
    hasData(data.version) ? `(Version: ${data.version})` : ""
  }`;

  const sortFlightByEta = (flight1, flight2) => {
    return flight2.eta - flight1.eta;
  };
  const addLinkToFlight = flight => {
    //Only prime flights need a link
    const isPrimeFlight = !hasData(flight.bookingDetailId);
    const stateData = {
      direction: flight.direction,
      eta: flight.eta,
      etd: flight.etd,
      fullFlightNumber: flight.flightNumber,
      flightDestination: flight.destinationAirport,
      flightOrigin: flight.originAirport,
      passengerCount: flight.passengerCount
    };

    return isPrimeFlight ? (
      <Link to={"/gtas/flightpax/" + flight.flightId} state={{ data: stateData }}>
        {flight.flightNumber}
      </Link>
    ) : (
      flight.flightNumber
    );
  };
  const getPassengerName = paxId => {
    const passengers = data.passengers;
    const passenger = passengers.find(passenger => passenger.paxId === paxId?.toString());
    return passenger;
  };

  const getFlightNumber = bookingDetailId => {
    const flightLegs = asArray(data.flightLegs);
    const flightLeg = flightLegs.find(leg => {
      const id = leg.bookingDetailId || leg.flightId;
      return id?.toString() === bookingDetailId?.toString();
    });
    return hasData(flightLeg) ? flightLeg.flightNumber : "";
  };

  const groupBagDataByFlightNumber = data => {
    const groupedData = data.reduce((accumulator, bag) => {
      const id = bag.bookingDetailId || bag.flightId;
      const flightNumber = getFlightNumber(id);
      accumulator[flightNumber] = asArray(accumulator[flightNumber]);
      accumulator[flightNumber].push(bag);
      return accumulator;
    }, {});

    return groupedData;
  };

  const groupBagDataByPaxId = bags => {
    const groupedDataByPaxId = bags.reduce((acc, bag) => {
      const paxId = bag["passengerId"];
      acc[paxId] = asArray(acc[paxId]);
      acc[paxId].push(bag);

      return acc;
    }, {});

    return groupedDataByPaxId;
  };

  const getBagData = data => {
    const bags = asArray(data.bagSummaryVo?.bagsByFlightLeg).filter(
      bag => bag.data_source === "PNR"
    );

    const bagsGroupedByFlightNumber = groupBagDataByFlightNumber(bags);
    const allParsedBagdata = [];

    Object.keys(bagsGroupedByFlightNumber).forEach(flightNumber => {
      const bags = bagsGroupedByFlightNumber[flightNumber];
      const bagsGroupedByPaxId = groupBagDataByPaxId(bags);
      const headerIndex = allParsedBagdata.length; //where the header with flight totals is inserted

      const aggregate = {
        flightNumber: flightNumber,
        bagCount: 0,
        totalWeight: 0,
        highlightRow: true
      };

      Object.keys(bagsGroupedByPaxId).forEach(paxId => {
        const passenger = getPassengerName(paxId) || {};
        const currentBags = bagsGroupedByPaxId[paxId];

        const bagCount = currentBags.reduce(
          (count, currentBag) => Math.max(count, currentBag["bag_count"]),
          0
        );
        const bagWeight = currentBags.reduce(
          (weight, currentBag) => Math.max(weight, currentBag["bag_weight"]),
          0
        );
        aggregate.bagCount += bagCount;
        aggregate.totalWeight += bagWeight;

        const bagInfo = {
          passenger: `${passenger.lastName}, ${passenger.firstName}`,
          bagCount: bagCount,
          totalWeight: bagWeight,
          destination: currentBags[0]["destination"],
          bagIds: currentBags.map(bag => bag["bagId"]).join()
        };

        allParsedBagdata.push(bagInfo);
      });

      //add the header with flight details
      allParsedBagdata.splice(headerIndex, 0, aggregate);
    });

    return allParsedBagdata;
  };

  const tripType = data.tripType || "Trip Type";
  const headers = {
    itinerary: {
      leg: <Xl8 xid="pnr001">Leg</Xl8>,
      flightNumber: <Xl8 xid="pnr002">Flight Number</Xl8>,
      origin: <Xl8 xid="pnr003">Origin</Xl8>,
      destination: <Xl8 xid="pnr004">Destination</Xl8>,
      departure: <Xl8 xid="pnr005">Departure</Xl8>,
      arrivval: <Xl8 xid="pnr006">Arrival</Xl8>
    },
    passengers: {
      lastName: <Xl8 xid="pnr007">Last Name</Xl8>,
      firstName: <Xl8 xid="pnr008">First Name</Xl8>,
      middleName: <Xl8 xid="pnr009">Middle Name</Xl8>,
      gender: <Xl8 xid="pnr010">Gender</Xl8>,
      age: <Xl8 xid="pnr011">Age</Xl8>
    },
    documents: {
      lastName: <Xl8 xid="pnr012">Last Name</Xl8>,
      firstName: <Xl8 xid="pnr013">First Name</Xl8>,
      documentType: <Xl8 xid="pnr014">Type</Xl8>,
      issuanceCountry: <Xl8 xid="pnr015">Issuance Country</Xl8>,
      expirationDate: <Xl8 xid="pnr016">Expiration Date</Xl8>,
      documentNumber: <Xl8 xid="pnr017">Number</Xl8>
    },
    addresses: {
      street: <Xl8 xid="pnr018">Street</Xl8>,
      city: <Xl8 xid="pnr019">City</Xl8>,
      state: <Xl8 xid="pnr020">State/Province</Xl8>,
      country: <Xl8 xid="pnr021">Country</Xl8>
    },
    phoneNumbers: {
      number: <Xl8 xid="pnr022">Number</Xl8>
    },
    emails: {
      address: <Xl8 xid="pnr023">Email Adrress</Xl8>
    },
    creditCards: {
      accountHolder: <Xl8 xid="pnr024">Holder</Xl8>,
      cardType: <Xl8 xid="pnr025">Type</Xl8>,
      expiration: <Xl8 xid="pnr026">Exp. Date</Xl8>,
      number: <Xl8 xid="pnr027">Number</Xl8>
    },
    frequentFlyerDetails: {
      carrier: <Xl8 xid="pnr028">Airline</Xl8>,
      number: <Xl8 xid="pnr029">Number</Xl8>
    },
    agencies: {
      type: <Xl8 xid="pnr030">Type</Xl8>,
      country: <Xl8 xid="pnr031">Country</Xl8>,
      city: <Xl8 xid="pnr032">City</Xl8>,
      identifier: <Xl8 xid="pnr033">ID</Xl8>,
      location: <Xl8 xid="pnr034">Location</Xl8>,
      name: <Xl8 xid="pnr035">Name</Xl8>,
      phone: <Xl8 xid="pnr036">Phone</Xl8>
    },
    seatAssignments: {
      firstName: <Xl8 xid="pnr037">First Name</Xl8>,
      lastName: <Xl8 xid="pnr038">Last Name</Xl8>,
      flightNumber: <Xl8 xid="pnr039">Flight Number</Xl8>,
      number: <Xl8 xid="pnr040">Seat Number</Xl8>
    },
    totalBaggage: {
      flightNumber: <Xl8 xid="pnr057">Flight #</Xl8>,
      passenger: <Xl8 xid="pnr053">Passenger</Xl8>,
      bagCount: <Xl8 xid="pnr055">Bag Count</Xl8>,
      totalWeight: <Xl8 xid="pnr056">Total Bag Weight</Xl8>,
      destination: <Xl8 xid="pnr058">Destination</Xl8>,
      bagIds: <Xl8 xid="pnr052">Bag Ids</Xl8>
    }
  };
  const rawPnrSegments = asArray(data.segmentList);
  const itinerary = asArray(data.flightLegs)
    .sort(sortFlightByEta)
    .map((leg, index) => {
      return {
        leg: index + 1,
        flightNumber: addLinkToFlight(leg),
        origin: leg.originAirport,
        destination: leg.destinationAirport,
        departure: localeDate(leg.etd),
        arrivval: localeDate(leg.eta),
        key: `TVL${leg.originAirport} `
      };
    });

  const passengers = asArray(data.passengers).map(passenger => {
    return {
      ...passenger,
      lastName: (
        <Link to={`/gtas/paxDetail/${data.flightId}/${passenger.paxId}`}>
          {passenger.lastName}
        </Link>
      ),
      key: `SSR${passenger.firstName} `
    };
  });
  const documents = asArray(data.documents).map(doc => {
    const expirationDate = Date.parse(doc.expirationDate);
    return {
      ...doc,
      expirationDate: localeDateOnly(expirationDate),
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
      expiration: localeMonthYear(ccData.expiration),
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

  const totalBaggage = getBagData(data);

  const segmentRef = React.createRef();

  // To fire on the onclick event of child tables, passing the key of the matching raw pnr record.
  // Use as the child's callback reference
  const setActiveKeyWrapper = key => {
    segmentRef.current.setActiveKey(key);
  };

  return (
    <div className="paxdetail-container">
      <Row>
        <Col className="p-0" md="5">
          <SegmentTable
            title={segmentTitle}
            data={rawPnrSegments}
            id="rawPnrSegments"
            ref={segmentRef}
          />
        </Col>
        <Col className="p-0">
          <Container fluid className="paxdetail-container-col">
            <CardWithTable
              data={itinerary}
              headers={headers.itinerary}
              title={
                <>
                  <Xl8 xid="pnr041">Itinerary</Xl8> <span>{`(${tripType})`}</span>
                </>
              }
              callback={setActiveKeyWrapper}
            />
            <CardWithTable
              data={passengers}
              headers={headers.passengers}
              title={<Xl8 xid="pnr042">PNR Names</Xl8>}
              callback={setActiveKeyWrapper}
            />
            <CardWithTable
              data={documents}
              headers={headers.documents}
              title={<Xl8 xid="pnr043">Documents</Xl8>}
              callback={setActiveKeyWrapper}
            />
            <CardWithTable
              data={addresses}
              headers={headers.addresses}
              title={<Xl8 xid="pnr044">Addresses</Xl8>}
              callback={setActiveKeyWrapper}
            />
            <CardWithTable
              data={phoneNumbers}
              headers={headers.phoneNumbers}
              title={<Xl8 xid="pnr045">Phone Numbers</Xl8>}
              callback={setActiveKeyWrapper}
            />
            <CardWithTable
              data={emails}
              headers={headers.emails}
              title={<Xl8 xid="pnr046">Email Addresses</Xl8>}
              callback={setActiveKeyWrapper}
            />
            <CardWithTable
              data={creditCards}
              headers={headers.creditCards}
              title={<Xl8 xid="pnr047">Credit Cards</Xl8>}
              callback={setActiveKeyWrapper}
            />
            <CardWithTable
              data={frequentFlyerDetails}
              headers={headers.frequentFlyerDetails}
              title={<Xl8 xid="pnr048">Frequent Flyer Numbers</Xl8>}
              callback={setActiveKeyWrapper}
            />
            <CardWithTable
              data={seatAssignments}
              headers={headers.seatAssignments}
              title={<Xl8 xid="pnr049">Seat Information</Xl8>}
              callback={setActiveKeyWrapper}
            />

            <CardWithTable
              data={agencies}
              headers={headers.agencies}
              title={<Xl8 xid="pnr050">Agencies</Xl8>}
              callback={setActiveKeyWrapper}
            />
            <CardWithTable
              data={totalBaggage}
              headers={headers.totalBaggage}
              title={<Xl8 xid="pnr051">Total PNR Baggage </Xl8>}
              callback={setActiveKeyWrapper}
            />
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default PNR;

import React from "react";
import { Table } from "react-bootstrap";
import Xl8 from "../../components/xl8/Xl8";

import {
  hasData,
  localeDateOnly,
  localeDate,
  passengerTypeMapper,
  asArray
} from "../../utils/utils";
import { Link } from "@reach/router";
import "./PaxInfo.scss";

const PaxInfo = props => {
  const getPaxInfo = res => {
    const lastPnrRecieved = hasData(res.pnrVo?.transmissionDate)
      ? Date.parse(res.pnrVo?.transmissionDate)
      : undefined;
    const lastApisRecieved = hasData(res.apisMessageVo?.transmissionDate)
      ? Date.parse(res.apisMessageVo?.transmissionDate)
      : undefined;
    const dob = Date.parse(res.dob);
    return [
      {
        label: <Xl8 xid="pd007">Last Name</Xl8>,
        value: res.lastName
      },
      { label: <Xl8 xid="pd008">First Name</Xl8>, value: res.firstName },
      { label: <Xl8 xid="pd009">Middle Name</Xl8>, value: res.middleName },
      { label: <Xl8 xid="pd010">Age</Xl8>, value: res.age },
      { label: <Xl8 xid="pd011">DOB</Xl8>, value: localeDateOnly(dob) },
      { label: <Xl8 xid="pd012">Gender</Xl8>, value: res.gender },
      { label: <Xl8 xid="pd013">Nationality</Xl8>, value: res.nationality },
      { label: <Xl8 xid="pd014">Residence</Xl8>, value: res.residenceCountry },
      {
        label: <Xl8 xid="pd015">Seat</Xl8>,
        value: (
          <Link
            to={`/gtas/seat-chart/${res.flightId}/${res.paxId}/${res.seat}`}
            style={{ color: "#8fdeef" }}
            // state={{ arrival: res.eta, departure: res.etd, flightId: res.flightId }}
          >
            {res.seat}
          </Link>
        )
      },
      {
        label: <Xl8 xid="pd016">Passenger Type</Xl8>,
        value: passengerTypeMapper(res.passengerType)
      },
      {
        label: <Xl8 xid="pd017">Last PNR Received</Xl8>,
        value: localeDate(lastPnrRecieved)
      },
      {
        label: <Xl8 xid="pd018">Last APIS Received</Xl8>,
        value: localeDate(lastApisRecieved)
      }
    ];
  };

  const pax = getPaxInfo(asArray(props.pax));

  const tableRows = pax.reduce((acc, { label, value }) => {
    //don't display label with a null value (a good example is last apis/pnr recieved)
    if (hasData(value)) {
      const row = (
        <tr key={label.props?.xid} className="pax-info-row">
          <td className="left-label">{label}</td>
          <td className="right-label">{value}</td>
        </tr>
      );
      acc.push(row);
    }
    return acc;
  }, []);

  return (
    <>
      <Table size="sm" borderless>
        <tbody>{tableRows}</tbody>
      </Table>
    </>
  );
};

export default PaxInfo;

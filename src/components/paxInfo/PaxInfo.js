import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Xl8 from "../../components/xl8/Xl8";

import {
  hasData,
  localeDateOnly,
  localeMonthDayTime,
  passengerTypeMapper
} from "../../utils/utils";
import { Link } from "@reach/router";
import "./PaxInfo.scss";

const PaxInfo = props => {
  const getPaxInfo = res => {
    // const lastPnrRecieved = hasData(res.pnrVo?.transmissionDate)
    //   ? Date.parse(res.pnrVo?.transmissionDate)
    //   : undefined;
    // const lastApisRecieved = hasData(res.apisMessageVo?.transmissionDate)
    //   ? Date.parse(res.apisMessageVo?.transmissionDate)
    //   : undefined;
    // const dob = Date.parse(res.dob);

    return [
      {
        label: <Xl8 xid="pd007">Last Name</Xl8>,
        value: res.lastName
      },
      { label: <Xl8 xid="pd008">First Name</Xl8>, value: res.firstName },
      { label: <Xl8 xid="pd009">Middle Name</Xl8>, value: res.middleName },
      { label: <Xl8 xid="pd010">Age</Xl8>, value: res.age },
      { label: <Xl8 xid="pd011">DOB</Xl8>, value: localeDateOnly(Date.parse(res.dob)) },
      { label: <Xl8 xid="pd012">Gender</Xl8>, value: res.gender },
      { label: <Xl8 xid="pd013">Nationality</Xl8>, value: res.nationality },
      { label: <Xl8 xid="pd014">Residence</Xl8>, value: res.residenceCountry },
      {
        label: <Xl8 xid="pd015">Seat</Xl8>,
        value: (
          <Link
            to={`/gtas/seat-chart/${res.flightId}/${res.paxId}/${res.seat}`}
            className="pax-info-link"
            state={{
              arrival: res.eta,
              departure: res.etd,
              flightId: res.flightId,
              flightNumber: res.flightNumber
            }}
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
        value: localeMonthDayTime(res.lastPnrReceived)
      },
      {
        label: <Xl8 xid="pd018">Last APIS Received</Xl8>,
        value: localeMonthDayTime(res.lastApisReceived)
      }
    ];
  };

  const [tableRows, setTableRows] = useState();

  useEffect(() => {
    if (!hasData(props.pax)) {
      setTableRows([]);
      return;
    }

    const pax = getPaxInfo(props.pax);
    const paxdata = pax.map(({ label, value }) => {
      const row = (
        <tr key={label?.props?.xid} className="pax-info-row">
          <td className="left-label">{label}</td>
          <td className="right-label">{value}</td>
        </tr>
      );
      return row;
    }, []);
    setTableRows(paxdata);
  }, [props.pax]);

  return (
    <>
      <Table size="sm" borderless>
        <tbody key={tableRows}>{tableRows}</tbody>
      </Table>
    </>
  );
};

export default PaxInfo;

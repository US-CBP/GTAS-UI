// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Xl8 from "../../components/xl8/Xl8";
import LazyImage from "../../components/lazyImage/LazyImage";

import {
  hasData,
  localeMonthDayTime,
  passengerTypeMapper,
  timezoneFreeDate
} from "../../utils/utils";
import { Link } from "@reach/router";
import "./PaxInfo.scss";
import { LK } from "../../utils/constants";
import ToolTipWrapper from "../tooltipWrapper/TooltipWrapper";

const PaxInfo = props => {
  const getPaxInfo = res => {
    return [
      {
        label: <Xl8 xid="pd007">Last Name</Xl8>,
        value: res.lastName
      },
      { label: <Xl8 xid="pd008">First Name</Xl8>, value: res.firstName },
      { label: <Xl8 xid="pd009">Middle Name</Xl8>, value: res.middleName },
      { label: <Xl8 xid="pd010">Age</Xl8>, value: res.age },

      { label: <Xl8 xid="pd011">DOB</Xl8>, value: timezoneFreeDate(res.dob) },
      { label: <Xl8 xid="pd012">Gender</Xl8>, value: res.gender },
      {
        label: <Xl8 xid="pd013">Nationality</Xl8>,
        value: (
          <>
            <LazyImage val={res.nationality} type={LK.COUNTRY}></LazyImage>
            <ToolTipWrapper
              className="overlay-content-light"
              data={{ val: res.nationality, lkup: LK.COUNTRY }}
            ></ToolTipWrapper>
          </>
        )
      },
      { label: <Xl8 xid="pd014">Residence</Xl8>, value: res.residenceCountry },
      {
        label: <Xl8 xid="pd015">Seat</Xl8>,
        value: (
          <Link
            to={`/gtas/seatchart/${res.flightId}/${res.paxId}/${
              res.seat !== "N/A" ? res.seat : "NA"
            }`}
            className="pax-info-link"
            state={{
              arrival: res.eta,
              departure: res.etd,
              flightId: res.flightId,
              flightNumber: res.flightNumber,
              lastName: res.lastName,
              middleName: res.middleName,
              firstName: res.firstName
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

import React from "react";
import FlightBadge from "../flightBadge/FlightBadge";
import { Table } from "react-bootstrap";
import "./PaxInfo.scss";

const PaxInfo = props => {
  const pax = props.pax || [];
  const badgeprops = props.badgeprops || {};
  const tableRows = pax.map(({ label, value }, index) => {
    return (
      <tr key={index} className="pax-info-row">
        <td className="left-label">{label}</td>
        <td className="right-label">{value}</td>
      </tr>
    );
  });

  return (
    <div>
      <FlightBadge {...badgeprops}></FlightBadge>
      <Table size="sm" striped borderless>
        <tbody>{tableRows}</tbody>
      </Table>
    </div>
  );
};

export default PaxInfo;

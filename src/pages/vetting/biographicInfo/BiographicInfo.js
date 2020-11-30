import React from "react";
import { Link } from "@reach/router";
import { Row } from "react-bootstrap";
import "./BiographicInfo.scss";

function BiographicInfo(props) {
  const data = props.data || {};

  return (
    <div className="biographic-info">
      <Link to={`../paxDetail/${data.flightId}/${data.paxId}`}>
        <Row flex="true" no-wrap="true" className="biographic-info-row">
          {data.name}
        </Row>
        <Row flex="true" no-wrap="true" className="biographic-info-row">
          {`${data.dob} / ${data.gender}`}
        </Row>
        <Row flex="true" no-wrap="true" className="biographic-info-row">
          {`${data.document} / ${data.nationality}`}
        </Row>
      </Link>
    </div>
  );
}

export default BiographicInfo;

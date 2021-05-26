// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Link } from "@reach/router";
import { Row } from "react-bootstrap";
import LazyImage from "../../../components/lazyImage/LazyImage";
import { LK } from "../../../utils/constants";
import "./BiographicInfo.scss";

function BiographicInfo(props) {
  const data = props.data || {};

  return (
    <div>
      <Link to={`../paxDetail/${data.flightId}/${data.paxId}`}>
        <Row flex="true" no-wrap="true" className="biographic-info-row">
          {data.name}
        </Row>
        <Row flex="true" no-wrap="true" className="biographic-info-row">
          {`${data.dob} / ${data.gender}`}
        </Row>
        <Row flex="true" no-wrap="true" className="biographic-info-row">
          {`${data.document} / ${data.nationality}`}
          <LazyImage type={LK.COUNTRY} val={data.nationality}></LazyImage>
        </Row>
      </Link>
    </div>
  );
}

export default BiographicInfo;

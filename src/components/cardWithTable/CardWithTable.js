// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Button, Card, Table } from "react-bootstrap";
import Overlay from "../overlay/Overlay";
import ToolTipWrapper from "../tooltipWrapper/TooltipWrapper";
import LazyImage from "../../components/lazyImage/LazyImage";
import { asArray, isShortText, getShortText, alt, hasData } from "../../utils/utils";
import { LK } from "../../utils/constants";
import "./CardWithTable.scss";

const CardWithTable = props => {
  const data = asArray(props.data); //[{key:value}]
  const headers = props.headers || {}; //{key:value}
  const cb = props.callback ? props.callback : () => {}; //callback may not be passed as a prop
  const textDisplayLimit = 30;
  const className = `${alt(props.className)} card-with-table`;

  const toolTipLKMap = {
    issuanceCountry: { type: LK.COUNTRY, icon: true },
    originCountry: { type: LK.COUNTRY, icon: true },
    origin: { type: LK.AIRPORT, icon: false },
    fullFlightNumber: { type: LK.CARRIER, icon: true },
    flightNumber: { type: LK.CARRIER, icon: true },
    destinationCountry: { type: LK.COUNTRY, icon: true },
    destination: { type: LK.AIRPORT, icon: false },
    carrier: { type: LK.CARRIER, icon: true },
    country: { type: LK.COUNTRY, icon: true },
    residencyCountry: { type: LK.COUNTRY, icon: true },
    location: { type: LK.AIRPORT, icon: false },
    portOfFirstArrival: { type: LK.AIRPORT, icon: false }
  };

  const needsTooltip = key => {
    if (typeof toolTipLKMap[key] != "undefined") return true;
    return false;
  };

  const tableHeaders = Object.keys(headers).map(key => {
    return <th key={key}>{headers[key]}</th>;
  });

  const tableRows = data.map((row, index) => {
    let highlightRow = row.highlightRow;

    const tableData = Object.keys(headers).map((key, index) => {
      const td = row[key];
      const triggerOverlay = !isShortText(td, textDisplayLimit);
      const triggerTooltip = needsTooltip(key);
      let safeVal = td?.props?.children || td;
      safeVal = toolTipLKMap[key] === LK.CARRIER && td.length === 6 ? td.slice(0, 2) : td;

      return triggerTooltip ? (
        <td className="as-info">
          <>
            {toolTipLKMap[key].icon && (
              <LazyImage val={safeVal} type={toolTipLKMap[key].type}></LazyImage>
            )}
            <ToolTipWrapper data={{ val: td, lkup: toolTipLKMap[key].type }}>
              {getShortText(td, textDisplayLimit)}
            </ToolTipWrapper>
          </>
        </td>
      ) : triggerOverlay ? (
        <Overlay
          trigger={triggerOverlay ? ["click", "hover"] : ""}
          key={key}
          content={td}
        >
          <>
            {toolTipLKMap[key]?.icon && (
              <LazyImage val={safeVal} type={toolTipLKMap[key].type}></LazyImage>
            )}
            <td className={triggerOverlay ? "as-info" : ""}>
              {getShortText(td, textDisplayLimit)}
            </td>
          </>
        </Overlay>
      ) : (
        <td>
          {toolTipLKMap[key]?.icon && (
            <LazyImage val={safeVal} type={toolTipLKMap[key].type}></LazyImage>
          )}
          {td}
        </td>
      );
    });

    return (
      <tr
        key={index}
        onClick={() => cb(row.key)}
        className={highlightRow ? "highlight-table-row" : ""}
      >
        {tableData}
      </tr>
    );
  });

  return (
    <Card className={className}>
      <Card.Header className="customized-card-header">
        {hasData(props.refresh) && (
          <Button className="refresh" size="sm" onClick={props.refresh}>
            <i className="fa fa-refresh"></i>
          </Button>
        )}
        {props.title || ""} <span className="row-count">{data.length}</span>
      </Card.Header>
      {data.length > 0 && (
        <Table size="sm" striped borderless hover responsive>
          <thead>
            <tr>{tableHeaders}</tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </Table>
      )}
    </Card>
  );
};

export default CardWithTable;

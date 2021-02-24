// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import {Button, Card, Table} from "react-bootstrap";
import "./CardWithTable.scss";
import { asArray, isShortText, getShortText, alt, hasData } from "../../utils/utils";
import Overlay from "../overlay/Overlay";
import {LK} from "../../utils/constants";
import ToolTipWrapper from "../tooltipWrapper/TooltipWrapper";

const CardWithTable = props => {
  const data = asArray(props.data); //[{key:value}]
  const headers = props.headers || {}; //{key:value}
  const cb = props.callback ? props.callback : () => {}; //callback may not be passed as a prop
  const textDisplayLimit = 30;
  const className = `${alt(props.className)} card-with-table`;
  const toolTipLKMap = { "issuanceCountry":LK.COUNTRY, "originCountry":LK.COUNTRY, "origin":LK.AIRPORT, "destinationCountry":LK.COUNTRY,
    "destination":LK.AIRPORT, "carrier":LK.CARRIER, "country":LK.COUNTRY, "residencyCountry":LK.COUNTRY, "location":LK.AIRPORT, "portOfFirstArrival":LK.AIRPORT};
  const needsTooltip = (key) => {
    if(typeof toolTipLKMap[key] != "undefined") return true;
    return false;
  }

  const tableHeaders = Object.keys(headers).map(key => {
    return <th key={key}>{headers[key]}</th>;
  });

  const tableRows = data.map((row, index) => {
    let highlightRow = row.highlightRow;
    const tableData = Object.keys(headers).map((key, index) => {
      const td = row[key];
      const triggerOverlay = !isShortText(td, textDisplayLimit);
      const triggerTooltip = needsTooltip(key);
      return (
          triggerTooltip ? [
                <td className="cardwithtable-tooltip">
                  <ToolTipWrapper data={{val:td, lkup:toolTipLKMap[key]}}>
                      {getShortText(td, textDisplayLimit)}
                  </ToolTipWrapper>
                </td>
              ] :
              [
        <Overlay
          trigger={triggerOverlay ? ["click", "hover"] : ""}
          key={key}
          content={td}
        >
          <td className={triggerOverlay ? "as-info" : ""}>
            {getShortText(td, textDisplayLimit)}
          </td>
        </Overlay>
              ]
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

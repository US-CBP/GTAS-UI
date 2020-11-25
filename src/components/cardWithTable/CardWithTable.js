import React from "react";
import { Button, Card, Table } from "react-bootstrap";
import "./CardWithTable.scss";
import { asArray, isShortText, getShortText, alt, hasData } from "../../utils/utils";
import Overlay from "../overlay/Overlay";

const CardWithTable = props => {
  const data = asArray(props.data); //[{key:value}]
  const headers = props.headers || {}; //{key:value}
  const cb = props.callback ? props.callback : () => {}; //callback may not be passed as a prop
  const textDisplayLimit = 30;
  const className = `${alt(props.className)} card-with-table`;

  const tableHeaders = Object.keys(headers).map(key => {
    return <th key={key}>{headers[key]}</th>;
  });

  const tableRows = data.map((row, index) => {
    let highlightRow = row.highlightRow;
    const tableData = Object.keys(headers).map(key => {
      const td = row[key];
      const triggerOverlay = !isShortText(td, textDisplayLimit);
      return (
        <Overlay
          trigger={triggerOverlay ? ["click", "hover"] : ""}
          key={key}
          content={td}
        >
          <td className={triggerOverlay ? "as-info" : ""}>
            {getShortText(td, textDisplayLimit)}
          </td>
        </Overlay>
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

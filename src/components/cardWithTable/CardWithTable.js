import React from "react";
import { Card, Table } from "react-bootstrap";
import "./CardWithTable.scss";

const CardWithTable = props => {
  const data = props.data || []; //[{key:value}]
  const headers = props.headers || {}; //{key:value}
  const tableHeaders = Object.keys(headers).map(key => {
    return <th key={key}>{headers[key]}</th>;
  });

  const tableRows = data.map((row, index) => {
    const items = row || {};
    const rowData = Object.keys(headers).map(key => {
      return <td key={key}>{items[key]}</td>;
    });
    return <tr key={index}>{rowData}</tr>;
  });

  return (
    <Card>
      <Card.Header className="customized-card-header">{props.title || ""}</Card.Header>
      <Table size="sm" striped borderless>
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    </Card>
  );
};

export default CardWithTable;

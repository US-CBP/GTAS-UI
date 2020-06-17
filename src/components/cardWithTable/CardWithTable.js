import React from "react";
import { Card, Table } from "react-bootstrap";
import "./CardWithTable.scss";
import { asArray } from "../../utils/utils";

const CardWithTable = props => {
  const data = asArray(props.data); //[{key:value}]
  const headers = props.headers || {}; //{key:value}
  const cb = props.callback ? props.callback : () => {}; //callback may not be passed as a prop

  const tableHeaders = Object.keys(headers).map(key => {
    return <th key={key}>{headers[key]}</th>;
  });

  const tableRows = data.map((row, index) => {
    const tableData = Object.keys(headers).map(key => {
      return <td key={key}>{row[key]}</td>;
    });

    return (
      <tr key={index} onClick={() => cb(row.key)}>
        {tableData}
      </tr>
    );
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

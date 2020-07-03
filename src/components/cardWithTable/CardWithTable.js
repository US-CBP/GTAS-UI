import React from "react";
import { Card, Table, Popover, OverlayTrigger } from "react-bootstrap";
import "./CardWithTable.scss";
import { asArray, hasData } from "../../utils/utils";

const CardWithTable = props => {
  const data = asArray(props.data); //[{key:value}]
  const headers = props.headers || {}; //{key:value}
  const cb = props.callback ? props.callback : () => {}; //callback may not be passed as a prop
  const textDisplayLimit = 20;

  const isShortText = text => {
    return !hasData(text) || text.toString().length <= textDisplayLimit ? true : false;
  };

  // truncate long text for display in the card. Full text will be in a popover
  const getShortText = text => {
    if (isShortText(text)) return text;

    return `${text.toString().substr(0, textDisplayLimit - 4)} ...`;
  };

  const getPopover = content => {
    return (
      <Popover id="popover-basic">
        <Popover.Content>{content}</Popover.Content>
      </Popover>
    );
  };

  const tableHeaders = Object.keys(headers).map(key => {
    return <th key={key}>{headers[key]}</th>;
  });

  const tableRows = data.map((row, index) => {
    const tableData = Object.keys(headers).map(key => {
      const td = row[key];
      const triggerOverlay = !isShortText(td);
      return (
        <OverlayTrigger
          trigger={triggerOverlay ? ["click"] : ""}
          rootClose
          key={key}
          placement="top"
          overlay={getPopover(td)}
        >
          <td className={triggerOverlay ? "aslink" : ""}>{getShortText(td)}</td>
        </OverlayTrigger>
      );
    });

    return (
      <tr key={index} onClick={() => cb(row.key)}>
        {tableData}
      </tr>
    );
  });

  return (
    <Card className="card-with-table">
      <Card.Header className="customized-card-header">{props.title || ""}</Card.Header>
      <Table size="sm" striped borderless hover responsive>
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    </Card>
  );
};

export default CardWithTable;

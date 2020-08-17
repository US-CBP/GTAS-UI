import React from "react";
import Title from "../../components/title/Title";
import { Card, CardDeck } from "react-bootstrap";
import { asArray, getEndpoint } from "../../utils/utils";
import "./Tools.css";

const Tools = props => {
  const children = props.children?.props?.children;
  const tiles = asArray(children).filter(child => child.props.hideTile !== true);

  if (getEndpoint(props.location?.pathname) === "tools")
    return (
      <>
        <Title title="Tools" />

        <CardDeck className="page-deck">
          {tiles.map(info => {
            const data = info.props;
            return (
              <Card className="page-tiles" key={data.path}>
                <Card.Body>
                  <Card.Title className="nowrap">
                    <Card.Link href={`tools/${data.path}`}>
                      <i className={`fa ${data.icon}`}></i>
                      {`  ${data.name}`}
                    </Card.Link>
                  </Card.Title>
                  <Card.Link href={`tools/${data.path}`} className="page-card-link">
                    <Card.Text>{data.desc}</Card.Text>
                  </Card.Link>
                </Card.Body>
              </Card>
            );
          })}
        </CardDeck>
      </>
    );

  return <>{props.children}</>;
};

export default Tools;

import React from "react";
import Title from "../../components/title/Title";
import Xid from "../../components/xid/Xid";
import { Card, CardDeck } from "react-bootstrap";
import { asArray, getEndpoint } from "../../utils/utils";
import { Link } from "@reach/router";
import "./Tools.css";

const Tools = props => {
  const children = props.children?.props?.children;
  const tiles = asArray(children).filter(child => child.props.hideTile !== true);

  if (getEndpoint(props.location?.pathname) === "tools")
    return (
      <>
        <Title title={<Xid xid="10">Tools</Xid>} />

        <div className="container">
          <CardDeck className="page-deck">
            {tiles.map(info => {
              const data = info.props;
              return (
                <Card className="page-tiles card-shadow" key={data.path}>
                  <Link to={data.path} className="card-link">
                    <Card.Body>
                      <Card.Title className="nowrap">
                        <i className={`fa fa-3x ${data.icon}`}></i>
                      </Card.Title>
                      <div className="card-overlay">{data.name}</div>
                      <div className="card-description">
                        <Card.Text>{data.desc}</Card.Text>
                      </div>
                    </Card.Body>
                  </Link>
                </Card>
              );
            })}
          </CardDeck>
        </div>
      </>
    );

  return <>{props.children}</>;
};

export default Tools;

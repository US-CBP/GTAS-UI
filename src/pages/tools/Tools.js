import React from "react";
import Title from "../../components/title/Title";
import { Card, CardDeck, Container } from "react-bootstrap";
import { asArray, getEndpoint } from "../../utils/utils";
import "./Tools.css";

const Tools = props => {
  const children = props.children?.props?.children;

  const tiles = asArray(children).filter(child => child.props.hideTile !== true);

  if (getEndpoint(props.location?.pathname) === "tools")
    return (
      <>
        <Title title="Tools" />

        <CardDeck className="tools-deck">
          {tiles.map(info => {
            // if (info.props.hideTile) return <></>;
            return (
              <Card className="tools-tiles" key={info.props.path}>
                <Card.Body>
                  <Card.Title>
                    <Card.Link href={`tools/${info.props.path}`}>
                      {info.props.name}
                    </Card.Link>
                  </Card.Title>
                  <Card.Link
                    href={`tools/${info.props.path}`}
                    className="tools-text-link"
                  >
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
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

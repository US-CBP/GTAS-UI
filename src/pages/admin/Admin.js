import React from "react";
import Title from "../../components/title/Title";
import { Card, CardDeck, Container } from "react-bootstrap";
import { hasData, getEndpoint } from "../../utils/utils";
import "./Admin.css";

const Admin = props => {
  const children = props.children?.props?.children;

  console.log(children);

  if (getEndpoint(props.location?.pathname) === "admin")
    return (
      <CardDeck className="admin-deck">
        {children.map(info => {
          return (
            <Card className="admin-tiles">
              <Card.Body className="dash-card-body">
                <Card.Title>
                  <Card.Link href={`admin/${info.props.path}`}>
                    {info.props.name}
                  </Card.Link>
                </Card.Title>
                <Card.Link href={`admin/${info.props.path}`} className="admin-text-link">
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
    );

  return <>{props.children}</>;
};

export default Admin;

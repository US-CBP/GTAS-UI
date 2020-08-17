import React from "react";
import Title from "../../components/title/Title";
import { Card, CardDeck, Container } from "react-bootstrap";
import { hasData, getEndpoint } from "../../utils/utils";
import "./Admin.css";

const Admin = props => {
  const children = props.children?.props?.children;

  if (getEndpoint(props.location?.pathname) === "admin")
    return (
      <>
        <Title title="Admin" />

        <CardDeck className="admin-deck">
          {children.map(info => {
            const data = info.props;
            return (
              <Card className="admin-tiles" key={data.path}>
                <Card.Body>
                  <Card.Title className="nowrap">
                    <Card.Link href={`admin/${data.path}`}>
                      <i className={`fa ${data.icon}`}></i>
                      {`  ${data.name}`}
                    </Card.Link>
                  </Card.Title>
                  <Card.Link href={`admin/${data.path}`} className="admin-text-link">
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

export default Admin;

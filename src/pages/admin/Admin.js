import React from "react";
import Title from "../../components/title/Title";
import { Card, CardDeck, Container } from "react-bootstrap";
import { hasData, getEndpoint } from "../../utils/utils";
import { Link } from "@reach/router";
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
                    <Link to={data.path} className="card-link">
                      <i className={`fa ${data.icon}`}></i>
                      {`  ${data.name}`}
                    </Link>
                  </Card.Title>
                  <div className="admin-text-link">
                    <Link to={data.path} className="card-link page-card-link">
                      <Card.Text>{data.desc}</Card.Text>
                    </Link>
                  </div>
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

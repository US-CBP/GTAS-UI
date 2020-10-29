import React from "react";
import Title from "../../components/title/Title";
import Xl8 from "../../components/xl8/Xl8";
import Main from "../../components/main/Main";
import ExternalLink from "../../components/externalLink/ExternalLink";
import { Card, CardDeck, Container } from "react-bootstrap";
import { hasData, getEndpoint } from "../../utils/utils";
import { Link } from "@reach/router";
import "./Admin.css";

const Admin = props => {
  const children = props.children?.props?.children;

  if (getEndpoint(props.location?.pathname) === "admin")
    return (
      <Main className="full-cards">
        <Title title={<Xl8 xid="adm001">Admin</Xl8>} />
        <CardDeck className="page-deck">
          {children.map(info => {
            const data = info.props;
            return (
              <Card className="page-tiles" key={data.path}>
                {data.hasExternalLink ? (
                  <ExternalLink to={data.path} className="card-link">
                    <Card.Body>
                      <Card.Title className="nowrap text-center">
                        <i className={`fa fa-3x ${data.icon}`}></i>
                      </Card.Title>
                      <div className="text-center text-muted m-3">{data.name}</div>
                    </Card.Body>
                    <Card.Footer>
                      <div className="card-description">
                        <Card.Text>{data.desc}</Card.Text>
                      </div>
                    </Card.Footer>
                  </ExternalLink>
                ) : (
                  <Link to={data.path} className="card-link">
                    <Card.Body>
                      <Card.Title className="nowrap text-center">
                        <i className={`fa fa-3x ${data.icon}`}></i>
                      </Card.Title>
                      <div className="text-center text-muted m-3">{data.name}</div>
                    </Card.Body>
                    <Card.Footer>
                      <div className="card-description">
                        <Card.Text>{data.desc}</Card.Text>
                      </div>
                    </Card.Footer>
                  </Link>
                )}
              </Card>
            );
          })}
        </CardDeck>
      </Main>
    );

  return <>{props.children}</>;
};

export default Admin;

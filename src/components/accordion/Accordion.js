// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import Content from "./content/Content";
import { Accordion as RBAccordion } from "react-bootstrap";
import "./Accordion.scss";

const Accordion = props => {
  const getContent = cardData => {
    return cardData.map(data => {
      return <Content header={data.header} body={data.body} key={data.header} />;
    });
  };

  return <RBAccordion>{getContent(props.data)}</RBAccordion>;
};

export default Accordion;

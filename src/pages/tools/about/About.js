// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import Title from "../../../components/title/Title";
import Main from "../../../components/main/Main";
import Xl8 from "../../../components/xl8/Xl8";

import ReactMarkdown from "react-markdown";
import Scrollspy from "react-scrollspy";
import { asArray } from "../../../utils/utils";
import raw from "./config";

import { Col } from "react-bootstrap";
import "./About.css";

const About = () => {
  return (
    <>
      <div className="about-sidenav">
        <Scrollspy
          items={raw.map(item => item.id)}
          currentClassName="is-current"
          rootEl="#about-container"
        >
          {asArray(raw).map(item => {
            return (
              <a className="toc" href={`#${item.id}`}>
                {item.id}
              </a>
            );
          })}
        </Scrollspy>
      </div>

      <Main className="main bg-white">
        <Title title={<Xl8 xid="abt001">About</Xl8>}></Title>
        <div className="about-container" id="about-container">
          {asArray(raw).map(item => {
            return (
              <section id={item.id}>
                <ReactMarkdown children={item.val} key={item.id}></ReactMarkdown>
              </section>
            );
          })}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Main>
    </>
  );
};

export default About;

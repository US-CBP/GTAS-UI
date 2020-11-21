import React from "react";
import Title from "../../../components/title/Title";
import Main from "../../../components/main/Main";
import Xl8 from "../../../components/xl8/Xl8";

import ReactMarkdown from "react-markdown";

import { asArray } from "../../../utils/utils";
import raw from "./config";

import { Col } from "react-bootstrap";
import "./About.css";

const About = () => {
  return (
    <>
      <Col>
        <div className="about-sidenav">
          <div id="list-example" class="about list-group">
            <a href="#md0">1.14.0</a>
            <a href="#md0">1.13.3</a>
            <a href="#md0">1.13.2</a>
            <a href="#md0">1.13.1</a>
            <a href="#md0">1.13.0</a>
          </div>
        </div>
      </Col>

      <Main className="main bg-white">
        <Title title={<Xl8 xid="abt001">About</Xl8>}></Title>
        <div
          data-spy="scroll"
          data-target="#list-example"
          data-offset="0"
          className="scrollspy-example about-container"
        >
          {asArray(raw).map(item => {
            return (
              <ReactMarkdown
                children={item.val}
                id={item.id}
                key={item.id}
              ></ReactMarkdown>
            );
          })}
        </div>
      </Main>
    </>
  );
};

export default About;

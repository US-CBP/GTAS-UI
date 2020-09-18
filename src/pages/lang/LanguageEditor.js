import React from "react";
import Title from "../../components/title/Title";
import Xid from "../../components/xid/Xid";
// import { Link } from "./node_modules/@reach/router";

const LanguageEditor = () => {
  return (
    <div className="container">
      <Title title={<Xid xid="0">Language Editor</Xid>}></Title>

      <div className="columns">
        <div className="column">
          <div className="box2">
            <div className="top"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageEditor;

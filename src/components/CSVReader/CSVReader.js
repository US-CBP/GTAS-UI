// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useRef, useState } from "react";
import Xl8 from "../xl8/Xl8";
import { CSVReader as RCSVReader } from "react-papaparse";
import { Button } from "react-bootstrap";

const CSVReader = props => {
  const buttonRef = useRef();

  const handleOpenDialog = e => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };
  const onFileLoad = data => {
    props.callback(data);
  };
  const onError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  useState(() => {
    handleOpenDialog(props.file);
  }, []);

  return (
    <RCSVReader
      ref={buttonRef}
      onFileLoad={onFileLoad}
      onError={onError}
      noDrag
      noProgressBar
      config={{ header: true }}
    >
      {({ file }) => (
        <div onClick={handleOpenDialog}>
          <i className="fa fa-upload" />
        </div>
      )}
    </RCSVReader>
  );
};

CSVReader.propTypes = {};

export default CSVReader;

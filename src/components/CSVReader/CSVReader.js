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
          <Xl8 xid="csv001">Import CSV</Xl8>
        </div>
      )}
    </RCSVReader>
  );
};

CSVReader.propTypes = {};

export default CSVReader;

import React, { useRef } from "react";
import PropTypes from "prop-types";
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
        <Button variant="outline-info" onClick={handleOpenDialog}>
          Import CSV
        </Button>
      )}
    </RCSVReader>
  );
};

CSVReader.propTypes = {};

export default CSVReader;

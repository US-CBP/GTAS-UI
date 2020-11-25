import React, { useState, useEffect } from "react";
import Graph from "../../../components/graph/Graph";
import ErrorBoundary from "../../../components/errorBoundary/ErrorBoundary";

const LinkAnalysis = props => {
  const [graph, setGraph] = useState(<></>);

  useEffect(() => {
    setGraph(<Graph paxData={props.paxData}></Graph>);
  }, []);

  return (
    <div className="one-column-grid-container">
      <ErrorBoundary message="something went wrong here ...">{graph}</ErrorBoundary>
    </div>
  );
};

export default LinkAnalysis;

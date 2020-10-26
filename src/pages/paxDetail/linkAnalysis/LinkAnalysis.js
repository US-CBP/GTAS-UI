import React from "react";
import Graph from "../../../components/graph/Graph";
import ErrorBoundary from "../../../components/errorBoundary/ErrorBoundary";

const LinkAnalysis = props => {
  return (
    <div className="one-column-container">
      <ErrorBoundary message="something went wrong here ...">
        <Graph paxData={props.paxData}></Graph>
      </ErrorBoundary>
    </div>
  );
};

export default LinkAnalysis;

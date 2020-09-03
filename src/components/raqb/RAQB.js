import React, { useState } from "react";
import {
  Query,
  Builder,
  BasicConfig,
  Utils as QbUtils
} from "react-awesome-query-builder";
import "react-awesome-query-builder/lib/css/styles.css";
import { fieldConfig, testOp } from "./constants";
import { importToTreeObject, exportToQueryObject } from "./utils";

const additionalOperators = [
  "equal",
  "not_equal",
  "is_empty",
  "is_not_empty",
  "like",
  "not_like",
  "starts_with",
  "not_starts_with",
  "not_ends_with",
  "ends_with",
  "in",
  "not_in"
];

let initconfig = { ...BasicConfig, ...fieldConfig };
initconfig.operators = { ...initconfig.operators, ...testOp };

// initconfig.types.text.widgets.text.operators = {
//   ...initconfig.types.text.widgets.text.operators,
//   ...additionalOperators
// };

console.log(initconfig);

// const types = {
//   text: {
//     defaultOperator: "equal",
//     widgets: {
//       text: {
// operators: [
//   "equal",
//   "not_equal",
//   "is_empty",
//   "is_not_empty",
//   "like",
//   "not_like",
//   "starts_with",
//   "not_starts_with",
//   "not_ends_with",
//   "ends_with",
//   "in",
//   "not_in"
// ];

//         }}}}

const queryValue = { id: QbUtils.uuid(), type: "group" };

const RAQB = props => {
  const convertedInput = props.data ? importToTreeObject(props.data) : queryValue;
  console.log(convertedInput);

  const inputTree = QbUtils.checkTree(QbUtils.loadTree(convertedInput), initconfig);
  const [tree, setTree] = useState(inputTree);
  const [config, setConfig] = useState(initconfig);

  const renderBuilder = props => (
    <div className="query-builder-container" style={{ padding: "10px" }}>
      <div className="query-builder">
        <Builder {...props} />
      </div>
    </div>
  );

  const renderResult = ({ tree: immutableTree, config }) => (
    <div className="query-builder-result">
      <div>
        Tree??:
        <pre>{JSON.stringify(QbUtils.getTree(immutableTree, config))}</pre>
      </div>
    </div>
  );

  const onChange = (immutableTree, cfg) => {
    setTree(immutableTree);
    setConfig(cfg);
    const exportedObj = exportToQueryObject(QbUtils.getTree(immutableTree, cfg), true);

    console.log(exportedObj);
    console.log(config, cfg);
    props.dataCallback(exportedObj);
  };

  return (
    <div>
      <Query {...config} value={tree} onChange={onChange} renderBuilder={renderBuilder} />
      {renderResult({ tree: tree, config: config })}
    </div>
  );
};

export default RAQB;

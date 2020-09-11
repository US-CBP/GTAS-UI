import React, { useState, useEffect } from "react";
import {
  Query,
  Builder,
  BasicConfig,
  Utils as QbUtils
} from "react-awesome-query-builder";
import "react-awesome-query-builder/lib/css/styles.css";
import Loading from "../../components/loading/Loading";
import { operators } from "./config";
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

let queryValue = {
  id: QbUtils.uuid(),
  type: "group"
};

// let outer = {
//   type: "rule",
//   properties: { field: null, operator: null, value: [], valueSrc: [] }
// };

// queryValue.children1[QbUtils.uuid()] = outer;

const RAQB = props => {
  const dataConfig = props.config;
  let initconfig = { ...BasicConfig, ...dataConfig };
  initconfig.operators = { ...operators };
  initconfig.types.text.widgets.text.operators = additionalOperators;
  initconfig.settings.addRuleLabel = "Add Condition";
  initconfig.settings.showNot = true;
  initconfig.settings.customFieldSelectProps = { showSearch: true };

  const convertedInput = props.data ? importToTreeObject(props.data) : queryValue;
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

  // const renderResult = ({ tree: immutableTree, config }) => (
  //   <div className="query-builder-result">
  //     <div>
  //       <pre>{JSON.stringify(QbUtils.getTree(immutableTree, config))}</pre>
  //     </div>
  //     <div>
  //       Query string:{" "}
  //       <pre>{JSON.stringify(QbUtils.queryString(immutableTree, config))}</pre>
  //     </div>
  //   </div>
  // );

  const onChange = (immutableTree, cfg) => {
    setTree(immutableTree);
    const exportedObj = exportToQueryObject(QbUtils.getTree(immutableTree, config), true);

    props.dataCallback(exportedObj);
  };

  return (
    <div>
      <Query {...config} value={tree} onChange={onChange} renderBuilder={renderBuilder} />
      {/* {renderResult({ tree: tree, config: config })} */}
    </div>
  );
};

export default RAQB;

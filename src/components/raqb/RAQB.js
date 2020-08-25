import React, { useState } from "react";
import {
  Query,
  Builder,
  BasicConfig,
  Utils as QbUtils
} from "react-awesome-query-builder";
import "react-awesome-query-builder/lib/css/styles.css";
// import "react-awesome-query-builder/lib/css/compact_styles.css"; //optional, for more compact styles

const InitialConfig = BasicConfig;

// You need to provide your own config. See below 'Config format'
const initconfig = {
  ...InitialConfig,
  fields: {
    qty: {
      label: "Qty",
      type: "number",
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    price: {
      label: "Price",
      type: "number",
      valueSources: ["value"],
      fieldSettings: {
        min: 10,
        max: 100
      },
      preferWidgets: ["slider", "rangeslider"]
    },
    color: {
      label: "Color",
      type: "select",
      valueSources: ["value"],
      fieldSettings: {
        listValues: [
          { value: "yellow", title: "Yellow" },
          { value: "green", title: "Green" },
          { value: "orange", title: "Orange" }
        ]
      }
    },
    is_promotion: {
      label: "Promo?",
      type: "boolean",
      operators: ["equal"],
      valueSources: ["value"]
    }
  }
};

const fakedata = {
  id: "9a8aa8ba-0123-4456-b89a-b174228f14fd",
  type: "group",
  path: ["9a8aa8ba-0123-4456-b89a-b174228f14fd"],
  children1: {
    "9b89bba9-89ab-4cde-b012-3174228fc7d4": {
      type: "rule",
      id: "9b89bba9-89ab-4cde-b012-3174228fc7d4",
      properties: {
        field: "qty",
        operator: "between",
        value: [21, 41],
        valueSrc: ["value", null],
        operatorOptions: null,
        valueType: ["number", "number"]
      },
      path: [
        "9a8aa8ba-0123-4456-b89a-b174228f14fd",
        "9b89bba9-89ab-4cde-b012-3174228fc7d4"
      ]
    },
    "89ab8baa-4567-489a-bcde-f17422910b01": {
      type: "rule",
      id: "89ab8baa-4567-489a-bcde-f17422910b01",
      properties: {
        field: "price",
        operator: "equal",
        value: [31],
        valueSrc: ["value"],
        operatorOptions: null,
        valueType: ["number"]
      },
      path: [
        "9a8aa8ba-0123-4456-b89a-b174228f14fd",
        "89ab8baa-4567-489a-bcde-f17422910b01"
      ]
    },
    "8ab9bb8b-0123-4456-b89a-b1742291ac89": {
      type: "group",
      id: "8ab9bb8b-0123-4456-b89a-b1742291ac89",
      properties: { conjunction: "OR" },
      path: [
        "9a8aa8ba-0123-4456-b89a-b174228f14fd",
        "8ab9bb8b-0123-4456-b89a-b1742291ac89"
      ],
      children1: {
        "88b8ba99-cdef-4012-b456-71742291ac89": {
          type: "rule",
          id: "88b8ba99-cdef-4012-b456-71742291ac89",
          properties: {
            field: "color",
            operator: "select_not_equals",
            value: ["yellow"],
            valueSrc: ["value"],
            operatorOptions: null,
            valueType: ["select"]
          },
          path: [
            "9a8aa8ba-0123-4456-b89a-b174228f14fd",
            "8ab9bb8b-0123-4456-b89a-b1742291ac89",
            "88b8ba99-cdef-4012-b456-71742291ac89"
          ]
        },
        "888bb9ba-89ab-4cde-b012-31742291d951": {
          type: "rule",
          id: "888bb9ba-89ab-4cde-b012-31742291d951",
          properties: {
            field: "is_promotion",
            operator: "equal",
            value: [true],
            valueSrc: ["value"],
            operatorOptions: null,
            valueType: ["boolean"]
          },
          path: [
            "9a8aa8ba-0123-4456-b89a-b174228f14fd",
            "8ab9bb8b-0123-4456-b89a-b1742291ac89",
            "888bb9ba-89ab-4cde-b012-31742291d951"
          ]
        }
      }
    }
  },
  properties: { conjunction: "AND" }
};

const fakejsonlogic = {
  errors: [],
  logic: { and: [{ "==": [{ var: "price" }, 65] }] },
  data: { price: null }
};

const fakelogic = {
  and: [
    { "==": [{ var: "qty" }, 31] },
    { in: [{ var: "color" }, ["green"]] },
    { "<=": [14, { var: "qty" }, 16] }
  ]
};
const queryValue = { id: QbUtils.uuid(), type: "group" };

const RAQB = props => {
  const foo = QbUtils.checkTree(
    QbUtils.loadFromJsonLogic(fakelogic, initconfig),
    initconfig
  );

  console.log(foo);
  // console.log(QbUtils.loadTree(foo, initconfig));

  const [tree, setTree] = useState(
    foo
    // QbUtils.checkTree(QbUtils.loadTree(queryValue), initconfig) // load tree data
    // QbUtils.loadFromJsonLogic(fakejsonlogic, initconfig) // load json data
  );

  const [config, setConfig] = useState(initconfig);

  const renderBuilder = props => (
    <div className="query-builder-container" style={{ padding: "10px" }}>
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  );

  const renderResult = ({ tree: immutableTree, config }) => (
    <div className="query-builder-result">
      {/* <div>
        Query string:{" "}
        <pre>{JSON.stringify(QbUtils.queryString(immutableTree, config))}</pre>
      </div>
      <div>
        MongoDb query:{" "}
        <pre>{JSON.stringify(QbUtils.mongodbFormat(immutableTree, config))}</pre>
      </div>
      <div>
        SQL where: <pre>{JSON.stringify(QbUtils.sqlFormat(immutableTree, config))}</pre>
      </div> */}
      <div>
        JsonLogic:
        <pre>{JSON.stringify(QbUtils.jsonLogicFormat(immutableTree, config))}</pre>
      </div>
      <div>
        Tree??:
        <pre>{JSON.stringify(QbUtils.getTree(immutableTree, config))}</pre>
      </div>
    </div>
  );

  const onChange = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    setTree(immutableTree);
    setConfig(config);

    const jsonTree = QbUtils.getTree(immutableTree);
    console.log(jsonTree);
    // `jsonTree` can be saved to backend, and later loaded to `queryValue`
  };

  return (
    <div>
      <Query {...config} value={tree} onChange={onChange} renderBuilder={renderBuilder} />
      {renderResult({ tree: tree, config: config })}
    </div>
  );
};

export default RAQB;

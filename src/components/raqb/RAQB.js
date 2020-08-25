import React, { useState } from "react";
import {
  Query,
  Builder,
  BasicConfig,
  Utils as QbUtils
} from "react-awesome-query-builder";
import "react-awesome-query-builder/lib/css/styles.css";
import { FIELDS } from "./constants";
// import "react-awesome-query-builder/lib/css/compact_styles.css"; //optional, for more compact styles

const InitialConfig = BasicConfig;

const initconfig = {
  ...InitialConfig,
  fields: {
    address: {
      label: "Address",
      type: "!group",
      subfields: FIELDS.addressFields
    },
    bag: {
      label: "Bag",
      type: "!group",
      subfields: FIELDS.bagFields
    },
    creditCard: {
      label: "Credit Card",
      type: "!group",
      subfields: FIELDS.creditcardFields
    },
    document: {
      label: "Document",
      type: "!group",
      subfields: FIELDS.documentFields
    },
    email: {
      label: "Email",
      type: "!group",
      subfields: FIELDS.emailFields
    },
    flight: {
      label: "Flight",
      type: "!group",
      subfields: FIELDS.flightFields
    },
    bookingDetail: {
      label: "Flight Leg",
      type: "!group",
      subfields: FIELDS.legFields
    },
    passenger: {
      label: "Passenger",
      type: "!group",
      subfields: FIELDS.passengerFields
    },
    seat: {
      label: "Seat",
      type: "!group",
      subfields: FIELDS.seatFields
    },
    pnr: {
      label: "PNR",
      type: "!group",
      subfields: FIELDS.pnrFields
    },
    payment: {
      label: "Form of Payment",
      type: "!group",
      subfields: FIELDS.paymentFields
    },
    phone: {
      label: "Phone",
      type: "!group",
      subfields: FIELDS.phoneFields
    },
    dwellTime: {
      label: "Dwell Time",
      type: "!group",
      subfields: FIELDS.dwelltimeFields
    },
    acgency: {
      label: "Agency",
      type: "!group",
      subfields: FIELDS.agencyFields
    },
    user: {
      label: "User",
      type: "text",
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    price: {
      label: "Price",
      type: "number",
      valueSources: ["value"],
      fieldSettings: {
        min: 10,
        max: 100
      },
      preferWidgets: ["number"]
    },
    color: {
      label: "Color",
      type: "select",
      valueSources: ["value"],
      fieldSettings: {
        listValues: [
          { value: "yellow", title: "Yellow" },
          { value: "green", title: "Green" },
          { value: "red", title: "Red" },
          { value: "brown", title: "Brown" },
          { value: "black", title: "Black" },
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
  id: "b8bb9bb9-0123-4456-b89a-b17427779e38",
  type: "group",
  children1: {
    "89bb99aa-cdef-4012-b456-71742777c700": {
      type: "rule",
      properties: {
        field: "user",
        operator: "equal",
        value: ["ASDASDADSDFSD"],
        valueSrc: ["value"],
        valueType: ["text"]
      }
    },
    "bb9b89ba-89ab-4cde-b012-31742777ffc9": {
      type: "rule",
      properties: {
        field: "color",
        operator: "select_any_in",
        value: [["yellow", "red"]],
        valueSrc: ["value"],
        valueType: ["multiselect"]
      }
    },
    "ba8b99ab-0123-4456-b89a-b1742778b9e7": {
      type: "group",
      properties: { conjunction: "OR", not: true },
      children1: {
        "a9a89988-cdef-4012-b456-71742778b9e9": {
          type: "rule",
          properties: {
            field: "price",
            operator: "is_empty",
            value: [],
            valueSrc: [],
            valueType: []
          }
        },
        "9b999bbb-89ab-4cde-b012-31742778dce6": {
          type: "rule",
          properties: {
            field: "price",
            operator: "less",
            value: [18],
            valueSrc: ["value"],
            valueType: ["number"]
          }
        }
      }
    },
    "aa88aba8-4567-489a-bcde-f174277a9963": {
      type: "rule",
      properties: {
        field: "user",
        operator: "ends_with",
        value: ["ocka"],
        valueSrc: ["value"],
        valueType: ["text"]
      }
    }
  },
  properties: { conjunction: "AND" }
};

const fakedatanoids = {
  id: 1,
  type: "group",
  children1: {
    2: {
      type: "rule",
      properties: {
        field: "user",
        operator: "equal",
        value: ["ASDASDADSDFSD"],
        valueSrc: ["value"],
        valueType: ["text"]
      }
    },
    3: {
      type: "rule",
      properties: {
        field: "color",
        operator: "select_any_in",
        value: [["yellow", "red"]],
        valueSrc: ["value"],
        valueType: ["multiselect"]
      }
    },
    4: {
      type: "group",
      properties: { conjunction: "OR", not: true },
      children1: {
        5: {
          type: "rule",
          properties: {
            field: "price",
            operator: "is_empty",
            value: [],
            valueSrc: [],
            valueType: []
          }
        },
        6: {
          type: "rule",
          properties: {
            field: "price",
            operator: "less",
            value: [18],
            valueSrc: ["value"],
            valueType: ["number"]
          }
        }
      }
    },
    7: {
      type: "rule",
      properties: {
        field: "user",
        operator: "ends_with",
        value: ["ocka"],
        valueSrc: ["value"],
        valueType: ["text"]
      }
    }
  },
  properties: { conjunction: "AND" }
};

const fakelogic = {
  and: [
    { "==": [{ var: "qty" }, 31] },
    { in: [{ var: "color" }, ["green"]] },
    { "<=": [14, { var: "qty" }, 16] }
  ]
};
const queryValue = { id: QbUtils.uuid(), type: "group" };

const fakeraw = {
  status: "SUCCESS",
  message: "GET UDR by ID was successful",
  result: {
    id: 14032,
    details: {
      "@class": "gov.gtas.model.udr.json.QueryObject",
      condition: "AND",
      rules: [
        {
          "@class": "QueryTerm",
          entity: "CreditCard",
          field: "cardType",
          type: "string",
          operator: "EQUAL",
          value: ["AX"],
          uuid: null
        },
        {
          "@class": "QueryObject",
          condition: "OR",
          rules: [
            {
              "@class": "QueryTerm",
              entity: "Passenger",
              field: "passengerDetails.lastName",
              type: "string",
              operator: "EQUAL",
              value: ["RIDDLE"],
              uuid: null
            },
            {
              "@class": "QueryTerm",
              entity: "Passenger",
              field: "passengerDetails.lastName",
              type: "string",
              operator: "EQUAL",
              value: ["MARVIN"],
              uuid: null
            }
          ]
        },
        {
          "@class": "QueryTerm",
          entity: "Flight",
          field: "flightNumber",
          type: "string",
          operator: "EQUAL",
          value: ["0232"],
          uuid: null
        }
      ]
    },
    summary: {
      title: "MARVIN OR RIDDLE 2",
      description: "copy",
      ruleCat: 3,
      startDate: 1598227200000,
      endDate: null,
      author: "BALAWEA",
      enabled: true,
      overMaxHits: false
    }
  },
  responseDetails: []
};

const RAQB = props => {
  const jsonlogic = QbUtils.checkTree(
    QbUtils.loadFromJsonLogic(fakelogic, initconfig),
    initconfig
  );

  const initvalue = QbUtils.checkTree(QbUtils.loadTree(queryValue), initconfig);
  const fakeimmutable = QbUtils.checkTree(QbUtils.loadTree(fakedatanoids), initconfig);

  // console.log(QbUtils.loadTree(foo, initconfig));

  const [tree, setTree] = useState(
    fakeimmutable
    // jsonlogic
  );

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
      {/* <div>
        Query string:{" "}
        <pre>{JSON.stringify(QbUtils.queryString(immutableTree, config))}</pre>
      </div>
      <div>
        MongoDb query:{" "}
        <pre>{JSON.stringify(QbUtils.mongodbFormat(immutableTree, config))}</pre>
      </div> */}
      <div>
        SQL where: <pre>{JSON.stringify(QbUtils.sqlFormat(immutableTree, config))}</pre>
      </div>
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

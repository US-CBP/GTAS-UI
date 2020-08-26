import React, { useState } from "react";
import {
  Query,
  Builder,
  BasicConfig,
  Utils as QbUtils
} from "react-awesome-query-builder";
import "react-awesome-query-builder/lib/css/styles.css";
import { FIELDS } from "./constants";
import { importQueryObject } from "./utils";

const InitialConfig = BasicConfig;

const initconfig = {
  ...InitialConfig,
  fields: {
    Address: {
      label: "Address",
      type: "!group",
      subfields: FIELDS.addressFields
    },
    Bag: {
      label: "Bag",
      type: "!group",
      subfields: FIELDS.bagFields
    },
    CreditCard: {
      label: "Credit Card",
      type: "!group",
      subfields: FIELDS.creditCardFields
    },
    Document: {
      label: "Document",
      type: "!group",
      subfields: FIELDS.documentFields
    },
    Email: {
      label: "Email",
      type: "!group",
      subfields: FIELDS.emailFields
    },
    Flight: {
      label: "Flight",
      type: "!group",
      subfields: FIELDS.flightFields
    },
    BookingDetail: {
      label: "Flight Leg",
      type: "!group",
      subfields: FIELDS.legFields
    },
    Passenger: {
      label: "Passenger",
      type: "!group",
      subfields: FIELDS.passengerFields
    },
    Seat: {
      label: "Seat",
      type: "!group",
      subfields: FIELDS.seatFields
    },
    Pnr: {
      label: "PNR",
      type: "!group",
      subfields: FIELDS.pnrFields
    },
    PaymentForm: {
      label: "Form of Payment",
      type: "!group",
      subfields: FIELDS.paymentFormFields
    },
    Phone: {
      label: "Phone",
      type: "!group",
      subfields: FIELDS.phoneFields
    },
    DwellTime: {
      label: "Dwell Time",
      type: "!group",
      subfields: FIELDS.dwellTimeFields
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

const fakerawinput = {
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

const fakedatanoids = {
  id: 1,
  type: "group",
  children1: {
    "2": {
      type: "rule_group",
      properties: { conjunction: "AND", field: "CreditCard" },
      children1: {
        "a88988b8-4567-489a-bcde-f1742c0d680d": {
          type: "rule",
          properties: {
            field: "CreditCard.cardType",
            operator: "equal",
            value: ["AX"],
            valueSrc: ["value"],
            valueType: ["text"]
          }
        }
      }
    },
    "3": {
      type: "rule_group",
      properties: { conjunction: "AND", field: "Address" },
      children1: {
        "8a8b98ab-0123-4456-b89a-b1742c0ef472": {
          type: "rule",
          properties: {
            field: "Address.city",
            operator: "equal",
            value: ["CHICAGO"],
            valueSrc: ["value"],
            valueType: ["text"]
          }
        }
      }
    },
    "4": {
      type: "group",
      properties: { conjunction: "OR", not: true },
      children1: {
        "5": {
          type: "rule_group",
          properties: { conjunction: "AND", field: "Seat" },
          children1: {
            "b8aaabbb-cdef-4012-b456-71742c0f685b": {
              type: "rule",
              properties: {
                field: "Seat.apis",
                operator: "equal",
                value: [true],
                valueSrc: ["value"],
                valueType: ["boolean"]
              }
            }
          }
        },
        "6": {
          type: "rule_group",
          properties: { conjunction: "AND", field: "Passenger" },
          children1: {
            "abbaaa99-89ab-4cde-b012-31742c0f8d97": {
              type: "rule",
              properties: {
                field: "Passenger.passengerDetails.age",
                operator: "between",
                value: [15, 18],
                valueSrc: ["value", null],
                valueType: ["number", "number"]
              }
            }
          }
        }
      }
    },
    "7": {
      type: "rule_group",
      properties: { conjunction: "AND", field: "Document" },
      children1: {
        "8b9888a8-4567-489a-bcde-f1742c0fe982": {
          type: "rule",
          properties: {
            field: "Document.documentType",
            operator: "equal",
            value: ["VISA"],
            valueSrc: ["value"],
            valueType: ["text"]
          }
        }
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

const RAQB = props => {
  const jsonlogic = QbUtils.checkTree(
    QbUtils.loadFromJsonLogic(fakelogic, initconfig),
    initconfig
  );

  const testconversion = importQueryObject(fakerawinput, 1);
  console.log(testconversion);

  const initvalue = QbUtils.checkTree(QbUtils.loadTree(queryValue), initconfig);
  const fakeimmutable = QbUtils.checkTree(QbUtils.loadTree(fakedatanoids), initconfig);

  const [tree, setTree] = useState(
    fakeimmutable
    // initvalue
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

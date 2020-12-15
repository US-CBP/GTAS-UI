const txtops = [
  "equal",
  "not_equal",
  "like",
  "in",
  "not_in",
  "not_like",
  "starts_with",
  "not_starts_with",
  "ends_with",
  "not_ends_with",
  "is_empty",
  "is_not_empty"
];

const dateops = [
  "equal",
  "not_equal",
  "less",
  "less_or_equal",
  "greater",
  "greater_or_equal",
  "between",
  "not_between"
];

export const txtProps = {
  type: "text",
  operators: txtops,
  valueSources: ["value"]
};

export const numProps = {
  type: "number",
  fieldSettings: { min: 0 },
  valueSources: ["value"]
};
export const dateProps = { type: "date", operators: dateops, valueSources: ["value"] };

export const QB = {
  QOTYPEFULL: "gov.gtas.model.udr.json.QueryObject",
  QUERYOBJECT: "QueryObject",
  QUERYTERM: "QueryTerm",
  GROUP: "group",
  RULE: "rule",
  RULEGROUP: "rule_group",
  AND: "AND",
  OR: "OR",
  CLASS: "@class"
};

export const operatorMap = {
  EQUAL: "equal",
  NOT_EQUAL: "not_equal",
  CONTAINS: "like",
  NOT_CONTAINS: "not_like",
  IS_NULL: "is_empty",
  NOT_IS_NULL: "is_not_empty",
  BEGINS_WITH: "starts_with",
  NOT_BEGINS_WITH: "not_starts_with",
  ENDS_WITH: "ends_with",
  BETWEEN: "between",
  NOT_BETWEEN: "not_between",
  GREATER: "greater",
  GREATER_OR_EQUAL: "greater_or_equal",
  LESS: "less",
  LESS_OR_EQUAL: "less_or_equal",
  IN: "in",
  NOT_IN: "not_in",
  MULTI_IN: "multiselect_equals",
  MULTI_NOT_IN: "multiselect_not_equals",

  to_select_any_in: "select_any_in", // force "select_equals" on incoming raw obj
  to_select_equals: "select_equals",
  to_multiselect_equals: "multiselect_equals",
  to_select_not_any_in: "select_not_any_in",
  select_not_equals: "NOT_EQUAL",
  to_select_not_equals: "select_not_equals",

  select_not_any_in: "not_in",
  in: "IN",
  not_in: "NOT_IN",
  equal: "EQUAL",
  select_equals: "EQUAL",
  select_any_in: "IN",
  multiselect_equals: "IN",
  multiselect_not_equals: "NOT_IN",
  not_equal: "NOT_EQUAL",
  like: "CONTAINS",
  not_like: "NOT_CONTAINS",
  is_empty: "IS_NULL",
  is_not_empty: "NOT_IS_NULL",
  starts_with: "BEGINS_WITH",
  not_starts_with: "NOT_BEGINS_WITH",
  ends_with: "ENDS_WITH",
  not_ends_with: "NOT_ENDS_WITH",
  between: "BETWEEN",
  not_between: "NOT_BETWEEN",
  greater: "GREATER",
  greater_or_equal: "GREATER_OR_EQUAL",
  less: "LESS",
  less_or_equal: "LESS_OR_EQUAL"
};

// type conversions for RAQB tree => QueryObject and back
export const valueTypeMap = {
  string: "text",
  to_select: "select", // force "select" on incoming raw obj
  multiselect: "multiselect",
  text: "string",
  date: "date",
  boolean: "boolean",
  integer: "number",
  number: "integer",
  double: "number"
};

// use a select list and allow multiple selections
const getMult = () => {
  return { select: true, multival: true };
};

export const ENTITIESEXT = {
  Address: [
    {
      id: "city",
      type: "string"
    },
    {
      id: "country",
      type: "string",
      ...getMult()
    },
    {
      id: "line1",
      type: "string"
    },
    {
      id: "line2",
      type: "string"
    },
    {
      id: "line3",
      type: "string"
    },
    {
      id: "postalCode",
      type: "string"
    },
    {
      id: "state",
      type: "string"
    }
  ],
  CreditCard: [
    {
      id: "accountHolder",
      type: "string"
    },
    {
      id: "expiration",
      type: "date"
    },
    {
      id: "number",
      type: "string"
    },
    {
      id: "cardType",
      type: "string",
      ...getMult()
    }
  ],
  Document: [
    {
      id: "issuanceCountry",
      type: "string",
      ...getMult()
    },
    {
      id: "expirationDate",
      type: "date"
    },
    {
      id: "issuanceDate",
      type: "date"
    },
    {
      id: "documentNumber",
      type: "string"
    },
    {
      id: "documentType",
      type: "string",
      ...getMult()
    }
  ],
  Email: [
    {
      id: "address",
      type: "string"
    },
    {
      id: "domain",
      type: "string"
    }
  ],
  Flight: [
    {
      id: "destination",
      type: "string",
      ...getMult()
    },
    {
      id: "origin",
      type: "string",
      ...getMult()
    },
    {
      id: "carrier",
      type: "string",
      ...getMult()
    },
    {
      id: "destinationCountry",
      type: "string",
      ...getMult()
    },
    {
      id: "originCountry",
      type: "string",
      ...getMult()
    },
    {
      id: "direction",
      type: "string",
      ...getMult()
    },
    {
      id: "mutableFlightDetails.etaDate",
      type: "date"
    },
    {
      id: "etdDate",
      type: "date"
    },
    {
      id: "flightNumber",
      type: "string"
    },
    {
      id: "isOperatingFlight",
      type: "boolean"
    },
    {
      id: "isMarketingFlight",
      type: "boolean"
    }
  ],
  BookingDetail: [
    {
      id: "origin",
      type: "string",
      ...getMult()
    },
    {
      id: "destination",
      type: "string",
      ...getMult()
    }
  ],
  FrequentFlyer: [
    {
      id: "carrier",
      type: "string",
      ...getMult()
    },
    {
      id: "number",
      type: "string"
    }
  ],
  Passenger: [
    {
      id: "passengerDetails.age",
      type: "integer"
    },
    {
      id: "passengerTripDetails.coTravelerCount",
      type: "integer"
    },
    {
      id: "passengerTripDetails.hoursBeforeTakeOff",
      type: "integer"
    },
    {
      id: "passengerDetails.nationality",
      type: "string",
      ...getMult()
    },
    {
      id: "passengerTripDetails.debarkation",
      type: "string",
      ...getMult()
    },
    {
      id: "passengerTripDetails.debarkCountry",
      type: "string",
      ...getMult()
    },
    {
      id: "passengerDetails.dob",
      type: "date"
    },
    {
      id: "passengerTripDetails.embarkation",
      type: "string",
      ...getMult()
    },
    {
      id: "passengerTripDetails.embarkCountry",
      type: "string",
      ...getMult()
    },
    {
      id: "passengerDetails.gender",
      type: "string",
      ...getMult()
    },
    {
      id: "passengerDetails.firstName",
      type: "string"
    },
    {
      id: "passengerDetails.lastName",
      type: "string"
    },
    {
      id: "passengerDetails.middleName",
      type: "string"
    },
    {
      id: "passengerDetails.residencyCountry",
      type: "string",
      ...getMult()
    },
    {
      id: "passengerDetails.passengerType",
      type: "string",
      ...getMult()
    },
    {
      id: "passengerTripDetails.travelFrequency",
      type: "integer"
    }
  ],
  Seat: [
    {
      id: "number",
      type: "string"
    },
    {
      id: "cabinClass",
      type: "string"
    },
    {
      id: "apis",
      type: "boolean"
    }
  ],
  Phone: [
    {
      id: "number",
      type: "string"
    }
  ],
  Bag: [
    {
      id: "airline",
      type: "string",
      ...getMult()
    },
    {
      id: "bagId",
      type: "string"
    },
    {
      id: "data_source",
      type: "string"
    },
    {
      id: "country",
      type: "string",
      ...getMult()
    },
    {
      id: "destinationAirport",
      type: "string",
      ...getMult()
    },
    {
      id: "primeFlight",
      type: "boolean"
    },
    {
      id: "bagMeasurements.weight",
      type: "double"
    },
    {
      id: "bagMeasurements.bagCount",
      type: "integer"
    },
    {
      id: "headPool",
      type: "boolean"
    }
  ],
  PaymentForm: [
    {
      id: "wholeDollarAmount",
      type: "integer"
    },
    {
      id: "paymentType",
      type: "string",
      ...getMult()
    }
  ],
  Pnr: [
    {
      id: "bagCount",
      type: "integer"
    },
    {
      id: "baggageWeight",
      type: "double"
    },
    {
      id: "dateBooked",
      type: "date"
    },
    {
      id: "carrier",
      type: "string",
      ...getMult()
    },
    {
      id: "dateReceived",
      type: "date"
    },
    {
      id: "daysBookedBeforeTravel",
      type: "integer"
    },
    {
      id: "departureDate",
      type: "date"
    },
    {
      id: "id",
      type: "integer"
    },
    {
      id: "origin",
      type: "string",
      ...getMult()
    },
    {
      id: "originCountry",
      type: "string",
      ...getMult()
    },
    {
      id: "passengerCount",
      type: "integer"
    },
    {
      id: "recordLocator",
      type: "string"
    },
    {
      id: "seat",
      type: "string"
    },
    {
      id: "tripType",
      type: "string",
      ...getMult()
    },
    {
      id: "tripDuration",
      type: "double"
    }
  ],
  DwellTime: [
    {
      id: "location",
      type: "string"
    },
    {
      id: "dwellTime",
      type: "double"
    }
  ],
  Agency: [
    {
      id: "country",
      type: "string",
      ...getMult()
    },
    {
      id: "identifier",
      type: "string"
    },
    {
      id: "location",
      type: "string"
    },
    {
      id: "name",
      type: "string"
    },
    {
      id: "city",
      type: "string",
      ...getMult()
    },
    {
      id: "phone",
      type: "string"
    }
  ]
};

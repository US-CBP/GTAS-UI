import React, { useState, useEffect } from "react";
import {
  watchlistcats,
  airportLookup,
  countryLookup,
  carrierLookup
} from "../../services/serviceWrapper";

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

const FIELDSINT = {
  //   addressFields: {
  //     city: { label: "City", ...txtProps },
  //     country: { label: "Country", type: "select", valueSources: ["value"] },
  //     line1: { label: "Line 1", ...txtProps },
  //     line2: { label: "Line 2", ...txtProps },
  //     line3: { label: "Line 3", ...txtProps },
  //     postalCode: { label: "Postal Code", ...txtProps },
  //     state: { label: "State", ...txtProps }
  //   },
  //   agencyFields: {
  //     country: { label: "Country", ...txtProps },
  //     identifier: {
  //       label: "Identifier",
  //       ...txtProps
  //     },
  //     location: { label: "Location", ...txtProps },
  //     name: { label: "Name", ...txtProps },
  //     city: { label: "City", ...txtProps },
  //     phone: { label: "Phone", ...txtProps }
  //   },
  //   bagFields: {
  //     airline: { label: "Airline", ...txtProps },
  //     bagId: { label: "Bag ID", ...txtProps },
  //     dataSource: { label: "Data Source", ...txtProps },
  //     country: { label: "Destination Country", ...txtProps },
  //     destinationAirport: { label: "Destination Airport", ...txtProps },
  //     primeFlight: { label: "Is Prime Flight", type: "boolean", valueSources: ["value"] },
  //     headPool: {
  //       label: "Is Head Of a Baggage Pool",
  //       type: "boolean",
  //       valueSources: ["value"]
  //     },
  //     "bagMeasurements.weight": { label: "Bag Weight Measurement (kg)", ...numProps }
  //   },
  //   creditCardFields: {
  //     accountHolder: { label: "Account Holder", ...txtProps },
  //     expiration: { label: "Expiration Date", ...dateProps },
  //     number: { label: "Number", ...txtProps },
  //     cardType: { label: "Type", ...txtProps }
  //   },
  //   documentFields: {
  //     documentNumber: { label: "Number", ...txtProps },
  //     documentType: {
  //       label: "Type",
  //       type: "select",
  //       fieldSettings: {
  //         listValues: [
  //           { value: "P", title: "Passport" },
  //           { value: "V", title: "Visa" }
  //         ]
  //       },
  //       valueSources: ["value"]
  //     },
  //     issuanceCountry: { label: "Issuance Country", ...txtProps },
  //     expirationDate: { label: "Expiration Date", ...dateProps },
  //     issuanceDate: { label: "Issuance Date", ...dateProps }
  //   },
  //   emailFields: {
  //     address: { label: "Address", ...txtProps },
  //     domain: { label: "Domain", ...txtProps }
  //   },
  //   legFields: {
  //     origin: { label: "Origin", ...txtProps },
  //     destination: { label: "Destination", ...txtProps }
  //   },
  //   flightFields: {
  //     destination: { label: "Airport Destination", ...txtProps },
  //     origin: { label: "Airport Origin", ...txtProps },
  //     carrier: { label: "Carrier", ...txtProps },
  //     destinationCountry: { label: "Destination Country", ...txtProps },
  //     originCountry: { label: "Origin Country", ...txtProps },
  //     direction: {
  //       label: "Direction",
  //       type: "select",
  //       fieldSettings: {
  //         listValues: [
  //           { value: "I", title: "Inbound" },
  //           { value: "O", title: "Outbound" },
  //           { value: "C", title: "Continuance" }
  //         ]
  //       },
  //       valueSources: ["value"]
  //     },
  //     etdDate: { label: "ETD", ...dateProps },
  //     flightNumber: { label: "Number", ...txtProps },
  //     "mutableFlightDetails.etaDate": { label: "ETA", ...dateProps }
  //   },
  //   frequentFlyerFields: {
  //     carrier: { label: "Carrier", ...txtProps },
  //     number: { label: "Number", ...txtProps }
  //   },
  //   passengerFields: {
  //     "passengerDetails.age": { label: "Age", ...numProps },
  //     "passengerTripDetails.coTravelerCount": {
  //       label: "APIS Co-Passenger Count",
  //       ...numProps
  //     },
  //     "passengerTripDetails.hoursBeforeTakeOff": {
  //       label: "Hours Before Take Off",
  //       ...numProps
  //     },
  //     "passengerDetails.nationality": { label: "Nationality", ...txtProps },
  //     "passengerTripDetails.debarkation": { label: "Debarkation Airport", ...txtProps },
  //     "passengerTripDetails.debarkCountry": { label: "Debarkation Country", ...txtProps },
  //     "passengerDetails.dob": { label: "DOB", ...dateProps },
  //     "passengerTripDetails.embarkation": { label: "Embarkation Airport", ...txtProps },
  //     "passengerTripDetails.embarkCountry": { label: "Embarkation Country", ...txtProps },
  //     "passengerDetails.gender": {
  //       label: "Gender",
  //       type: "select",
  //       fieldSettings: {
  //         listValues: [
  //           { value: "F", title: "Female" },
  //           { value: "M", title: "Male" },
  //           { value: "U", title: "Undisclosed" },
  //           { value: "FI", title: "Female Infant" },
  //           { value: "MI", title: "Male Infant" }
  //         ]
  //       },
  //       valueSources: ["value"]
  //     },
  //     "passengerDetails.firstName": { label: "Name - First", ...txtProps },
  //     "passengerDetails.lastName": { label: "Name - Last", ...txtProps },
  //     "passengerDetails.middleName": { label: "Name - Middle", ...txtProps },
  //     "passengerDetails.residencyCountry": { label: "Residency Country", ...txtProps },
  //     "passengerDetails.passengerType": {
  //       label: "Type",
  //       type: "select",
  //       fieldSettings: {
  //         listValues: [
  //           { value: "P", title: "Passenger" },
  //           { value: "C", title: "Crew" },
  //           { value: "I", title: "Intransit" }
  //         ]
  //       },
  //       valueSources: ["value"]
  //     },
  //     "passengerTripDetails.travelFrequency": {
  //       label: "Travel Frequency",
  //       ...numProps
  //     }
  //   },
  //   seatFields: {
  //     number: { label: "Seat Number", ...txtProps },
  //     cabinClass: { label: "Cabin Class", ...txtProps },
  //     apis: { label: "Is APIS", type: "boolean", valueSources: ["value"] }
  //   },
  //   paymentFormFields: {
  //     wholeDollarAmount: { label: "Monetary Amount(No Decimal)", ...numProps },
  //     paymentType: {
  //       label: "Form of Payment",
  //       type: "select",
  //       fieldSettings: {
  //         listValues: [
  //           { value: "CC", title: "Credit Card" },
  //           { value: "CA", title: "Cash" },
  //           { value: "CK", title: "Check" },
  //           { value: "MS", title: "Miscellaneous Charges Order" },
  //           { value: "VOC", title: "Voucher" }
  //         ]
  //       },
  //       valueSources: ["value"]
  //     }
  //   },
  //   pnrFields: {
  //     bagCount: { label: "Bag - Count", ...numProps },
  //     baggageWeight: { label: "Baggage - Weight", ...numProps },
  //     dateBooked: { label: "Booking Date", ...dateProps },
  //     carrier: { label: "Carrier Code", ...txtProps },
  //     dateReceived: { label: "Date Received", ...dateProps },
  //     daysBookedBeforeTravel: { label: "Days Booked Before Travel", ...numProps },
  //     departureDate: { label: "Departure Date", ...dateProps },
  //     id: { label: "Pnr Id", ...txtProps },
  //     origin: { label: "Origin - Airport", ...txtProps },
  //     originCountry: { label: "Origin - Country", ...txtProps },
  //     passengerCount: { label: "Passenger Count", ...numProps },
  //     recordLocator: { label: "Record Locator", ...txtProps },
  //     seat: { label: "Seat", ...txtProps },
  //     tripType: {
  //       label: "Trip Type",
  //       type: "select",
  //       fieldSettings: {
  //         listValues: [
  //           { value: "ONE-WAY", title: "One Way" },
  //           { value: "ROUND-TRIP", title: "Round Trip" },
  //           { value: "NON-CONTIGUOUS", title: "Non Contiguous" },
  //           { value: "MULTI-CITY", title: "Multi City" },
  //           { value: "OPEN JAW", title: "Open Jaw" }
  //         ]
  //       },
  //       valueSources: ["value"]
  //     },
  //     tripDuration: { label: "Trip Duration", ...numProps }
  //   },
  //   phoneFields: { number: { label: "Number", ...txtProps } },
  //   dwellTimeFields: {
  //     location: { label: "Location", ...txtProps },
  //     dwellTime: { label: "Lay over Time", ...numProps }
  //   }
};

const fieldConfig = {
  //   fields: {
  //     Address: {
  //       label: "Address",
  //       type: "!group",
  //       subfields: FIELDSINT.addressFields
  //     },
  //     Bag: {
  //       label: "Bag",
  //       type: "!group",
  //       subfields: FIELDSINT.bagFields
  //     },
  //     CreditCard: {
  //       label: "Credit Card",
  //       type: "!group",
  //       subfields: FIELDSINT.creditCardFields
  //     },
  //     Document: {
  //       label: "Document",
  //       type: "!group",
  //       subfields: FIELDSINT.documentFields
  //     },
  //     DwellTime: {
  //       label: "Dwell Time",
  //       type: "!group",
  //       subfields: FIELDSINT.dwellTimeFields
  //     },
  //     Email: {
  //       label: "Email",
  //       type: "!group",
  //       subfields: FIELDSINT.emailFields
  //     },
  //     Flight: {
  //       label: "Flight",
  //       type: "!group",
  //       subfields: FIELDSINT.flightFields
  //     },
  //     BookingDetail: {
  //       label: "Flight Leg",
  //       type: "!group",
  //       subfields: FIELDSINT.legFields
  //     },
  //     PaymentForm: {
  //       label: "Form of Payment",
  //       type: "!group",
  //       subfields: FIELDSINT.paymentFormFields
  //     },
  //     FrequentFlyer: {
  //       label: "Frequent Flyer",
  //       type: "!group",
  //       subfields: FIELDSINT.frequentFlyerFields
  //     },
  //     Passenger: {
  //       label: "Passenger",
  //       type: "!group",
  //       subfields: FIELDSINT.passengerFields
  //     },
  //     Phone: {
  //       label: "Phone",
  //       type: "!group",
  //       subfields: FIELDSINT.phoneFields
  //     },
  //     Pnr: {
  //       label: "PNR",
  //       type: "!group",
  //       subfields: FIELDSINT.pnrFields
  //     },
  //     Seat: {
  //       label: "Seat",
  //       type: "!group",
  //       subfields: FIELDSINT.seatFields
  //     },
  //     Agency: {
  //       label: "Travel Agency",
  //       type: "!group",
  //       subfields: FIELDSINT.agencyFields
  //     }
  //   }
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
const selMult = { select: true, multival: true };

export const ENTITIESEXT = {
  Address: [
    {
      id: "city",
      type: "string"
    },
    {
      id: "country",
      type: "string",
      ...selMult
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
      type: "string"
    }
  ],
  Document: [
    {
      id: "issuanceCountry",
      type: "string",
      ...selMult
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
      ...selMult
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
      ...selMult
    },
    {
      id: "origin",
      type: "string",
      ...selMult
    },
    {
      id: "carrier",
      type: "string"
    },
    {
      id: "destinationCountry",
      type: "string",
      ...selMult
    },
    {
      id: "originCountry",
      type: "string",
      ...selMult
    },
    {
      id: "direction",
      type: "string",
      ...selMult
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
      multival: true
    },
    {
      id: "destination",
      type: "string",
      multival: true
    }
  ],
  FrequentFlyer: [
    {
      id: "carrier",
      type: "string"
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
      ...selMult
    },
    {
      id: "passengerTripDetails.debarkation",
      type: "string",
      ...selMult
    },
    {
      id: "passengerTripDetails.debarkCountry",
      type: "string",
      ...selMult
    },
    {
      id: "passengerDetails.dob",
      type: "date"
    },
    {
      id: "passengerTripDetails.embarkation",
      type: "string",
      ...selMult
    },
    {
      id: "passengerTripDetails.embarkCountry",
      type: "string",
      ...selMult
    },
    {
      id: "passengerDetails.gender",
      type: "string",
      ...selMult
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
      ...selMult
    },
    {
      id: "passengerDetails.passengerType",
      type: "string",
      ...selMult
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
      type: "string"
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
      type: "string"
      // ...selMult
    },
    {
      id: "destinationAirport",
      type: "string"
      // ...selMult
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
      type: "string"
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
      type: "string"
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
      ...selMult
    },
    {
      id: "originCountry",
      type: "string",
      ...selMult
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
      ...selMult
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
      ...selMult
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
      ...selMult
    },
    {
      id: "phone",
      type: "string"
    }
  ]
};

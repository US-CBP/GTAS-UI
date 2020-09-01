const txtProps = {
  type: "text",
  excludeOperators: ["proximity"],
  valueSources: ["value"]
};

const numProps = { type: "number", fieldSettings: { min: 0 }, valueSources: ["value"] };

const dateProps = { type: "date", valueSources: ["value"] };

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

export const FIELDS = {
  addressFields: {
    city: { label: "City", ...txtProps },
    country: { label: "Country", ...txtProps },
    line1: { label: "Line 1", ...txtProps },
    line2: { label: "Line 2", ...txtProps },
    line3: { label: "Line 3", ...txtProps },
    postalCode: { label: "Postal Code", ...txtProps },
    state: { label: "State", ...txtProps }
  },

  agencyFields: {
    country: { label: "Country", ...txtProps },
    identifier: { label: "Identifier", ...txtProps },
    location: { label: "Location", ...txtProps },
    name: { label: "Name", ...txtProps },
    city: { label: "City", ...txtProps },
    phone: { label: "Phone", ...txtProps }
  },

  bagFields: {
    airline: { label: "Airline", ...txtProps },
    bagId: { label: "Bag ID", ...txtProps },
    dataSource: { label: "Data Source", ...txtProps },
    country: { label: "Destination Country", ...txtProps },
    destinationAirport: { label: "Destination Airport", ...txtProps },
    primeFlight: { label: "Is Prime Flight", type: "boolean", valueSources: ["value"] },
    headPool: {
      label: "Is Head Of a Baggage Pool",
      type: "boolean",
      valueSources: ["value"]
    },
    "bagMeasurements.weight": { label: "Bag Weight Measurement (kg)", ...numProps }
  },

  creditCardFields: {
    accountHolder: { label: "Account Holder", ...txtProps },
    expiration: { label: "Expiration Date", ...dateProps },
    number: { label: "Number", ...txtProps },
    cardType: { label: "Type", ...txtProps }
  },

  documentFields: {
    documentNumber: { label: "Number", ...txtProps },
    documentType: {
      label: "Type",
      type: "select",
      fieldSettings: {
        listValues: [
          { value: "P", title: "Passport" },
          { value: "V", title: "Visa" }
          // { value: "IP", title: "Inbound" },
          // { value: "A", title: "Inbound" },
          // { value: "C", title: "Inbound" },
          // { value: "I", title: "Inbound" },
          // { value: "F", title: "Outbound" }

          //interpol travel doc?
          //us re-entry permit
        ]
      },
      valueSources: ["value"]
    },
    issuanceCountry: { label: "Issuance Country", ...txtProps },
    expirationDate: { label: "Expiration Date", ...dateProps },
    issuanceDate: { label: "Issuance Date", ...dateProps }
  },

  emailFields: {
    address: { label: "Address", ...txtProps },
    domain: { label: "Domain", ...txtProps }
  },

  legFields: {
    origin: { label: "Origin", ...txtProps },
    destination: { label: "Destination", ...txtProps }
  },

  flightFields: {
    destination: { label: "Airport Destination", ...txtProps },
    origin: { label: "Airport Origin", ...txtProps },
    carrier: { label: "Carrier", ...txtProps },
    destinationCountry: { label: "Destination Country", ...txtProps },
    originCountry: { label: "Origin Country", ...txtProps },
    direction: {
      label: "Direction",
      type: "select",
      fieldSettings: {
        listValues: [
          { value: "I", title: "Inbound" },
          { value: "O", title: "Outbound" },
          { value: "C", title: "Continuance" }
        ]
      },
      valueSources: ["value"]
    },
    etdDate: { label: "ETD", ...dateProps },
    flightNumber: { label: "Number", ...txtProps },
    "mutableFlightDetails.etaDate": { label: "ETA", ...dateProps }
  },
  frequentFlyerFields: {
    carrier: { label: "Carrier", ...txtProps },
    number: { label: "Number", ...txtProps }
  },
  passengerFields: {
    "passengerDetails.age": { label: "Age", ...numProps },
    "passengerTripDetails.coTravelerCount": {
      label: "APIS Co-Passenger Count",
      ...numProps
    },
    "passengerTripDetails.hoursBeforeTakeOff": {
      label: "Hours Before Take Off",
      ...numProps
    },
    "passengerDetails.nationality": { label: "Nationality", ...txtProps },
    "passengerTripDetails.debarkation": { label: "Debarkation Airport", ...txtProps },
    "passengerTripDetails.debarkCountry": { label: "Debarkation Country", ...txtProps },
    "passengerDetails.dob": { label: "DOB", ...dateProps },
    "passengerTripDetails.embarkation": { label: "Embarkation Airport", ...txtProps },
    "passengerTripDetails.embarkCountry": { label: "Embarkation Country", ...txtProps },
    "passengerDetails.gender": {
      label: "Gender",
      type: "select",
      fieldSettings: {
        listValues: [
          { value: "F", title: "Female" },
          { value: "M", title: "Male" },
          { value: "U", title: "Undisclosed" },
          { value: "FI", title: "Female Infant" },
          { value: "MI", title: "Male Infant" }
        ]
      },
      valueSources: ["value"]
    },
    "passengerDetails.firstName": { label: "Name - First", ...txtProps },
    "passengerDetails.lastName": { label: "Name - Last", ...txtProps },
    "passengerDetails.middleName": { label: "Name - Middle", ...txtProps },
    "passengerDetails.residencyCountry": { label: "Residency Country", ...txtProps },
    "passengerDetails.passengerType": {
      label: "Type",
      type: "select",
      fieldSettings: {
        listValues: [
          { value: "P", title: "Passenger" },
          { value: "C", title: "Crew" },
          { value: "I", title: "Intransit" }
        ]
      },
      valueSources: ["value"]
    },
    "passengerTripDetails.travelFrequency": {
      label: "Travel Frequency",
      ...numProps
    }
  },
  seatFields: {
    number: { label: "Seat Number", ...txtProps },
    cabinClass: { label: "Cabin Class", ...txtProps },
    apis: { label: "Is APIS", type: "boolean", valueSources: ["value"] }
  },
  paymentFormFields: {
    wholeDollarAmount: { label: "Monetary Amount(No Decimal)", ...numProps },
    paymentType: {
      label: "Form of Payment",
      type: "select",
      fieldSettings: {
        listValues: [
          { value: "CC", title: "Credit Card" },
          { value: "CA", title: "Cash" },
          { value: "CK", title: "Check" },
          { value: "MS", title: "Miscellaneous Charges Order" },
          { value: "VOC", title: "Voucher" }
        ]
      },
      valueSources: ["value"]
    }
  },
  pnrFields: {
    bagCount: { label: "Bag - Count", ...numProps },
    baggageWeight: { label: "Baggage - Weight", ...numProps },
    dateBooked: { label: "Booking Date", ...dateProps },
    carrier: { label: "Carrier Code", ...txtProps },
    dateReceived: { label: "Date Received", ...dateProps },
    daysBookedBeforeTravel: { label: "Days Booked Before Travel", ...numProps },
    departureDate: { label: "Departure Date", ...dateProps },
    id: { label: "Pnr Id", ...txtProps },
    origin: { label: "Origin - Airport", ...txtProps },
    originCountry: { label: "Origin - Country", ...txtProps },
    passengerCount: { label: "Passenger Count", ...numProps },
    recordLocator: { label: "Record Locator", ...txtProps },
    seat: { label: "Seat", ...txtProps },
    tripType: {
      label: "Trip Type",
      type: "select",
      fieldSettings: {
        listValues: [
          { value: "ONE-WAY", title: "One Way" },
          { value: "ROUND-TRIP", title: "Round Trip" },
          { value: "NON-CONTIGUOUS", title: "Non Contiguous" },
          { value: "MULTI-CITY", title: "Multi City" },
          { value: "OPEN JAW", title: "Open Jaw" }
        ]
      },
      valueSources: ["value"]
    },
    tripDuration: { label: "Trip Duration", ...numProps }
  },
  phoneFields: { number: { label: "Number", ...txtProps } },
  dwellTimeFields: {
    location: { label: "Location", ...txtProps },
    dwellTime: { label: "Lay over Time", ...numProps }
  }
};

export const fieldConfig = {
  fields: {
    Address: {
      label: "Address",
      type: "!group",
      subfields: FIELDS.addressFields
    },
    Agency: {
      label: "Agency",
      type: "!group",
      subfields: FIELDS.agencyFields
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
    DwellTime: {
      label: "Dwell Time",
      type: "!group",
      subfields: FIELDS.dwellTimeFields
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
    PaymentForm: {
      label: "Form of Payment",
      type: "!group",
      subfields: FIELDS.paymentFormFields
    },
    Passenger: {
      label: "Passenger",
      type: "!group",
      subfields: FIELDS.passengerFields
    },
    Phone: {
      label: "Phone",
      type: "!group",
      subfields: FIELDS.phoneFields
    },
    Pnr: {
      label: "PNR",
      type: "!group",
      subfields: FIELDS.pnrFields
    },
    Seat: {
      label: "Seat",
      type: "!group",
      subfields: FIELDS.seatFields
    }
  }
};

export const operatorMap = {
  EQUAL: "equal",
  NOT_EQUAL: "not_equal",
  CONTAINS: "like",
  NOT_CONTAINS: "not_like",
  IS_NULL: "is_empty",
  NOT_IS_NULL: "is_not_empty",
  BEGINS_WITH: "starts_with",
  ENDS_WITH: "ends_with",
  BETWEEN: "between",
  NOT_BETWEEN: "not_between",
  GREATER: "greater",
  GREATER_OR_EQUAL: "greater_or_equal",
  LESS: "less",
  LESS_OR_EQUAL: "less_or_equal",
  IN: "select_any_in",
  NOT_IN: "select_not_any_in",

  to_select_any_in: "select_any_in", // force "select_equals" on incoming raw obj

  equal: "EQUAL",
  select_equals: "EQUAL",
  select_any_in: "IN",
  select_not_any_in: "NOT_IN",
  not_equal: "NOT_EQUAL",
  like: "CONTAINS",
  not_like: "NOT_CONTAINS",
  is_empty: "IS_NULL",
  is_not_empty: "NOT_IS_NULL",
  starts_with: "BEGINS_WITH",
  ends_with: "ENDS_WITH",
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

export const fullEntities = {
  Address: {
    columns: [
      {
        id: "Address.city",
        type: "string"
      },
      {
        id: "Address.country",
        type: "string",
        multiple: true
      },
      {
        id: "Address.line1",
        type: "string"
      },
      {
        id: "Address.line2",
        type: "string"
      },
      {
        id: "Address.line3",
        type: "string"
      },
      {
        id: "Address.postalCode",
        type: "string"
      },
      {
        id: "Address.state",
        type: "string"
      }
    ]
  },
  CreditCard: {
    columns: [
      {
        id: "CreditCard.accountHolder",
        type: "string",
        csv: true
      },
      {
        id: "CreditCard.expiration",
        type: "date"
      },
      {
        id: "CreditCard.number",
        type: "string"
      },
      {
        id: "CreditCard.cardType",
        type: "string"
      }
    ]
  },
  Document: {
    columns: [
      {
        id: "Document.issuanceCountry",
        type: "string",
        multiple: true
      },
      {
        id: "Document.expirationDate",
        type: "date"
      },
      {
        id: "Document.issuanceDate",
        type: "date"
      },
      {
        id: "Document.documentNumber",
        type: "string"
      },
      {
        id: "Document.documentType",
        type: "string",
        input: "select",
        multiple: true
      }
    ]
  },
  Email: {
    columns: [
      {
        id: "Email.address",
        type: "string"
      },
      {
        id: "Email.domain",
        type: "string"
      }
    ]
  },
  Flight: {
    columns: [
      {
        id: "Flight.destination",
        type: "string",
        multiple: true
      },
      {
        id: "Flight.origin",
        type: "string",
        input: "select",
        multiple: true
      },
      {
        id: "Flight.carrier",
        type: "string"
      },
      {
        id: "Flight.destinationCountry",
        type: "string",
        multiple: true
      },
      {
        id: "Flight.originCountry",
        type: "string",
        multiple: true
      },
      {
        id: "Flight.direction",
        type: "string",
        input: "radio",
        multiple: true
      },
      {
        id: "Flight.mutableFlightDetails.etaDate",
        type: "date"
      },
      {
        id: "Flight.etdDate",
        type: "date"
      },
      {
        id: "Flight.flightNumber",
        type: "string"
      },
      {
        id: "Flight.isOperatingFlight",
        type: "boolean",
        input: "radio"
      },
      {
        id: "Flight.isMarketingFlight",
        type: "boolean",
        input: "radio"
      }
    ]
  },
  BookingDetail: {
    columns: [
      {
        id: "BookingDetail.origin",
        type: "string",
        multiple: true
      },
      {
        id: "BookingDetail.destination",
        type: "string",
        multiple: true
      }
    ]
  },
  FrequentFlyer: {
    columns: [
      {
        id: "FrequentFlyer.carrier",
        type: "string"
      },
      {
        id: "FrequentFlyer.number",
        type: "string"
      }
    ]
  },
  Passenger: {
    columns: [
      {
        id: "Passenger.passengerDetails.age",
        type: "integer"
      },
      {
        id: "Passenger.passengerTripDetails.coTravelerCount",
        type: "integer"
      },
      {
        id: "Passenger.passengerTripDetails.hoursBeforeTakeOff",
        type: "integer"
      },
      {
        id: "Passenger.passengerDetails.nationality",
        type: "string",
        input: "select",
        multiple: true
      },
      {
        id: "Passenger.passengerTripDetails.debarkation",
        type: "string",
        input: "select",
        multiple: true
      },
      {
        id: "Passenger.passengerTripDetails.debarkCountry",
        type: "string",
        input: "select",
        multiple: true
      },
      {
        id: "Passenger.passengerDetails.dob",
        type: "date"
      },
      {
        id: "Passenger.passengerTripDetails.embarkation",
        type: "string",
        input: "select",
        multiple: true
      },
      {
        id: "Passenger.passengerTripDetails.embarkCountry",
        type: "string",
        input: "select",
        multiple: true
      },
      {
        id: "Passenger.passengerDetails.gender",
        type: "string",
        multiple: true
      },
      {
        id: "Passenger.passengerDetails.firstName",
        type: "string"
      },
      {
        id: "Passenger.passengerDetails.lastName",
        type: "string"
      },
      {
        id: "Passenger.passengerDetails.middleName",
        type: "string"
      },
      {
        id: "Passenger.passengerDetails.residencyCountry",
        type: "string",
        input: "select",
        multiple: true
      },
      {
        id: "Passenger.passengerDetails.passengerType",
        type: "string",
        input: "select",
        multiple: true
      },
      {
        id: "Passenger.passengerTripDetails.travelFrequency",
        type: "integer"
      }
    ]
  },
  Seat: {
    columns: [
      {
        id: "Seat.number",
        type: "string"
      },
      {
        id: "Seat.cabinClass",
        type: "string"
      },
      {
        id: "Seat.apis",
        type: "boolean"
      }
    ]
  },
  Phone: {
    columns: [
      {
        id: "Phone.number",
        type: "string"
      }
    ]
  },
  Bag: {
    columns: [
      {
        id: "Bag.airline",
        type: "string"
      },
      {
        id: "Bag.bagId",
        type: "string"
      },
      {
        id: "Bag.data_source",
        type: "string"
      },
      {
        id: "Bag.country",
        type: "string",
        input: "select",
        multiple: true
      },
      {
        id: "Bag.destinationAirport",
        type: "string",
        input: "select",
        multiple: true
      },
      {
        id: "Bag.primeFlight",
        type: "boolean",
        input: "radio"
      },
      {
        id: "Bag.bagMeasurements.weight",
        type: "double"
      },
      {
        id: "Bag.bagMeasurements.bagCount",
        type: "integer"
      },
      {
        id: "Bag.headPool",
        type: "boolean",
        input: "radio"
      }
    ]
  },
  PaymentForm: {
    columns: [
      {
        id: "PaymentForm.wholeDollarAmount",
        type: "integer"
      },
      {
        id: "PaymentForm.paymentType",
        type: "string",
        input: "text"
      }
    ]
  },
  Pnr: {
    columns: [
      {
        id: "Pnr.bagCount",
        type: "integer"
      },
      {
        id: "Pnr.baggageWeight",
        type: "double"
      },
      {
        id: "Pnr.dateBooked",
        type: "date"
      },
      {
        id: "Pnr.carrier",
        type: "string"
      },
      {
        id: "Pnr.dateReceived",
        type: "date"
      },
      {
        id: "Pnr.daysBookedBeforeTravel",
        type: "integer"
      },
      {
        id: "Pnr.departureDate",
        type: "date"
      },
      {
        id: "Pnr.id",
        type: "integer"
      },
      {
        id: "Pnr.origin",
        type: "string",
        input: "select",
        multiple: true
      },
      {
        id: "Pnr.originCountry",
        type: "string",

        input: "select",
        multiple: true
      },
      {
        id: "Pnr.passengerCount",
        type: "integer"
      },
      {
        id: "Pnr.recordLocator",
        type: "string"
      },
      {
        id: "Pnr.seat",
        type: "string"
      },
      {
        id: "Pnr.tripType",
        type: "string",
        input: "select",
        multiple: false
      },
      {
        id: "Pnr.tripDuration",
        type: "double"
      }
    ]
  },
  DwellTime: {
    columns: [
      {
        id: "DwellTime.location",
        type: "string"
      },
      {
        id: "DwellTime.dwellTime",
        type: "double"
      }
    ]
  },
  Agency: {
    columns: [
      {
        id: "Agency.country",
        type: "string",
        input: "select",
        multiple: true
      },
      {
        id: "Agency.identifier",
        type: "string"
      },
      {
        id: "Agency.location",
        type: "string"
      },
      {
        id: "Agency.name",
        type: "string"
      },
      {
        id: "Agency.city",
        type: "string"
      },
      {
        id: "Agency.phone",
        type: "string"
      }
    ]
  }
};

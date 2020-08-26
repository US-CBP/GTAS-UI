/** Initial query with the first rule row pre-loaded */
export const initQuery = {
  id: "g-ITRz8BH8fS77-cw-DS4Ss",
  rules: [{ id: "r--idiJE1qPaXYJtaTgqYng", field: "", value: "", operator: "null" }],
  combinator: "and",
  not: false
};

export const EntitySelect = `<select className="rule-entities" title="Entities">
<option label="ADDRESS" key="ADDRESS" value="ADDRESS"></option>
<option label="BAG" key="BAG" value="BAG"></option>
<option label="CREDIT CARD" key="CREDITCARD"  value="CREDITCARD"></option>
<option label="DOCUMENT" key="DOCUMENT" value="DOCUMENT"></option>
<option label="EMAIL" key="EMAIL" value="EMAIL"></option>
<option label="FLIGHT" value="FLIGHT"></option>
<option label="FLIGHT LEG" value="BOOKINGDETAIL"></option>
<option label="FREQUENT FLYER" value="FREQUENTFLYER"></option>
<option label="PASSENGER" value="PASSENGER"></option>
<option label="SEAT" value="SEAT"></option>
<option label="PHONE" value="PHONE"></option>
<option label="FORM OF PAYMENT" value="PAYMENTFORM"></option>
<option label="PNR" value="PNR"></option>
<option label="DWELL TIME" value="DWELLTIME"></option>
<option label="TRAVEL AGENCY" VALUE="AGENCY"></option>
</select>`;

export const FIELDS = {
  addressFields: {
    city: { label: "City", type: "text", valueSources: ["value"] },
    country: { label: "Country", type: "text", valueSources: ["value"] },
    line1: { label: "Line 1", type: "text", valueSources: ["value"] },
    line2: { label: "Line 2", type: "text", valueSources: ["value"] },
    line3: { label: "Line 3", type: "text", valueSources: ["value"] },
    postalCode: { label: "Postal Code", type: "text", valueSources: ["value"] },
    state: { label: "State", type: "text", valueSources: ["value"] }
  },

  bagFields: {
    airline: { label: "Airline", type: "text", valueSources: ["value"] },
    bagId: { label: "Bag ID", type: "text", valueSources: ["value"] },
    dataSource: { label: "Data Source", type: "text", valueSources: ["value"] },
    country: { label: "Destination Country", type: "text", valueSources: ["value"] },
    destinationAirport: {
      label: "Destination Airport",
      type: "text",
      valueSources: ["value"]
    },
    primeFlight: { label: "Is Prime Flight", type: "boolean", valueSources: ["value"] },
    headPool: {
      label: "Is Head Of a Baggage Pool",
      type: "boolean",
      valueSources: ["value"]
    },
    "bagMeasurements.weight": {
      label: "Bag Weight Measurement (kg)",
      type: "number",
      fieldSettings: { min: 0 },
      valueSources: ["value"]
    }
  },

  creditCardFields: {
    accountHolder: { label: "Account Holder", type: "text", valueSources: ["value"] },
    expiration: { label: "Expiration Date", type: "date", valueSources: ["value"] },
    number: { label: "Number", type: "text", valueSources: ["value"] },
    cardType: { label: "Type", type: "text", valueSources: ["value"] }
  },

  documentFields: {
    documentNumber: { label: "Number", type: "text", valueSources: ["value"] },
    documentType: { label: "Type", type: "text", valueSources: ["value"] },
    issuanceCountry: { label: "Issuance Country", type: "text", valueSources: ["value"] },
    expirationDate: { label: "Expiration Date", type: "date", valueSources: ["value"] },
    issuanceDate: { label: "Issuance Date", type: "date", valueSources: ["value"] }
  },

  emailFields: {
    address: { label: "Address", type: "text", valueSources: ["value"] },
    domain: { label: "Domain", type: "text", valueSources: ["value"] }
  },

  legFields: {
    origin: { label: "Origin", type: "text", valueSources: ["value"] },
    destination: { label: "Destination", type: "text", valueSources: ["value"] }
  },

  flightFields: {
    destination: { label: "Airport Destination", type: "text", valueSources: ["value"] },
    origin: { label: "Airport Origin", type: "text", valueSources: ["value"] },
    carrier: { label: "Carrier", type: "text", valueSources: ["value"] },
    destinationCountry: {
      label: "Destination Country",
      type: "text",
      valueSources: ["value"]
    },
    originCountry: { label: "Origin Country", type: "text", valueSources: ["value"] },
    direction: { label: "Direction", type: "text", valueSources: ["value"] },
    etdDate: { label: "ETD", type: "date", valueSources: ["value"] },
    flightNumber: { label: "Number", type: "text", valueSources: ["value"] },
    isOperatingFlight: {
      label: "Is Operating Flight",
      type: "boolean",
      valueSources: ["value"]
    },
    isMarketingFlight: {
      label: "Is Marketing Flight",
      type: "boolean",
      valueSources: ["value"]
    },
    "mutableFlightDetails.etaDate": {
      label: "ETA",
      type: "date",
      valueSources: ["value"]
    }
  },

  frequentFlyerFields: {
    carrier: { label: "Carrier", type: "text", valueSources: ["value"] },
    number: { label: "Number", type: "text", valueSources: ["value"] }
  },

  passengerFields: {
    "passengerDetails.age": { label: "Age", type: "number", valueSources: ["value"] },
    "passengerTripDetails.coTravelerCount": {
      label: "APIS Co-Passenger Count",
      type: "number",
      fieldSettings: { min: 0 },
      valueSources: ["value"]
    },
    "passengerTripDetails.hoursBeforeTakeOff": {
      label: "Hours Before Take Off",
      type: "number",
      fieldSettings: { min: 0 },
      valueSources: ["value"]
    },
    "passengerDetails.nationality": {
      label: "Nationality",
      type: "text",
      valueSources: ["value"]
    },
    "passengerTripDetails.debarkation": {
      label: "Debarkation Airport",
      type: "text",
      valueSources: ["value"]
    },
    "passengerTripDetails.debarkCountry": {
      label: "Debarkation Country",
      type: "text",
      valueSources: ["value"]
    },
    "passengerDetails.dob": { label: "DOB", type: "date", valueSources: ["value"] },
    "passengerTripDetails.embarkation": {
      label: "Embarkation Airport",
      type: "text",
      valueSources: ["value"]
    },
    "passengerTripDetails.embarkCountry": {
      label: "Embarkation Country",
      type: "text",
      valueSources: ["value"]
    },
    "passengerDetails.gender": { label: "Gender", type: "text", valueSources: ["value"] },
    "passengerDetails.firstName": {
      label: "Name - First",
      type: "text",
      valueSources: ["value"]
    },
    "passengerDetails.lastName": {
      label: "Name - Last",
      type: "text",
      valueSources: ["value"]
    },
    "passengerDetails.middleName": {
      label: "Name - Middle",
      type: "text",
      valueSources: ["value"]
    },
    "passengerDetails.residencyCountry": {
      label: "Residency Country",
      type: "text",
      valueSources: ["value"]
    },
    "passengerDetails.passengerType": {
      label: "Type",
      type: "text",
      valueSources: ["value"]
    },
    "passengerTripDetails.travelFrequency": {
      label: "Travel Frequency",
      type: "text",
      valueSources: ["value"]
    }
  },

  seatFields: {
    number: { label: "Seat Number", type: "text", valueSources: ["value"] },
    cabinClass: { label: "Cabin Class", type: "text", valueSources: ["value"] },
    apis: { label: "Is APIS", type: "boolean", valueSources: ["value"] }
  },

  paymentFormFields: {
    wholeDollarAmount: {
      label: "Monetary Amount(No Decimal)",
      type: "number",
      fieldSettings: { min: 0 },
      valueSources: ["value"]
    },
    paymentType: { label: "Form of Payment", type: "text", valueSources: ["value"] }
  },

  pnrFields: {
    bagCount: {
      label: "Bag - Count",
      type: "number",
      fieldSettings: { min: 0 },
      valueSources: ["value"]
    },
    baggageWeight: {
      label: "Baggage - Weight",
      type: "number",
      fieldSettings: { min: 0 },
      valueSources: ["value"]
    },
    dateBooked: { label: "Booking Date", type: "date", valueSources: ["value"] },
    carrier: { label: "Carrier Code", type: "text", valueSources: ["value"] },
    dateReceived: { label: "Date Received", type: "date", valueSources: ["value"] },
    daysBookedBeforeTravel: {
      label: "Days Booked Before Travel",
      type: "number",
      fieldSettings: { min: 0 },
      valueSources: ["value"]
    },
    departureDate: { label: "Departure Date", type: "date", valueSources: ["value"] },
    id: { label: "Pnr Id", type: "text", valueSources: ["value"] },
    origin: { label: "Origin - Airport", type: "text", valueSources: ["value"] },
    originCountry: { label: "Origin - Country", type: "text", valueSources: ["value"] },
    passengerCount: {
      label: "Passenger Count",
      type: "number",
      fieldSettings: { min: 0 },
      valueSources: ["value"]
    },
    recordLocator: { label: "Record Locator", type: "text", valueSources: ["value"] },
    seat: { label: "Seat", type: "text", valueSources: ["value"] },
    tripType: { label: "Trip Type", type: "text", valueSources: ["value"] },
    tripDuration: {
      label: "Trip Duration",
      type: "number",
      fieldSettings: { min: 0 },
      valueSources: ["value"]
    }
  },

  phoneFields: { number: { label: "Number", type: "text", valueSources: ["value"] } },

  dwellTimeFields: {
    location: { label: "Location", type: "text", valueSources: ["value"] },
    dwellTime: {
      label: "Lay over Time",
      type: "number",
      fieldSettings: { min: 0 },
      valueSources: ["value"]
    }
  },

  agencyFields: {
    country: {
      label: "Country",
      type: "text",
      fieldSettings: {
        listValues: [
          { value: "yellow", title: "Yellow" },
          { value: "green", title: "Green" },
          { value: "red", title: "Red" },
          { value: "brown", title: "Brown" },
          { value: "black", title: "Black" },
          { value: "orange", title: "Orange" }
        ]
      },
      valueSources: ["value"]
    },
    identifier: { label: "Identifier", type: "text", valueSources: ["value"] },
    location: { label: "Location", type: "text", valueSources: ["value"] },
    name: { label: "Name", type: "text", valueSources: ["value"] },
    city: { label: "City", type: "text", valueSources: ["value"] },
    phone: { label: "Phone", type: "text", valueSources: ["value"] }
  }
};

export const fakequery = {
  id: "g-b",
  rules: [
    {
      id: "r-10305584923",
      field: "Address.line1",
      value: "",
      operator: "null"
    },
    {
      id: "r-1030558492",
      field: "Bag.airline",
      value: "IAD",
      operator: "EQUAL"
    },
    {
      id: "g-xWAFwb_nuhGLWTII6Hfwo",
      rules: [
        {
          id: "r-LPFoRuzNV_QM3kJW_YDAo",
          field: "Address.line2",
          value: "",
          operator: "null"
        },
        {
          id: "r-wxBfBY335cUyBSF-Zpjlz",
          field: "CreditCard.number",
          value: "",
          operator: "null"
        },
        {
          id: "r-T52HEf8YEhO1NVNQ0nwax",
          field: "BookingDetail.origin",
          value: "",
          operator: "null"
        }
      ],
      combinator: "and",
      not: false
    },
    {
      id: "r-oCVbdomIhUsXSbdt4cvx9",
      field: "CreditCard.expiration",
      value: "",
      operator: "null"
    },
    {
      id: "g-EFxwdBNCTMHYuJxn_CRma",
      rules: [
        {
          id: "r-UnPwHG4_tTsnxdXyWeGO2",
          field: "Address.country",
          value: "",
          operator: "null"
        },
        {
          id: "r-Wx-wjSop4nnmK5vK6cb4s",
          field: "Email.domain",
          value: "",
          operator: "null"
        }
      ],
      combinator: "and",
      not: false
    }
  ],
  combinator: "and",
  not: false
};

const stringops = [
  "EQUAL",
  "NOT_EQUAL",
  "BETWEEN",
  "NOT_BETWEEN",
  "BEGINS_WITH",
  "NOT_BEGINS_WITH",
  "CONTAINS",
  "NOT_CONTAINS",
  "ENDS_WITH",
  "NOT_ENDS_WITH"
];

const stringopsNull = [...stringops, "IS_NULL", "IS_NOT_NULL"];

const dateops = [
  "EQUAL",
  "NOT_EQUAL",
  "LESS",
  "LESS_OR_EQUAL",
  "GREATER",
  "GREATER_OR_EQUAL",
  "BETWEEN",
  "NOT_BETWEEN"
];

const dateopsNull = [...dateops, "IS_NULL", "IS_NOT_NULL"];

const equalInNull = [
  "EQUAL",
  "NOT_EQUAL",
  "BETWEEN",
  "NOT_BETWEEN",
  "IS_NULL",
  "IS_NOT_NULL"
];

const intops = [
  "EQUAL",
  "NOT_EQUAL",
  "LESS",
  "LESS_OR_EQUAL",
  "GREATER",
  "GREATER_OR_EQUAL",
  "BETWEEN",
  "NOT_BETWEEN"
];

export const gtasops = `<select>
<option value="EQUAL" label="EQUAL"></option>
<option value="NOT_EQUAL" label="NOT_EQUAL"></option>
<option value="BETWEEN" label="IN"></option>
<option value="NOT_BETWEEN" label="NOT_IN"></option>
<option value="BEGINS_WITH" label="BEGINS_WITH"></option>
<option value="NOT_BEGINS_WITH" label="NOT_BEGINS_WITH"></option>
<option value="CONTAINS" label="CONTAINS"></option>
<option value="NOT_CONTAINS" label="NOT_CONTAINS"></option>
<option value="ENDS_WITH" label="ENDS_WITH"></option>
<option value="NOT_ENDS_WITH" label="NOT_ENDS_WITH"></option>
<option value="IS_NULL" label="IS_NULL"></option>
<option value="IS_NOT_NULL" label="IS_NOT_NULL"></option>
</select>`;

export const gtasoparray = [
  { name: "EQUAL", label: "=" },
  { name: "NOT_EQUAL", label: "!=" },
  { name: "IS_NULL", label: "is null" },
  { name: "IS_NOT_NULL", label: "is not null" },
  { name: "BETWEEN", label: "between" },
  { name: "NOT_BETWEEN", label: "not between" },
  { name: "LESS", label: "<" },
  { name: "GREATER", label: ">" },
  { name: "GREATER_OR_EQUAL", label: "<=" },
  { name: "LESS_OR_EQUAL", label: ">=" },
  { name: "CONTAINS", label: "contains" },
  { name: "BEGINS_WITH", label: "begins with" },
  { name: "ENDS_WITH", label: "ends with" },
  { name: "NOT_CONTAINS", label: "does not contain" },
  { name: "NOT_BEGINS_WITH", label: "does not begin with" },
  { name: "NOT_ENDS_WITH", label: "does not end with" }
];

const equalIn = ["EQUAL", "NOT_EQUAL", "IN", "NOT_IN"];

const yesno = { "1": "Yes", "0": "No" };

export const fullEntities = {
  Address: {
    label: "ADDRESS",
    columns: [
      {
        id: "Address.city",
        type: "string",
        operators: stringops
      },
      {
        id: "Address.country",
        type: "string",
        operators: stringops,
        multiple: true
      },
      {
        id: "Address.line1",
        type: "string",
        operators: stringops
      },
      {
        id: "Address.line2",
        type: "string",
        operators: stringops
      },
      {
        id: "Address.line3",
        type: "string",
        operators: stringops
      },
      {
        id: "Address.postalCode",
        type: "string",
        operators: stringops
      },
      {
        id: "Address.state",
        type: "string",
        operators: stringops
      }
    ]
  },
  CreditCard: {
    label: "CREDIT CARD",
    columns: [
      {
        id: "CreditCard.accountHolder",
        type: "string",
        operators: stringops,
        multiple: true
      },
      {
        id: "CreditCard.expiration",
        type: "date",
        operators: dateops
      },
      {
        id: "CreditCard.number",
        type: "string",
        operators: stringops
      },
      {
        id: "CreditCard.cardType",
        type: "string",
        operators: stringops
      }
    ]
  },
  Document: {
    label: "DOCUMENT",
    columns: [
      {
        id: "Document.issuanceCountry",
        type: "string",
        operators: stringopsNull,
        multiple: true
      },
      {
        id: "Document.expirationDate",
        type: "date",
        operators: dateopsNull
      },
      {
        id: "Document.issuanceDate",
        type: "date",
        operators: dateopsNull
      },
      {
        id: "Document.documentNumber",
        type: "string",
        operators: stringopsNull
      },
      {
        id: "Document.documentType",
        type: "string",
        operators: equalInNull,
        input: "select",
        multiple: true
      }
    ]
  },
  Email: {
    label: "EMAIL",
    columns: [
      {
        id: "Email.address",
        type: "string",
        operators: stringops
      },
      {
        id: "Email.domain",
        type: "string",
        operators: stringops
      }
    ]
  },
  Flight: {
    label: "FLIGHT",
    columns: [
      {
        id: "Flight.destination",
        label: "Airport Destination",
        type: "string",
        operators: stringops,
        multiple: true
      },
      {
        id: "Flight.origin",
        label: "Airport Origin",
        type: "string",
        operators: stringops,
        input: "select",
        multiple: true,
        plugin: "selectize",
        dataSource: "airports"
      },
      {
        id: "Flight.carrier",
        label: "Carrier",
        type: "string",
        operators: stringops
      },
      {
        id: "Flight.destinationCountry",
        label: "Destination Country",
        type: "string",
        operators: stringops,
        multiple: true
      },
      {
        id: "Flight.originCountry",
        label: "Origin Country",
        type: "string",
        operators: stringops,
        multiple: true
      },
      {
        id: "Flight.direction",
        label: "Direction",
        type: "string",
        operators: "EQUALS",
        input: "radio",
        values: {
          I: "Inbound",
          O: "Outbound"
        }
      },
      {
        id: "Flight.mutableFlightDetails.etaDate",
        label: "ETA",
        type: "date",
        operators: dateops
      },
      {
        id: "Flight.etdDate",
        label: "ETD",
        type: "date",
        operators: dateops
      },
      {
        id: "Flight.flightNumber",
        label: "Number",
        type: "string",
        operators: stringops
      },
      {
        id: "Flight.isOperatingFlight",
        label: "Is Operating Flight",
        type: "boolean",
        operators: "EQUALS",
        input: "radio",
        values: yesno
      },
      {
        id: "Flight.isMarketingFlight",
        label: "Is Marketing Flight",
        type: "boolean",
        operators: "EQUALS",
        input: "radio",
        values: yesno
      }
    ]
  },
  BookingDetail: {
    label: "FLIGHT LEG",
    columns: [
      {
        id: "BookingDetail.origin",
        label: "Origin",
        type: "string",
        operators: stringops,
        multiple: true
      },
      {
        id: "BookingDetail.destination",
        label: "Destination",
        type: "string",
        operators: stringops,
        multiple: true
      }
    ]
  },
  FrequentFlyer: {
    label: "FREQUENT FLYER",
    columns: [
      {
        id: "FrequentFlyer.carrier",
        label: "Carrier",
        type: "string",
        operators: stringops
      },
      {
        id: "FrequentFlyer.number",
        label: "Number",
        type: "string",
        operators: stringops
      }
    ]
  },
  Passenger: {
    label: "PASSENGER",
    columns: [
      {
        id: "Passenger.passengerDetails.age",
        label: "Age",
        type: "integer",
        operators: intops
      },
      {
        id: "Passenger.passengerTripDetails.coTravelerCount",
        label: "APIS Co-Passengers",
        type: "integer",
        operators: intops
      },
      {
        id: "Passenger.passengerTripDetails.hoursBeforeTakeOff",
        label: "Hours Before Take Off",
        type: "integer",
        operators: intops
      },
      {
        id: "Passenger.passengerDetails.nationality",
        label: "Nationality",
        type: "string",
        operators: stringopsNull,
        input: "select",
        multiple: true,
        plugin: "selectize",
        dataSource: "countries"
      },
      {
        id: "Passenger.passengerTripDetails.debarkation",
        label: "Debarkation Airport",
        type: "string",
        operators: stringopsNull,
        input: "select",
        multiple: true,
        plugin: "selectize",
        dataSource: "airports"
      },
      {
        id: "Passenger.passengerTripDetails.debarkCountry",
        label: "Debarkation Country",
        type: "string",
        operators: stringops,
        input: "select",
        multiple: true,
        plugin: "selectize",
        dataSource: "countries"
      },
      {
        id: "Passenger.passengerDetails.dob",
        label: "DOB",
        type: "date",
        operators: dateopsNull,
        plugin: "datepicker"
      },
      {
        id: "Passenger.passengerTripDetails.embarkation",
        label: "Embarkation Airport",
        type: "string",
        operators: stringopsNull,
        input: "select",
        multiple: true,
        plugin: "selectize",
        dataSource: "airports"
      },
      {
        id: "Passenger.passengerTripDetails.embarkCountry",
        label: "Embarkation Country",
        type: "string",
        operators: stringops,
        input: "select",
        multiple: true,
        plugin: "selectize",
        dataSource: "countries"
      },
      {
        id: "Passenger.passengerDetails.gender",
        label: "Gender",
        type: "string",
        operators: stringops,
        input: "select",
        multiple: true,
        plugin: "selectize",
        dataSource: "genders"
      },
      {
        id: "Passenger.passengerDetails.firstName",
        label: "Name - First",
        type: "string",
        operators: stringopsNull
      },
      {
        id: "Passenger.passengerDetails.lastName",
        label: "Name - Last",
        type: "string",
        operators: stringopsNull
      },
      {
        id: "Passenger.passengerDetails.middleName",
        label: "Name - Middle",
        type: "string",
        operators: stringopsNull
      },
      {
        id: "Passenger.passengerDetails.residencyCountry",
        label: "Residency Country",
        type: "string",
        operators: stringops,
        input: "select",
        multiple: true,
        plugin: "selectize",
        dataSource: "countries"
      },
      {
        id: "Passenger.passengerDetails.passengerType",
        label: "Type",
        type: "string",
        operators: equalIn,
        input: "select",
        multiple: true,
        plugin: "selectize",
        dataSource: "passenger_types"
      },
      {
        id: "Passenger.passengerTripDetails.travelFrequency",
        label: "Travel Frequency",
        type: "integer",
        operators: intops
      }
    ]
  },
  Seat: {
    label: "SEAT",
    columns: [
      {
        id: "Seat.number",
        label: "Number",
        type: "string",
        operators: stringops
      },
      {
        id: "Seat.cabinClass",
        label: "Cabin Class",
        type: "string",
        operators: stringops
      },
      {
        id: "Seat.apis",
        label: "Is Apis",
        type: "boolean",
        operators: ["EQUAL", "NOT_EQUAL"]
      }
    ]
  },
  Phone: {
    label: "PHONE",
    columns: [
      {
        id: "Phone.number",
        label: "Number",
        type: "string",
        operators: stringops
      }
    ]
  },
  Bag: {
    label: "BAG",
    columns: [
      {
        id: "Bag.airline",
        label: "Airline",
        type: "string",
        operators: stringops
      },
      {
        id: "Bag.bagId",
        label: "Bag Identifier",
        type: "string",
        operators: stringops
      },
      {
        id: "Bag.data_source",
        label: "Data Source",
        type: "string",
        operators: stringops
      },
      {
        id: "Bag.country",
        label: "Destination Country",
        type: "string",
        operators: stringops,
        input: "select",
        multiple: true,
        plugin: "selectize",
        dataSource: "countries"
      },
      {
        id: "Bag.destinationAirport",
        label: "Destination Airport",
        type: "string",
        operators: stringops,
        input: "select",
        multiple: true,
        plugin: "selectize",
        dataSource: "airports"
      },
      {
        id: "Bag.primeFlight",
        label: "Is Prime Flight",
        type: "boolean",
        operators: "EQUALS",
        input: "radio",
        values: yesno
      },
      {
        id: "Bag.bagMeasurements.weight",
        label: "Bag Weight Measurement (kg)",
        type: "double",
        operators: intops
      },
      {
        id: "Bag.bagMeasurements.bagCount",
        label: "Bag Measurement Count",
        type: "integer",
        operators: intops
      },
      {
        id: "Bag.headPool",
        label: "Is Head Of a Baggage Pool",
        type: "boolean",
        operators: "EQUALS",
        input: "radio",
        values: yesno
      }
    ]
  },
  PaymentForm: {
    label: "FORM OF PAYMENT",
    columns: [
      {
        id: "PaymentForm.wholeDollarAmount",
        label: "Monetary Amount(No Decimal)",
        type: "integer",
        operators: intops
      },
      {
        id: "PaymentForm.paymentType",
        label: "Form of Payment",
        type: "string",
        operators: equalIn,
        input: "text",
        plugin: "selectize",
        dataSource: "form_of_payment_types"
      }
    ]
  },
  Pnr: {
    label: "PNR",
    columns: [
      {
        id: "Pnr.bagCount",
        label: "Bag - Count",
        type: "integer",
        operators: intops
      },
      {
        id: "Pnr.baggageWeight",
        label: "Baggage - Weight",
        type: "double",
        operators: intops
      },
      {
        id: "Pnr.dateBooked",
        label: "Booking Date",
        type: "date",
        operators: dateops,
        plugin: "datepicker"
      },
      {
        id: "Pnr.carrier",
        label: "Carrier Code",
        type: "string",
        operators: stringops
      },
      {
        id: "Pnr.dateReceived",
        label: "Date Received",
        type: "date",
        operators: dateops,
        plugin: "datepicker"
      },
      {
        id: "Pnr.daysBookedBeforeTravel",
        label: "Days Booked Before Travel",
        type: "integer",
        operators: intops
      },
      {
        id: "Pnr.departureDate",
        label: "Departure Date",
        type: "date",
        operators: dateops,
        plugin: "datepicker"
      },
      {
        id: "Pnr.id",
        label: "Pnr Id",
        type: "integer",
        operators: ["EQUAL", "NOT_EQUAL"]
      },
      {
        id: "Pnr.origin",
        label: "Origin - Airport",
        type: "string",
        operators: stringops,
        input: "select",
        multiple: true,
        plugin: "selectize",
        dataSource: "airports"
      },
      {
        id: "Pnr.originCountry",
        label: "Origin - Country",
        type: "string",
        operators: stringops,
        input: "select",
        multiple: true,
        plugin: "selectize",
        dataSource: "countries"
      },
      {
        id: "Pnr.passengerCount",
        label: "Passenger Count",
        type: "integer",
        operators: intops
      },
      {
        id: "Pnr.recordLocator",
        label: "Record Locator",
        type: "string",
        operators: stringops
      },
      {
        id: "Pnr.seat",
        label: "Seat",
        type: "string",
        operators: stringops
      },
      {
        id: "Pnr.tripType",
        label: "Trip Type",
        type: "string",
        input: "select",
        multiple: false,
        values: {
          "ONE-WAY": "ONE-WAY",
          "ROUND-TRIP": "ROUND-TRIP",
          "MULTI-CITY": "MULTI-CITY",
          "NON-CONTIGUOUS": "NON-CONTIGUOUS",
          "OPEN JAW": "OPEN JAW"
        },
        operators: ["EQUAL", "NOT_EQUAL"]
      },
      {
        id: "Pnr.tripDuration",
        label: "Trip Duration",
        type: "double",
        operators: intops
      }
    ]
  },
  DwellTime: {
    label: "DWELL TIME",
    columns: [
      {
        id: "DwellTime.location",
        label: "Location",
        type: "string",
        operators: stringops
      },
      {
        id: "DwellTime.dwellTime",
        label: "Lay over Time",
        type: "double",
        operators: intops
      }
    ]
  },
  Agency: {
    label: "TRAVEL AGENCY",
    columns: [
      {
        id: "Agency.country",
        label: "Country",
        type: "string",
        operators: stringops,
        input: "select",
        multiple: true,
        plugin: "selectize",
        dataSource: "countries"
      },
      {
        id: "Agency.identifier",
        label: "Identifier",
        type: "string",
        operators: stringops
      },
      {
        id: "Agency.location",
        label: "Location",
        type: "string",
        operators: stringops
      },
      {
        id: "Agency.name",
        label: "Name",
        type: "string",
        operators: stringops
      },
      {
        id: "Agency.city",
        label: "City",
        type: "string",
        operators: stringops
      },
      {
        id: "Agency.phone",
        label: "Phone",
        type: "string",
        operators: stringops
      }
    ]
  }
};

/** Initial query with the first rule row pre-loaded */
export const initQuery = {
  id: "g-ITRz8BH8fS77-cw-DS4Ss",
  rules: [{ id: "r--idiJE1qPaXYJtaTgqYng", field: "", value: "", operator: "null" }],
  combinator: "and",
  not: false
};

export const addressFieldArray = [
  { name: "", key: "0", label: "Select" },
  { key: "Address.city", name: "Address.city", label: "City" },
  { key: "Address.country", name: "Address.country", label: "Country" },
  { key: "Address.line1", name: "Address.line1", label: "Line 1" },
  { key: "Address.line2", name: "Address.line2", label: "Line 2" },
  { key: "Address.line3", name: "Address.line3", label: "Line 3" },
  { key: "Address.postalCode", name: "Address.postalCode", label: "Postal Code" },
  { key: "Address.state", name: "Address.state", label: "State" }
];

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
<option label="PHONE" value="PHONE"></option>
<option label="FORM OF PAYMENT" value="PAYMENTFORM"></option>
<option label="PNR" value="PNR"></option>
<option label="DWELL TIME" value="DWELLTIME"></option>
<option label="TRAVEL AGENCY" VALUE="AGENCY"></option>
</select>`;

export const buttonConfigQuery = {
  removeRule: {
    label: "X",
    title: "Remove rule"
  },
  removeGroup: {
    label: "X",
    title: "Remove group"
  },
  addRule: {
    label: "+Query",
    title: "Add query"
  }
};

export const buttonConfigRule = {
  removeRule: {
    label: "X",
    title: "Remove rule"
  },
  removeGroup: {
    label: "X",
    title: "Remove group"
  }
};

export const FIELDS = {
  addressFields: `<select>
  <option key="0" value="" label="Select"></option>
<option key="Address.city" value="Address.city" label="City"></option>
<option key="Address.country" value="Address.country" label="Country"></option>
<option key="Address.line1" value="Address.line1" label="Line 1"></option>
<option key="Address.line2" value="Address.line2" label="Line 2"></option>
<option key="Address.line3" value="Address.line3" label="Line 3"></option>
<option key="Address.postalCode" value="Address.postalCode" label="Postal Code"></option>
<option key="Address.state" value="Address.state" label="State"></option>
</select>`,

  bagFields: `<select>
  <option key="0" value="" label="Select"></option>
<option key="Bag.airline" value="Bag.airline" label="Airline"></option>
<option key="Bag.bagId" value="Bag.bagId" label="Bag ID"></option>
<option key="Bag.dataSource" value="Bag.dataSource" label="Data Source"></option>
<option key="Bag.country" value="Bag.country" label="Destination Country"></option>
<option key="Bag.destinationAirport" value="Bag.destinationAirport" label="Destination Airport"></option>
<option key="Bag.primeFlight" value="Bag.primeFlight" label="Is Prime Flight"></option>
<option key="Bag.bagMeasurements.weight" value="Bag.bagMeasurements.weight" label="Bag Weight Measurement (kg)"></option>
<option key="Bag.headPool" value="Bag.headPool" label="Is Head Of a Baggage Pool"></option>
</select>`,

  documentFields: `<select>
<option key="0" value="" label="Select"></option>
<option value="Document.documentNumber" key="Document.documentNumber" label="Number"> </option>
<option value="Document.documentType" key="Document.documentType" label="Type"> </option>
<option value="Document.issuanceCountry" key="Document.issuanceCountry" label="Issuance Country"> </option>
<option value="Document.expirationDate" key="Document.expirationDate" label="Expiration Date"> </option>
<option value="Document.issuanceDate" key="Document.issuanceDate" label="Issuance Date"></option>
</select>`,

  creditcardFields: `<select>
<option key="0" value="" label="Select"></option>
<option key="CreditCard.accountHolder" value="CreditCard.accountHolder" label="Account Holder"></option>
<option key="CreditCard.expiration" value="CreditCard.expiration" label="Expiration Date"></option>
<option key="CreditCard.number" value="CreditCard.number" label="Number"></option>
<option key="CreditCard.cardType" value="CreditCard.cardType" label="Type"></option>`,

  emailFields: `<select>
  <option key="0" value="" label="Select"></option>
  <option key="Email.address" value="Email.address" label="Address"></option>
  <option key="Email.domain" value="Email.domain" label="Domain"></option>
</select>`,

  legFields: `<select>
<option key="0" value="" label="Select"></option>
<option key="BookingDetail.origin" value="BookingDetail.origin" label="Origin" ops="stringops"></option>
<option key="BookingDetail.destination" value="BookingDetail.destination" label="Destination" ops="stringops"></option>
</select>`,

  flightFields: `<select>
  <option key="0" value="" label="Select"></option>
  <option key="Flight.destination" value="Flight.destination" label="Airport Destination"></option>
  <option key="Flight.origin" value="Flight.origin" label="Airport Origin"></option>
  <option key="Flight.carrier" value="Flight.carrier" label="Carrier"></option>
  <option key="Flight.destinationCountry" value="Flight.destinationCountry" label="Destination Country"></option>
  <option key="Flight.originCountry" value="Flight.originCountry" label="Origin Country"></option>
  <option key="Flight.direction" value="Flight.direction" label="Direction"></option>
  <option key="Flight.mutableFlightDetails.etaDate" value="Flight.mutableFlightDetails.etaDate" label="ETA"></option>
  <option key="Flight.etdDate" value="Flight.etdDate" label="ETD"></option>
  <option key="Flight.flightNumber" value="Flight.flightNumber" label="Number"></option>
  <option key="Flight.isOperatingFlight" value="Flight.isOperatingFlight" label="Is Operating Flight"></option>
  <option key="Flight.isMarketingFlight" value="Flight.isMarketingFlight" label="Is Marketing Flight"></option>
</select>`,

  frequentFlyerFields: `<select>
  <option key="0" value="" label="Select"></option>
  <option key="FrequentFlyer.carrier" value="FrequentFlyer.carrier" label="Carrier"></option>
  <option key="FrequentFlyer.number" value="FrequentFlyer.number" label="Number"></option>
</select>`,

  passengerFields: `<select>
  <option key="0" value="" label="Select"></option>
  <option key="Passenger.passengerDetails.age" value="Passenger.passengerDetails.age" label="Age"></option>
  <option key="Passenger.passengerTripDetails.coTravelerCount" value="Passenger.passengerTripDetails.coTravelerCount" label="APIS Co-Passengers"></option>
  <option key="Passenger.passengerTripDetails.hoursBeforeTakeOff" value="Passenger.passengerTripDetails.hoursBeforeTakeOff" label="Hours Before Take Off"></option>
  <option key="Passenger.passengerDetails.nationality" value="Passenger.passengerDetails.nationality" label="Nationality"></option>
  <option key="Passenger.passengerTripDetails.debarkation" value="Passenger.passengerTripDetails.debarkation" label="Debarkation Airport"></option>
  <option key="Passenger.passengerTripDetails.debarkCountry" value="Passenger.passengerTripDetails.debarkCountry" label="Debarkation Country"></option>
  <option key="Passenger.passengerDetails.dob" value="Passenger.passengerDetails.dob" label="DOB"></option>
  <option key="Passenger.passengerTripDetails.embarkation" value="Passenger.passengerTripDetails.embarkation" label="Embarkation Airport"></option>
  <option key="Passenger.passengerTripDetails.embarkCountry" value="Passenger.passengerTripDetails.embarkCountry" label="Embarkation Country"></option>
  <option key="Passenger.passengerDetails.gender" value="Passenger.passengerDetails.gender" label="Gender"></option>
  <option key="Passenger.passengerDetails.firstName" value="Passenger.passengerDetails.firstName" label="Name - First"></option>
  <option key="Passenger.passengerDetails.lastName" value="Passenger.passengerDetails.lastName" label="Name - Last"></option>
  <option key="Passenger.passengerDetails.middleName" value="Passenger.passengerDetails.middleName" label="Name - Middle"></option>
  <option key="Passenger.passengerDetails.residencyCountry" value="Passenger.passengerDetails.residencyCountry" label="Residency Country"></option>
  <option key="Passenger.seat" value="Passenger.seat" label="Seat"></option>
  <option key="Passenger.passengerDetails.passengerType" value="Passenger.passengerDetails.passengerType" label="Type"></option>
  <option key="Passenger.passengerTripDetails.travelFrequency" value="Passenger.passengerTripDetails.travelFrequency" label="Travel Frequency"></option>
  </select>`,

  paymentFields: `<select>
  <option key="0" value="" label="Select"></option>
    <option key="PaymentForm.wholeDollarAmount" value="PaymentForm.wholeDollarAmount" label="Monetary Amount(No Decimal)"></option>
    <option key="PaymentForm.paymentType" value="PaymentForm.paymentType" label="Form of Payment"></option>
  </select>`,

  pnrFields: `<select>
  <option key="0" value="" label="Select"></option>
  <option key="Pnr.bagCount" value="Pnr.bagCount" label="Bag - Count"></option>
  <option key="Pnr.baggageWeight" value="Pnr.baggageWeight" label="Baggage - Weight"></option>
  <option key="Pnr.dateBooked" value="Pnr.dateBooked" label="Booking Date"></option>
  <option key="Pnr.carrier" value="Pnr.carrier" label="Carrier Code"></option>
  <option key="Pnr.dateReceived" value="Pnr.dateReceived" label="Date Received"></option>
  <option key="Pnr.daysBookedBeforeTravel" value="Pnr.daysBookedBeforeTravel" label="Days Booked Before Travel"></option>
  <option key="Pnr.departureDate" value="Pnr.departureDate" label="Departure Date"></option>
  <option key="Pnr.id" value="Pnr.id"  label="Pnr Id"></option>
  <option key="Pnr.origin" value="Pnr.origin"  label="Origin - Airport"></option>
  <option key="Pnr.originCountry" value="Pnr.originCountry"  label="Origin - Country"></option>
  <option key="Pnr.passengerCount" value="Pnr.passengerCount"  label="Passenger Count"></option>
  <option key="Pnr.recordLocator" value="Pnr.recordLocator"  label="Record Locator"></option>
  <option key="Pnr.seat" value="Pnr.seat" label="Seat"></option>
  <option key="Pnr.tripType" value="Pnr.tripType" label="Trip Type"></option>
  <option key="Pnr.tripDuration" value="Pnr.tripDuration" label="Trip Duration"></option>
  </select>`,

  phoneFields: `<select>
  <option key="0" value="" label="Select"></option>
  <option key="Phone.number" value="Phone.number" label="Number"></option>
  </select>`,

  dwelltimeFields: `<select>
  <option key="0" value="" label="Select"></option>
  <option key="DwellTime.location" value="DwellTime.location" label="Location"></option>
  <option key="DwellTime.dwellTime" value="DwellTime.dwellTime" label="Lay over Time"></option>
  </select>`,

  agencyFields: `<select>
  <option key="0" value="" label="Select"></option>
  <option key="Agency.country" value="Agency.country" label="Country"></option>
  <option key="Agency.identifier" value="Agency.identifier" label="Identifier"></option>
  <option key="Agency.location" value="Agency.location" label="Location"></option>
  <option key="Agency.name" value="Agency.name" label="Name"></option>
  <option key="Agency.city" value="Agency.city" label="City"></option>
  <option key="Agency.phone" value="Agency.phone" label="Phone"></option>
  </select>`
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
  "IN",
  "NOT_IN",
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

const equalInNull = ["EQUAL", "NOT_EQUAL", "IN", "NOT_IN", "IS_NULL", "IS_NOT_NULL"];

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
<option value="IN" label="IN"></option>
<option value="NOT_IN" label="NOT_IN"></option>
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
  { name: "IN", label: "in" },
  { name: "NOT_IN", label: "not in" },
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
        id: "Passenger.seat",
        label: "Seat",
        type: "string",
        operators: stringops
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

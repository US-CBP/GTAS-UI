// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import svgs from "./utils";

export const palette = {
  address: "#2C17B1",
  airport: "#1144AA",
  creditcard: "#007676",
  document: "#219E00",
  email: "#D77B00",
  flight: "#A90067",
  hit: "#FF0D00",
  passenger: "#5e166e",
  phone: "#D74B00"
};

/**
 * Basic node config - sets the retrieved fields, color, icons for each node type.
 * @param {*} SvgType
 * @param {*} params
 */
export const provider = (SvgType, params) => {
  return {
    Address: {
      returnAttributes: ["address_line_1", "country", "city"],
      displayAttribute: "address_line_1",
      getDisplayType: () => SvgType,
      getColor: () => palette.address,
      getIsTextDisplayed: () => true,
      getSVGPaths: () => [
        {
          d: svgs.getAddressPath(),
          fill: palette.address
        }
      ]
    },
    Airport: {
      returnAttributes: ["country_code", "airport_code"],
      constraintAttribute: "airport_code",
      displayAttribute: "airport_code",
      getDisplayType: () => SvgType,
      getIsTextDisplayed: () => true,
      getSVGPaths: function() {
        return [
          {
            d: svgs.getAirportPath(),
            fill: palette.airport
          }
        ];
      },
      getColor: () => palette.airport
    },
    Passenger: {
      returnAttributes: [
        "id_tag",
        "first_name",
        "middle_name",
        "last_name",
        "dob",
        "gender",
        "nationality",
        "last_updated_on",
        "gtas_passenger_id",
        "gtas_message_create_dtm",
        "gtas_message_id"
      ],
      constraintAttribute: "id_tag",
      displayAttribute: "last_name",
      getPredefinedConstraints: () => {
        if (params.idTag) return [`passenger.id_tag  = '${params.idTag}'`];
        else return [];
      },
      getDisplayType: () => SvgType,
      getSVGPaths: function() {
        return [
          {
            d: svgs.getPassengerPath(),
            fill: palette.passenger
          }
        ];
      },
      getColor: () => palette.passenger
    },
    Phone: {
      returnAttributes: ["number"],
      displayAttribute: "number",
      constraintAttribute: "number",
      getDisplayType: () => SvgType,
      getIsTextDisplayed: () => true,
      getSVGPaths: function() {
        return [
          {
            d: svgs.getPhonePath(),
            fill: palette.phone
          }
        ];
      },
      getColor: () => palette.phone
    },
    CreditCard: {
      returnAttributes: ["number", "exp_date", "type", "account_holder"],
      displayAttribute: "number",
      constraintAttribute: "number",
      getDisplayType: () => SvgType,
      getIsTextDisplayed: () => true,
      getColor: () => palette.creditcard,
      getSVGPaths: function() {
        return [
          {
            d: svgs.getCreditCardPath(),
            fill: palette.creditcard
          }
        ];
      }
    },
    Document: {
      returnAttributes: ["number", "exp_date", "type", "issuance_country"],
      displayAttribute: "number",
      constraintAttribute: "number",
      getDisplayType: () => SvgType,
      getIsTextDisplayed: () => true,
      getSVGPaths: function() {
        return [
          {
            d: svgs.getDocumentPath(),
            fill: palette.document
          }
        ];
      },
      getColor: () => palette.document
    },
    Email: {
      returnAttributes: ["address"],
      displayAttribute: "address",
      constraintAttribute: "address",
      getDisplayType: () => SvgType,
      getIsTextDisplayed: () => true,
      getColor: () => palette.email,
      getSVGPaths: function() {
        return [
          {
            d: svgs.getEmailPath(),
            fill: palette.email
          }
        ];
      }
    },
    Flight: {
      returnAttributes: [
        "full_flight_number",
        "flight_id_tag",
        "eta_date",
        "full_eta_dtm",
        "destination_country",
        "gtas_message_id",
        "flight_number",
        "origin",
        "destination",
        "passenger_count",
        "full_etd_dtm",
        "origin_country",
        "gtas_message_create_dtm",
        "carrier",
        "last_updated_on",
        "etd_date",
        "direction"
      ],
      constraintAttribute: "flight_id_tag",
      displayAttribute: "full_flight_number",
      getPredefinedConstraints: function() {
        if (params.flightIdTag)
          return [`flight.flight_id_tag  = '${params.flightIdTag}'`];
        else return [];
      },
      getDisplayType: () => SvgType,
      getIsTextDisplayed: () => true,
      getColor: () => palette.flight,
      getSVGPaths: function() {
        return [
          {
            d: svgs.getFlightPath(),
            fill: palette.flight
          }
        ];
      }
    },
    Hit: {
      returnAttributes: [
        "rule_id",
        "gtas_hit_detail_id",
        "cond_text",
        "description",
        "hit_detail_create_date",
        "title",
        "hit_type"
      ],
      displayAttribute: "hit_type",
      getDisplayType: () => SvgType,
      getIsTextDisplayed: () => true,
      getSVGPaths: function() {
        return [
          {
            d: svgs.getHitPath(),
            fill: palette.hit
          }
        ];
      },
      getColor: () => palette.hit
    }
  };
};

export const paxRelations = (paxFlightIdTag, paxFullFlightNumber) => [
  {
    label: "flew_on",
    target: {
      label: "Flight",
      value: [
        {
          flight_id_tag: paxFlightIdTag,
          full_flight_number: paxFullFlightNumber
        }
      ]
    }
  }
];

const relationsSecondary = [
  { label: "used_document", target: { label: "Document" } },
  { label: "used_email", target: { label: "Email" } },
  { label: "used_creditcard", target: { label: "CreditCard" } },
  { label: "lived_at", target: { label: "Address" } },
  { label: "used_phone", target: { label: "Phone" } },
  { label: "flagged", target: { label: "Hit" } }
];

export const thisPaxFlight = (pax, target) => {
  return {
    label: "Flight",
    horiz: 3,
    value: [
      {
        flight_id_tag: pax.flightIdTag,
        full_flight_number: pax.fullFlightNumber
      }
    ],
    rel: [
      {
        label: "flew_on",
        target: {
          label: "Passenger",
          rel: [{ ...target }]
        }
      }
    ]
  };
};

export const saves = pax => {
  const paxDefaults = {
    label: "Passenger",
    horiz: 2,
    value: [
      {
        id_tag: pax.idTag,
        last_name: pax.lastName
      }
    ]
  };

  return {
    pax: {
      ...paxDefaults,
      horiz: 1,
      rel: [...paxRelations(pax.flightIdTag, pax.fullFlightNumber), ...relationsSecondary]
    },
    flightall: {
      // this flight, all pax, ports
      label: "Flight",
      horiz: 1,
      value: [
        {
          flight_id_tag: pax.flightIdTag,
          full_flight_number: pax.fullFlightNumber
        }
      ],
      rel: [
        {
          label: "flew_on",
          target: { label: "Passenger" }
        },
        {
          label: "origin_of",
          target: {
            label: "Airport",
            value: [{ airport_code: pax.flightOrigin }]
          }
        },
        {
          label: "has_destination",
          target: {
            label: "Airport",
            value: [{ airport_code: pax.flightDestination }]
          }
        }
      ]
    },
    email: {
      ...paxDefaults,
      rel: [relationsSecondary[1]]
    },
    address: {
      ...paxDefaults,
      rel: [relationsSecondary[3]]
    },
    document: {
      ...paxDefaults,
      rel: [relationsSecondary[0]]
    },
    creditcard: {
      ...paxDefaults,
      rel: [relationsSecondary[2]]
    },
    phone: {
      ...paxDefaults,
      rel: [relationsSecondary[4]]
    },
    hit: {
      ...paxDefaults,
      rel: [relationsSecondary[5]]
    }, // rel

    emailall: {
      ...thisPaxFlight(pax, relationsSecondary[1])
    },
    addressall: {
      ...thisPaxFlight(pax, relationsSecondary[3])
    },
    documentall: {
      ...thisPaxFlight(pax, relationsSecondary[0])
    },
    creditcardall: {
      ...thisPaxFlight(pax, relationsSecondary[2])
    },
    phoneall: {
      ...thisPaxFlight(pax, relationsSecondary[4])
    },
    hitall: {
      ...thisPaxFlight(pax, relationsSecondary[5])
    }
  };
}; //saves

export const thisPax = pax => {
  return {
    label: "Passenger",
    value: [
      {
        id_tag: pax.idTag,
        last_name: pax.lastName
      }
    ]
  };
};

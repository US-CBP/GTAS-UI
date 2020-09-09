import React, { useState, useEffect, useMemo } from "react";
import RAQB from "../../../components/raqb/RAQB";
import { Button, Modal, Container, Row } from "react-bootstrap";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { navigate } from "@reach/router";
import { hasData, asArray, localeDateOnly } from "../../../utils/utils";
import { QR, ACTION } from "../../../utils/constants";
import {
  watchlistcats,
  airportLookup,
  countryLookup,
  carrierLookup
} from "../../../services/serviceWrapper";

import { numProps, txtProps, dateProps } from "../../../components/raqb/constants";

const QRModal = props => {
  const id = props.id;
  const svc = props.service;
  const mode = props.mode === QR.RULE ? QR.RULE : QR.QUERY;
  const [data, setData] = useState(props.data?.query);
  const [key, setKey] = useState(0);
  const [summaryData, setSummaryData] = useState(
    props.data || { startDate: localeDateOnly(Date.now()), enabled: true }
  );

  const [airports, setAirports] = useState([]);
  const [countries, setCountries] = useState([]);
  const [carriers, setCarriers] = useState([]);
  const [dataConfig, setDataConfig] = useState([]);

  const [title, setTitle] = useState(props.data?.title || "");
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState();
  const [showInvalid, setShowInvalid] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const isEdit = hasData(props.data);

  // const countryProps = useMemo(() => {
  //   return {
  //     type: "select",
  //     fieldSettings: {
  //       allowCustomValues: true,
  //       listValues: countries
  //     },
  //     valueSources: ["value"]
  //   };
  // }, [countries]);

  const countryProps = useMemo(() => {
    return {
      type: "select",
      fieldSettings: {
        allowCustomValues: true,
        listValues: countries
      },
      valueSources: ["value"]
    };
  }, [countries]);

  const carrierProps = useMemo(() => {
    return {
      type: "select",
      fieldSettings: {
        allowCustomValues: true,
        listValues: carriers
      },
      valueSources: ["value"]
    };
  }, [carriers]);

  const airportProps = useMemo(() => {
    return {
      type: "select",
      fieldSettings: {
        allowCustomValues: true,
        listValues: airports
      },
      valueSources: ["value"]
    };
  }, [airports]);

  const FIELDSINT = useMemo(() => {
    return {
      addressFields: {
        city: { label: "City", ...txtProps },
        country: { label: "Country", ...countryProps },
        line1: { label: "Line 1", ...txtProps },
        line2: { label: "Line 2", ...txtProps },
        line3: { label: "Line 3", ...txtProps },
        postalCode: { label: "Postal Code", ...txtProps },
        state: { label: "State", ...txtProps }
      },

      agencyFields: {
        country: { label: "Country", ...countryProps },
        identifier: {
          label: "Identifier",
          ...txtProps
        },
        location: { label: "Location", ...txtProps },
        name: { label: "Name", ...txtProps },
        city: { label: "City", ...txtProps },
        phone: { label: "Phone", ...txtProps }
      },

      bagFields: {
        airline: { label: "Airline", ...txtProps },
        bagId: { label: "Bag ID", ...txtProps },
        dataSource: { label: "Data Source", ...txtProps },
        country: { label: "Destination Country", ...countryProps },
        destinationAirport: { label: "Destination Airport", ...txtProps },
        primeFlight: {
          label: "Is Prime Flight",
          type: "boolean",
          valueSources: ["value"]
        },
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
            ]
          },
          valueSources: ["value"]
        },
        issuanceCountry: { label: "Issuance Country", ...countryProps },
        expirationDate: { label: "Expiration Date", ...dateProps },
        issuanceDate: { label: "Issuance Date", ...dateProps }
      },

      emailFields: {
        address: { label: "Address", ...txtProps },
        domain: { label: "Domain", ...txtProps }
      },

      legFields: {
        origin: { label: "Origin", ...airportProps },
        destination: { label: "Destination", ...airportProps }
      },

      flightFields: {
        destination: { label: "Destination Airport", ...airportProps },
        origin: { label: "Origin Airport", ...airportProps },
        carrier: { label: "Carrier", ...carrierProps },
        destinationCountry: { label: "Destination Country", ...countryProps },
        originCountry: { label: "Origin Country", ...countryProps },
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
        carrier: { label: "Carrier", ...carrierProps },
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
        "passengerDetails.nationality": { label: "Nationality", ...countryProps },
        "passengerTripDetails.debarkation": {
          label: "Debarkation Airport",
          ...txtProps
        },
        "passengerTripDetails.debarkCountry": {
          label: "Debarkation Country",
          ...countryProps
        },
        "passengerDetails.dob": { label: "DOB", ...dateProps },
        "passengerTripDetails.embarkation": {
          label: "Embarkation Airport",
          ...airportProps
        },
        "passengerTripDetails.embarkCountry": {
          label: "Embarkation Country",
          ...countryProps
        },
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
        "passengerDetails.residencyCountry": {
          label: "Residency Country",
          ...countryProps
        },
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
        carrier: { label: "Carrier Code", ...carrierProps },
        dateReceived: { label: "Date Received", ...dateProps },
        daysBookedBeforeTravel: { label: "Days Booked Before Travel", ...numProps },
        departureDate: { label: "Departure Date", ...dateProps },
        id: { label: "Pnr Id", ...txtProps },
        origin: { label: "Origin - Airport", ...airportProps },
        originCountry: { label: "Origin - Country", ...countryProps },
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
  }, [countryProps, carrierProps, airportProps]);

  const fieldConfigWithData = {
    fields: {
      Address: {
        label: "Address",
        type: "!group",
        subfields: FIELDSINT.addressFields
      },
      Bag: {
        label: "Bag",
        type: "!group",
        subfields: FIELDSINT.bagFields
      },
      CreditCard: {
        label: "Credit Card",
        type: "!group",
        subfields: FIELDSINT.creditCardFields
      },
      Document: {
        label: "Document",
        type: "!group",
        subfields: FIELDSINT.documentFields
      },
      DwellTime: {
        label: "Dwell Time",
        type: "!group",
        subfields: FIELDSINT.dwellTimeFields
      },
      Email: {
        label: "Email",
        type: "!group",
        subfields: FIELDSINT.emailFields
      },
      Flight: {
        label: "Flight",
        type: "!group",
        subfields: FIELDSINT.flightFields
      },
      BookingDetail: {
        label: "Flight Leg",
        type: "!group",
        subfields: FIELDSINT.legFields
      },
      PaymentForm: {
        label: "Form of Payment",
        type: "!group",
        subfields: FIELDSINT.paymentFormFields
      },
      FrequentFlyer: {
        label: "Frequent Flyer",
        type: "!group",
        subfields: FIELDSINT.frequentFlyerFields
      },
      Passenger: {
        label: "Passenger",
        type: "!group",
        subfields: FIELDSINT.passengerFields
      },
      Phone: {
        label: "Phone",
        type: "!group",
        subfields: FIELDSINT.phoneFields
      },
      Pnr: {
        label: "PNR",
        type: "!group",
        subfields: FIELDSINT.pnrFields
      },
      Seat: {
        label: "Seat",
        type: "!group",
        subfields: FIELDSINT.seatFields
      },
      Agency: {
        label: "Travel Agency",
        type: "!group",
        subfields: FIELDSINT.agencyFields
      }
    }
  };

  useEffect(() => {
    setDataConfig(fieldConfigWithData);
  }, [countries, airports, carriers]);

  const cb = ev => {
    let newSummary = summaryData;
    newSummary[ev.name] = ev.value;

    setSummaryData(newSummary);
    setTitle(newSummary.title);
    setRefresh(true);
  };

  const dataCallback = formatted => {
    setQuery(formatted);
    setRefresh(true);
  };

  const onDelete = () => {
    if (hasData(svc)) {
      svc.del(id).then(res => {
        props.callback(ACTION.DELETE);
      });
    }
  };

  useEffect(() => {
    if (refresh) refreshHighlight();
  }, [refresh]);

  const refreshHighlight = () => {
    clearInvalid();

    if (!showInvalid) {
      setRefresh(false);
      return;
    }
    // const q = getSaveObject();
    // const invalids = (q.details || q.query || {})?.invalid;

    // if (!invalids) {
    //   setShowInvalid(false);
    //   setRefresh(false);
    //   return;
    // }
    // highlightInvalid(invalids);
    validateAll();
    setRefresh(false);
  };

  const highlightInvalid = invalidList => {
    if (invalidList.length === 0) {
      setShowInvalid(false);
      return;
    }

    let highlights = invalidList.map(item =>
      document.querySelectorAll(
        `[data-id="${item}"].rule_group.group-or-rule, [data-id="${item}"].rule.group-or-rule`
      )
    );

    highlights.forEach(item =>
      item.forEach(subItem => subItem.classList.add("qrm-invalid"))
    );

    highlightRequiredFormFields();
  };

  const highlightRequiredFormFields = () => {
    if (!title) {
      document.querySelector('[name="title"]').classList.add("qrm-invalid");
    }
    if (!summaryData.ruleCat && mode === QR.RULE) {
      document.querySelector('[name="ruleCat"]').classList.add("qrm-invalid");
    }
  };

  const highlightComponent = () => {
    document
      .querySelector('[class="query-builder-container"]')
      .classList.add("qrm-invalid");
  };

  const validateAll = () => {
    let isValid = true;

    setShowInvalid(true);
    const q = getSaveObject();
    const details = q.details || q.query;
    const invalids = details?.invalid;

    if (!details) {
      highlightComponent();
      isValid = false;
    }
    if (hasData(invalids)) {
      highlightInvalid(invalids);
      isValid = false;
    }

    if (!title || (!summaryData.ruleCat && mode === QR.RULE)) {
      highlightRequiredFormFields();
      isValid = false;
    }
    return isValid;
  };

  const clearInvalid = () => {
    const marked = document.getElementsByClassName("qrm-invalid");

    while (marked.length > 0) {
      marked[0].classList.remove("qrm-invalid");
    }
  };

  const onSave = () => {
    if (!hasData(svc)) return;

    if (!validateAll()) return;

    // setShowInvalid(true);
    const q = getSaveObject();
    // const invalids = (q.details || q.query || {}).invalid;

    // if (hasData(invalids)) return highlightInvalid(invalids);

    const saveMethod = isEdit ? svc.put : svc.post;
    const saveArgs = hasData(id) ? [id, q] : [q];

    saveMethod(...saveArgs).then(() => {
      // postpone callback to parent until *after* the save promise is resolved.
      // Ensures the save is complete before we attempt to refresh the parent table data
      props.callback(ACTION.SAVE);
    });
  };

  const getSaveObject = () => {
    const safeid = id > 0 ? id : null;

    if (props.mode === QR.RULE) {
      return {
        id: safeid,
        details: query,
        summary: {
          title: summaryData.title,
          description: summaryData.description,
          input: "select",
          startDate: new Date(summaryData.startDate || Date.now()),
          endDate: summaryData.endDate ? new Date(summaryData.endDate) : undefined,
          enabled: summaryData.enabled,
          ruleCat: summaryData.ruleCat,
          overMaxHits: null,
          tag: query
        }
      };
    }

    return {
      id: safeid,
      title: summaryData.title,
      description: summaryData.description,
      tag: query,
      query: query
    };
  };

  const onClose = () => {
    props.callback(ACTION.CLOSE);
  };

  const onRun = () => {
    // setShowInvalid(true);
    // const q = getSaveObject();
    // const invalids = (q.details || q.query).invalid;

    // if (hasData(invalids)) return highlightInvalid(invalids);

    if (!validateAll()) return;

    navigate("/gtas/tools/qrdetails", {
      state: {
        data: {
          pageNumber: 1,
          pageSize: 10,
          query: data || query
        }
      }
    });
    props.callback(ACTION.RUN);
  };

  const onClear = () => {
    setData(undefined);
    setTitle();

    setSummaryData({
      title: "",
      description: "",
      startDate: localeDateOnly(Date.now()),
      endDate: "",
      enabled: true,
      ruleCat: -1
    });

    setKey(key + 1);
    setShowInvalid(false);
  };

  useEffect(() => {
    setData(props.data?.query);
    watchlistcats.get().then(res => {
      const cats = asArray(res).map(catitem => {
        return { label: catitem.label, value: catitem.id };
      });

      airportLookup.get().then(res => {
        const apitems = asArray(res).map(apitem => {
          return { value: apitem.iata, title: apitem.name };
        });

        carrierLookup.get().then(res => {
          const caritems = asArray(res).map(caritem => {
            return { value: caritem.iata, title: caritem.name };
          });

          countryLookup.get().then(res => {
            const ctyitems = asArray(res).map(ctyitem => {
              return { value: ctyitem.iso3, title: ctyitem.name };
            });

            setKey(key + 1);
            console.log(ctyitems);
            setCountries(ctyitems);
          });

          // console.log(items);
          setCarriers(caritems);
        });

        // console.log(items);
        setAirports(apitems);
      });

      setCategories(cats);
    });
  }, []);

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {`${props.title}: `}
            <label className="big-name-sidebar">{title}</label>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="qbrb-modal-body">
          <Container fluid>
            <Row className="card-columns qrm">
              <LabelledInput
                datafield
                key={`title${key}`}
                labelText="Title"
                inputType="text"
                inputVal={summaryData?.title}
                name="title"
                callback={cb}
                alt="Title"
                spacebetween
              />
              <LabelledInput
                datafield
                labelText="Description"
                key={`desc${key}`}
                inputType="text"
                inputVal={summaryData?.description}
                name="description"
                callback={cb}
                alt="Description"
                spacebetween
              />
            </Row>
            {mode === QR.RULE && (
              <>
                <Row className="card-columns qrm">
                  <LabelledInput
                    datafield
                    labelText="Start Date"
                    key={`sd${key}`}
                    required={true}
                    inputType="text"
                    inputVal={localeDateOnly(summaryData?.startDate)}
                    name="startDate"
                    callback={cb}
                    alt="start date"
                    spacebetween
                  />
                  <LabelledInput
                    datafield
                    labelText="End Date"
                    key={`ed${key}`}
                    inputType="text"
                    inputVal={localeDateOnly(summaryData?.endDate)}
                    name="endDate"
                    callback={cb}
                    alt="end date"
                    spacebetween
                  />
                </Row>
                <Row className="card-columns qrm">
                  <LabelledInput
                    key={`en${key}`}
                    datafield
                    labelText="Enabled"
                    inputType="checkbox"
                    name="enabled"
                    alt="query or rule is enabled"
                    selected={summaryData?.enabled}
                    callback={cb}
                    spacebetween
                  />
                  <LabelledInput
                    datafield
                    key={`rc${key}`}
                    labelText="Rule Category"
                    inputType="select"
                    options={categories}
                    inputVal={summaryData?.ruleCat}
                    required={true}
                    name="ruleCat"
                    callback={cb}
                    alt="rule category"
                    spacebetween
                    className="rule-cat"
                  />
                </Row>
              </>
            )}

            {countries && categories && (
              <RAQB
                data={data}
                key={key}
                config={dataConfig}
                dataCallback={dataCallback}
              ></RAQB>
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            key="close"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            type="button"
            key="clear"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={onClear}
          >
            Clear
          </Button>
          <Button
            key="save"
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={onSave}
          >
            Save
          </Button>
          <Button
            key="run"
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={onRun}
          >
            Run
          </Button>
          {isEdit && (
            <Button
              key="delete"
              type="button"
              className="m-2 outline-dark-outline"
              variant="outline-dark"
              onClick={onDelete}
            >
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QRModal;

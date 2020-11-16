import React, { useState, useEffect, useMemo, useContext } from "react";
import RAQB from "../../../components/raqb/RAQB";
import { Button, Container, Row } from "react-bootstrap";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import Xl8 from "../../../components/xl8/Xl8";
import { navigate } from "@reach/router";
import { hasData, asArray, localeDateOnly } from "../../../utils/utils";
import { QR, ACTION, CTX, ROLE } from "../../../utils/constants";
import { LookupContext } from "../../../context/data/LookupContext";
import RoleAuthenticator from "../../../context/roleAuthenticator/RoleAuthenticator";
import {
  hitcats,
  airportLookup,
  countryLookup,
  carrierLookup,
  codeEditor
} from "../../../services/serviceWrapper";

import { numProps, txtProps, dateProps } from "../../../components/raqb/constants";
import "./QueryRules.css";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle
} from "../../../components/modal/Modal";

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
  const [ccTypes, setCcTypes] = useState([]);
  const [dataConfig, setDataConfig] = useState([]);

  const [title, setTitle] = useState(props.title);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState(props.data?.query);
  const [showInvalid, setShowInvalid] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const isEdit = hasData(props.data);
  const { getLookupState, lookupAction } = useContext(LookupContext);

  useEffect(() => {
    if (
      hasData(countries) &&
      hasData(carriers) &&
      hasData(airports) &&
      hasData(ccTypes) &&
      hasData(categories)
    )
      setLoaded(true);
    else setLoaded(false);
  }, [countries, carriers, airports, ccTypes, categories]);

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
  const ccTypeProps = useMemo(() => {
    return {
      type: "select",
      fieldSettings: {
        allowCustomValues: false,
        listValues: ccTypes
      },
      valueSources: ["value"]
    };
  }, [ccTypes]);

  const fieldConfigWithData = {
    fields: {
      Address: {
        label: "Address",
        type: "!group",
        subfields: {
          city: { label: "City", ...txtProps },
          country: { label: "Country", ...countryProps },
          line1: { label: "Line 1", ...txtProps },
          line2: { label: "Line 2", ...txtProps },
          line3: { label: "Line 3", ...txtProps },
          postalCode: { label: "Postal Code", ...txtProps },
          state: { label: "State", ...txtProps }
        }
      },
      Bag: {
        label: "Bag",
        type: "!group",
        subfields: {
          airline: { label: "Airline", ...carrierProps },
          "bagMeasurements.bagCount": { label: "Bag Count", ...numProps },
          bagId: { label: "Bag ID", ...txtProps },
          "bagMeasurements.weight": { label: "Bag Weight (kg)", ...numProps },
          data_source: { label: "Data Source", ...txtProps },
          destinationAirport: { label: "Destination Airport", ...airportProps },
          country: { label: "Destination Country", ...countryProps },
          primeFlight: {
            label: "Is Prime Flight",
            type: "boolean",
            valueSources: ["value"]
          },
          headPool: {
            label: "Is Head Of a Baggage Pool",
            type: "boolean",
            valueSources: ["value"]
          }
        }
      },
      CreditCard: {
        label: "Credit Card",
        type: "!group",
        subfields: {
          accountHolder: { label: "Account Holder", ...txtProps },
          expiration: { label: "Expiration Date", ...dateProps },
          number: { label: "Number", ...txtProps },
          cardType: { label: "Type", ...ccTypeProps }
        }
      },
      Document: {
        label: "Document",
        type: "!group",
        subfields: {
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
        }
      },
      DwellTime: {
        label: "Dwell Time",
        type: "!group",
        subfields: {
          location: { label: "Location", ...txtProps },
          dwellTime: { label: "Lay over Time", ...numProps }
        }
      },
      Email: {
        label: "Email",
        type: "!group",
        subfields: {
          address: { label: "Address", ...txtProps },
          domain: { label: "Domain", ...txtProps }
        }
      },
      Flight: {
        label: "Flight",
        type: "!group",
        subfields: {
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
        }
      },
      BookingDetail: {
        label: "Flight Leg",
        type: "!group",
        subfields: {
          origin: { label: "Origin", ...airportProps },
          destination: { label: "Destination", ...airportProps }
        }
      },
      PaymentForm: {
        label: "Form of Payment",
        type: "!group",
        subfields: {
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
        }
      },
      FrequentFlyer: {
        label: "Frequent Flyer",
        type: "!group",
        subfields: {
          carrier: { label: "Carrier", ...carrierProps },
          number: { label: "Number", ...txtProps }
        }
      },
      Passenger: {
        label: "Passenger",
        type: "!group",
        subfields: {
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
            ...airportProps
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
          }
          // "passengerTripDetails.travelFrequency": {
          //   label: "Travel Frequency",
          //   ...numProps
          // }
        }
      },
      Phone: {
        label: "Phone",
        type: "!group",
        subfields: { number: { label: "Number", ...txtProps } }
      },
      Pnr: {
        label: "PNR",
        type: "!group",
        subfields: {
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
        }
      },
      Seat: {
        label: "Seat",
        type: "!group",
        subfields: {
          number: { label: "Seat Number", ...txtProps },
          cabinClass: { label: "Cabin Class", ...txtProps },
          apis: { label: "Is APIS", type: "boolean", valueSources: ["value"] }
        }
      },
      Agency: {
        label: "Travel Agency",
        type: "!group",
        subfields: {
          country: { label: "Country", ...countryProps },
          identifier: { label: "Identifier", ...txtProps },
          location: { label: "Location", ...txtProps },
          name: { label: "Name", ...txtProps },
          city: { label: "City", ...txtProps },
          phone: { label: "Phone", ...txtProps }
        }
      }
    }
  };

  useEffect(() => {
    if (loaded) {
      setDataConfig(fieldConfigWithData);
      setKey(key + 1);
    }
  }, [loaded]);

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
    let container = document.querySelector('[class="query-builder-container"]');

    if (!!container) container.classList.add("qrm-invalid");
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

  const storeRule = () => {
    const saved = getSaveObject();

    lookupAction({ data: saved, type: "lastRule" });
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

    const q = getSaveObject();

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
    if (!validateAll()) return;

    storeRule();

    navigate("/gtas/tools/qrdetails", {
      state: {
        data: {
          pageNumber: 1,
          pageSize: 10,
          query: query || data
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
    if (key > 0) return;

    setData(props.data?.query);

    const storedCountries = getLookupState(CTX.COUNTRIES);
    const storedCarriers = getLookupState(CTX.CARRIERS);
    const storedAirports = getLookupState(CTX.AIRPORTCODES);
    const storedCategories = getLookupState(CTX.RULECATS);
    const storedCcTypes = getLookupState(CTX.CCTYPES);

    // move to context.
    if (/*hasData(storedCategories)*/ false) {
      //Categories are perhaps small enough in amount that caching them is unnecessary?
      setCategories(storedCategories);
    } else {
      hitcats.get().then(res => {
        const cats = asArray(res).map(catitem => {
          return { label: catitem.label, value: catitem.id };
        });

        if (hasData(cats)) lookupAction({ data: cats, type: CTX.RULECATS });
        setCategories(cats);
      });
    }

    if (hasData(storedCountries)) {
      setCountries(storedCountries);
    } else {
      countryLookup.get().then(res => {
        const ctyitems = asArray(res).map(ctyitem => {
          return { value: ctyitem.iso3, title: ctyitem.name };
        });

        if (hasData(ctyitems)) lookupAction({ data: ctyitems, type: CTX.COUNTRIES });
        setCountries(ctyitems);
      });
    }

    if (hasData(storedCarriers)) {
      setCarriers(storedCarriers);
    } else {
      carrierLookup.get().then(res => {
        let caritems = asArray(res).map(caritem => {
          return { title: `${caritem.name} (${caritem.iata})`, value: caritem.iata };
        });

        const result = caritems.sort(function(a, b) {
          return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
        });

        if (hasData(result)) lookupAction({ data: result, type: CTX.CARRIERS });
        setCarriers(result);
      });
    }

    if (hasData(storedAirports)) {
      setAirports(storedAirports);
    } else {
      airportLookup.get().then(res => {
        let apitems = asArray(res).map(apitem => {
          return { title: apitem.iata, value: apitem.iata };
        });

        const result = apitems.sort(function(a, b) {
          return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
        });

        if (hasData(result)) lookupAction({ data: result, type: CTX.AIRPORTCODES });
        setAirports(result);
      });
    }

    if (hasData(storedCcTypes)) {
      setCcTypes(storedCcTypes);
    } else {
      codeEditor.get.cctypeCodes().then(res => {
        let ccitem = asArray(res).map(ccitem => {
          return { title: `${ccitem.description} (${ccitem.code})`, value: ccitem.code };
        });

        const result = ccitem.sort(function(a, b) {
          return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
        });

        if (hasData(result)) lookupAction({ data: result, type: CTX.CCTYPES });
        setCcTypes(result);
      });
    }
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
        <ModalHeader closeButton>
          <ModalTitle>
            <span>{props.title} </span>
            <label className="big-name-sidebar">{summaryData?.title}</label>
          </ModalTitle>
        </ModalHeader>
        <ModalBody className="qbrb-modal-body">
          <Container fluid>
            <Row className="card-columns qrm">
              <LabelledInput
                datafield
                key={`title${key}`}
                labelText={<Xl8 xid="qrm001">Title</Xl8>}
                inputType="text"
                inputVal={summaryData?.title}
                name="title"
                callback={cb}
                alt="Title"
                spacebetween
              />
              <LabelledInput
                datafield
                labelText={<Xl8 xid="qrm002">Description</Xl8>}
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
                    labelText={<Xl8 xid="qrm003">Start Date</Xl8>}
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
                    labelText={<Xl8 xid="qrm004">End Date</Xl8>}
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
                    labelText={<Xl8 xid="qrm005">Enabled</Xl8>}
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
                    labelText={<Xl8 xid="qrm006">Rule Category</Xl8>}
                    inputType="select"
                    options={categories}
                    inputVal={summaryData?.ruleCat}
                    required={true}
                    name="ruleCat"
                    callback={cb}
                    alt="alt"
                    spacebetween
                    className="rule-cat"
                  />
                </Row>
              </>
            )}
            {loaded && (
              <RAQB
                data={data}
                key={key}
                config={dataConfig}
                dataCallback={dataCallback}
              ></RAQB>
            )}
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            key="close"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={onClose}
          >
            <Xl8 xid="qrm007">Close</Xl8>
          </Button>
          <Button
            type="button"
            key="clear"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={onClear}
          >
            <Xl8 xid="QRM008">Clear</Xl8>
          </Button>
          <Button
            key="save"
            type="button"
            className="m-2 btn"
            variant="primary"
            onClick={onSave}
          >
            <Xl8 xid="qrm009">Save</Xl8>
          </Button>

          <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.QRYMGR]} alt={<></>}>
            <Button
              key="run"
              type="button"
              className="m-2 outline-dark-outline"
              variant="outline-dark"
              onClick={onRun}
            >
              <Xl8 xid="qrm010">Query</Xl8>
            </Button>
          </RoleAuthenticator>
          {isEdit && (
            <Button
              key="delete"
              type="button"
              className="m-2 outline-dark-outline"
              variant="outline-dark"
              onClick={onDelete}
            >
              <Xl8 xid="qrm011">Delete</Xl8>
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default QRModal;

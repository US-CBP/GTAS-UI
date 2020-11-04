import React, { useEffect, useState, useRef } from "react";
import Table from "../../components/table/Table";
import { cases, notetypes, usersemails, ruleCats } from "../../services/serviceWrapper";
import Title from "../../components/title/Title";
import Xl8 from "../../components/xl8/Xl8";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import FilterForm from "../../components/filterForm2/FilterForm";
import { hasData, asArray, getShortText, isShortText, getAge } from "../../utils/utils";
import { Col, Button, DropdownButton } from "react-bootstrap";
import "./Vetting.css";
import SidenavContainer from "../../components/sidenavContainer/SidenavContainer";
import Main from "../../components/main/Main";
import { Link } from "@reach/router";
import FlightInfo from "./flightInfo/FlightInfo";
import Notification from "../paxDetail/notification/Notification";
import DownloadReport from "../paxDetail/downloadReports/DownloadReports";
import CountdownBadge from "../../components/countdownBadge/CountdownBadge";
import Overlay from "../../components/overlay/Overlay";
import ReviewPVL from "./review/Review";

const Vetting = props => {
  const hitTypeOptions = [
    {
      value: "WATCHLIST",
      label: "Watchlist"
    },
    {
      value: "USER_RULE",
      label: "User Created"
    },
    {
      value: "GRAPH_RULE",
      label: "Graph Database"
    },
    {
      value: "MANUAL",
      label: "Manual "
    },
    {
      value: "PARTIAL_WATCHLIST",
      label: "Partial Watchlist"
    }
  ];

  const hitStatusdefaultValues = [
    {
      value: "NEW",
      label: "New"
    },
    {
      value: "REVIEWED",
      label: "Reviewed"
    }
  ];

  const hitStatusOptions = [
    ...hitStatusdefaultValues,
    {
      value: "RE_OPENED",
      label: "Re Opened"
    }
  ];

  const getBiographicData = pax => {
    return (
      <ul className="bio-data">
        <li>
          <Xl8 xid="vet001">Name:</Xl8> {pax.paxName}
        </li>
        <li>
          <Xl8 xid="vet002">DOB:</Xl8> {`${pax.dob} (${getAge(pax.dob)})`}{" "}
        </li>
        <li>
          <Xl8 xid="vet003">Nationality:</Xl8> {pax.nationality}
        </li>
        <li>
          <Xl8 xid="vet004">Document:</Xl8> {`${pax.document} (${pax.docType})`}
        </li>
      </ul>
    );
  };
  const Headers = [
    {
      Accessor: "countdownTime",
      Xl8: true,
      Header: ["wl018", "Timer"],
      Cell: ({ row }) => {
        const future =
          row.original.flightDirection === "O"
            ? row.original.flightETDDate
            : row.original.flightETADate;
        return (
          <CountdownBadge
            future={future}
            baseline={now}
            direction={row.original.flightDirection}
          />
        );
      }
    },
    {
      Accessor: "flightNumber",
      Xl8: true,
      Header: ["wl019", "Flight ID"],
      Cell: ({ row }) => (
        <FlightInfo
          flightNumber={row.original.flightNumber}
          eta={row.original.flightETADate}
          etd={row.original.flightETDDate}
          origin={row.original.flightOrigin}
          destination={row.original.flightDestination}
          direction={row.original.flightDirection}
        />
      )
    },
    {
      Accessor: "hitNames",
      Xl8: true,
      Header: ["wl020", "Hits"],
      Cell: ({ row }) => {
        const listdata = asArray(row.original.hitNames).map((hit, index) => {
          const triggerOverlay = !isShortText(hit, 20);
          return (
            <Overlay
              trigger={triggerOverlay ? ["click", "hover"] : ""}
              key={index}
              content={hit}
            >
              <li className={triggerOverlay ? "as-info" : ""}>{getShortText(hit, 20)}</li>
            </Overlay>
          );
        });
        return <ul>{listdata}</ul>;
      }
    },
    {
      Accessor: "paxName",
      Xl8: true,
      Header: ["wl021", "Biographic Information"],
      Cell: ({ row }) => (
        <Link to={`../paxDetail/${row.original.flightId}/${row.original.paxId}`}>
          {getBiographicData(row.original)}
        </Link>
      )
    },
    {
      Accessor: "status",
      Xl8: true,
      Header: ["wl022", "Status"],
      Cell: ({ row }) => <div className="text-center">{row.original.status}</div>
    },
    {
      Accessor: "paxId",
      Xl8: true,
      Header: ["wl023", "Actions"],
      Cell: ({ row }) => (
        <DropdownButton
          variant="info"
          title={<Xl8 xid="vet020">Choose Action</Xl8>}
          className="m-1"
        >
          <Button className="dropdown-item" onClick={() => reviewPVL(row.original.paxId)}>
            <Xl8 xid="rev018">Review</Xl8>
          </Button>
          <Notification paxId={`${row.original.paxId}`} usersEmails={usersEmails} />
          <DownloadReport paxId={row.original.paxId} flightId={row.original.flightId} />
        </DropdownButton>
      )
    }
  ];

  const onTableChange = () => {};
  const onTextChange = () => {};
  const cb = () => {};

  let startDate = new Date();
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  startDate.setHours(startDate.getHours() - 7);
  const [data, setData] = useState();
  const [hitCategoryOptions, setHitCategoryOptions] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const showDateTimePicker = useRef(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentPaxId, setCurrentPaxId] = useState();
  const [noteTypes, setNoteTypes] = useState([]);
  const [usersEmails, setUsersEmails] = useState({});
  const now = new Date();
  const initialParamState = {
    etaStart: startDate,
    etaEnd: endDate,
    displayStatusCheckBoxes: hitStatusdefaultValues,
    ruleTypes: hitTypeOptions,
    ruleCatFilter: hitCategoryOptions,
    notetypes: []
  };

  const reviewPVL = paxId => {
    setCurrentPaxId(paxId);
    setShowReviewModal(true);
  };

  const toggleDateTimePicker = ev => {
    showDateTimePicker.current = !showDateTimePicker.current;
    setRefreshKey(refreshKey + 1);
  };

  const setDataWrapper = data => {
    setData(data?.cases || []);
  };

  const parameterAdapter = fields => {
    let paramObject = { pageSize: 100, pageNumber: 1 };
    const fieldscopy = Object.assign([], fields);
    delete fieldscopy["showDateTimePicker"];

    if (!showDateTimePicker.current) {
      //passed range values insted of date
      const startRange = fields["startHourRange"] || 96; // default to 96 hours
      const endRange = fields["endHourRange"] || 96;
      let etaEnd = new Date();
      let etaStart = new Date();
      etaEnd.setHours(etaEnd.getHours() + endRange);
      etaStart.setHours(etaEnd.getHours() - startRange);

      paramObject["etaStart"] = etaStart;
      paramObject["etaEnd"] = etaEnd;

      delete fieldscopy["startHourRange"];
      delete fieldscopy["endHourRange"];
    }

    const fieldNames = Object.keys(fieldscopy);
    fieldNames.forEach(name => {
      if (name === "etaStart" || name === "etaEnd") {
        const date = new Date(fields[name]);
        paramObject[name] = date.toISOString();
      }

      if (hasData(fields[name])) {
        if (name === "displayStatusCheckBoxes" || name === "ruleTypes") {
          const selectedBoxes = fields[name];
          const morphedArray = selectedBoxes.map(sb => {
            const name = sb.value;
            const checked = true;
            return { [name]: checked };
          });
          paramObject[name] = Object.assign({}, ...morphedArray);
        } else if (name === "ruleCatFilter") {
          const selectedCheckbox = fields[name];
          const morphedArray = selectedCheckbox.map(cb => {
            let name = cb.label;
            let value = true;
            return { name: name, value: value };
          });
          paramObject[name] = [...morphedArray];
        } else if (name === "noteTypes") {
          const selectedNoteTypes = asArray(fields[name]).map(noteType => {
            return {
              type: noteType.label
            };
          });
          paramObject[name] = selectedNoteTypes;
        } else {
          paramObject[name] = fields[name];
        }
      }
    });

    return "?requestDto=" + encodeURIComponent(JSON.stringify(paramObject));
  };

  const fetchData = () => {
    usersemails.get().then(res => {
      const emails = asArray(res).map(userEmail => {
        return {
          label: userEmail.username,
          key: userEmail.email,
          name: userEmail.email,
          type: "checkbox",
          checked: false
        };
      });
      setUsersEmails(emails);
    });

    ruleCats.get().then(res => {
      const options = asArray(res).map(hitCat => {
        return {
          label: hitCat.name,
          value: hitCat.name
        };
      });
      setHitCategoryOptions(options);
    });

    notetypes.get().then(types => {
      const nTypes = asArray(types).reduce((acc, type) => {
        if (type.noteType !== "DELETED") {
          acc.push({
            value: type.id,
            label: type.noteType
          });
        }
        return acc;
      }, []);
      setNoteTypes(nTypes);
      setRefreshKey(nTypes);
    });
  };

  useEffect(() => {
    fetchData();
    setRefreshKey(refreshKey + 1);
  }, []);

  return (
    <>
      <SidenavContainer>
        <Col className="notopmargin">
          <FilterForm
            service={cases.get}
            callback={setDataWrapper}
            paramCallback={parameterAdapter}
            key={refreshKey}
            initialParamState={initialParamState}
          >
            <LabelledInput
              datafield="myRulesOnly"
              name="myRulesOnly"
              labelText={<Xl8 xid="vet007">My Rules Only</Xl8>}
              inputType="checkbox"
              inputVal={false}
              callback={cb}
              selected={false}
              alt="My Rules Only"
              spacebetween
            />
            <LabelledInput
              name="displayStatusCheckBoxes"
              datafield="displayStatusCheckBoxes"
              labelText={<Xl8 xid="vet008">Passenger Hit Status</Xl8>}
              inputType="multiSelect"
              inputVal={hitStatusdefaultValues}
              options={hitStatusOptions}
              callback={cb}
              alt={<Xl8 xid="3">Passenger Hit Status</Xl8>}
            />
            <LabelledInput
              name="ruleTypes"
              datafield="ruleTypes"
              labelText={<Xl8 xid="vet009">Hit Types</Xl8>}
              inputType="multiSelect"
              inputVal={hitTypeOptions}
              options={hitTypeOptions}
              callback={cb}
              alt={<Xl8 xid="3">Hit Types</Xl8>}
            />
            <LabelledInput
              datafield
              name="noteTypes"
              labelText={<Xl8 xid="vet019">Note Type</Xl8>}
              inputType="multiSelect"
              inputVal={[]}
              options={noteTypes}
              callback={cb}
              alt={<Xl8 xid="vet019">Note Type</Xl8>}
            />
            {hasData(hitCategoryOptions) && (
              <LabelledInput
                name="ruleCatFilter"
                datafield="ruleCatFilter"
                labelText={<Xl8 xid="vet010">Passenger Hit Categories</Xl8>}
                inputType="multiSelect"
                inputVal={hitCategoryOptions}
                options={hitCategoryOptions}
                callback={cb}
                alt={<Xl8 xid="3">Passenger Hit Categories</Xl8>}
              />
            )}
            <LabelledInput
              datafield="lastName"
              labelText={<Xl8 xid="vet011">Last Name</Xl8>}
              inputType="text"
              name="lastName"
              callback={onTextChange}
              alt={<Xl8 xid="3">Last Name</Xl8>}
            />
            <LabelledInput
              datafield="flightNumber"
              labelText={<Xl8 xid="vet012">Flight Number</Xl8>}
              inputType="text"
              name="flightNumber"
              callback={onTextChange}
              alt={<Xl8 xid="3">Flight Number</Xl8>}
            />
            <hr />
            <LabelledInput
              datafield="showDateTimePicker"
              name="showDateTimePicker"
              labelText={<Xl8 xid="vet013">Show Date Time Picker</Xl8>}
              inputType="checkbox"
              inputVal={showDateTimePicker.current}
              callback={cb}
              toggleDateTimePicker={toggleDateTimePicker}
              selected={showDateTimePicker.current}
              alt=""
              spacebetween
            />
            {showDateTimePicker.current && (
              <LabelledInput
                datafield="etaStart"
                inputType="dateTime"
                inputVal={startDate}
                labelText={<Xl8 xid="vet014">Start Date</Xl8>}
                name="etaStart"
                callback={cb}
                className="dtp-vetting-upper"
                required={true}
                alt="Start Date"
              />
            )}
            {showDateTimePicker.current && (
              <LabelledInput
                datafield="etaEnd"
                inputType="dateTime"
                inputVal={endDate}
                labelText={<Xl8 xid="vet015">End Date</Xl8>}
                name="etaEnd"
                callback={cb}
                required={true}
                className="dtp-vetting-lower"
                alt="End Date"
              />
            )}
            {!showDateTimePicker.current && (
              <LabelledInput
                labelText={<Xl8 xid="vet016">Hour Range (Start)</Xl8>}
                inputType="select"
                name="startHourRange"
                inputVal="96"
                inputStyle="form-select"
                datafield="startHourRange"
                options={[
                  { value: "6", label: "-6 hours" },
                  { value: "12", label: "-12 hours" },
                  { value: "24", label: "-24 hours" },
                  { value: "48", label: "-48 hours" },
                  { value: "96", label: "-96 hours" }
                ]}
                callback={cb}
                alt="Hour range (Start)"
              />
            )}
            {!showDateTimePicker.current && (
              <LabelledInput
                labelText={<Xl8 xid="vet017">Hour Range (End)</Xl8>}
                inputType="select"
                name="endHourRange"
                inputVal="96"
                inputStyle="form-select"
                datafield="endHourRange"
                options={[
                  { value: "6", label: "+6 hours" },
                  { value: "12", label: "+12 hours" },
                  { value: "24", label: "+24 hours" },
                  { value: "48", label: "+48 hours" },
                  { value: "96", label: "+96 hours" }
                ]}
                callback={cb}
                alt="Hour range (End)"
              />
            )}
          </FilterForm>
        </Col>
      </SidenavContainer>
      <Main>
        <Title title={<Xl8 xid="vet018">Priority Vetting</Xl8>} uri={props.uri} />
        <Table data={data} callback={onTableChange} header={Headers} key={data} />

        <ReviewPVL
          paxId={currentPaxId}
          callback={setRefreshKey}
          show={showReviewModal}
          onHide={() => setShowReviewModal(false)}
          noteTypes={noteTypes}
        />
      </Main>
    </>
  );
};

export default Vetting;

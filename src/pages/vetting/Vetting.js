// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState, useContext } from "react";
import Table from "../../components/table/Table";
import Title from "../../components/title/Title";
import Xl8 from "../../components/xl8/Xl8";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import FilterForm from "../../components/filterForm2/FilterForm";
import SidenavContainer from "../../components/sidenavContainer/SidenavContainer";
import Main from "../../components/main/Main";
import FlightBadge from "../../components/flightBadge/FlightBadge";
import Notification from "../paxDetail/notification/Notification";
import DownloadReport from "../paxDetail/downloadReports/DownloadReports";
import CountdownBadge from "../../components/countdownBadge/CountdownBadge";
import CarrierBadge from "../../components/carrierBadge/CarrierBadge";
import ToolTipWrapper from "../../components/tooltipWrapper/TooltipWrapper";
import Overlay from "../../components/overlay/Overlay";
import Confirm from "../../components/confirmationModal/Confirm";
import EventNotesModal from "../../components/eventNotesModal/EventNotesModal";
import BiographicInfo from "./biographicInfo/BiographicInfo";
import RoleAuthenticator from "../../context/roleAuthenticator/RoleAuthenticator";
import {
  hasData,
  asArray,
  getShortText,
  isShortText,
  lpad5,
  addMinutes,
  localeDate,
  stringComparator,
  alt
} from "../../utils/utils";
import { cases, poe, usersemails } from "../../services/serviceWrapper";
import { LookupContext } from "../../context/data/LookupContext";
import {
  ROLE,
  HIT_STATUS,
  LK,
  EXPORTFILENAME,
  LOOKOUTSTATUS
} from "../../utils/constants";
import { Col, Button, DropdownButton } from "react-bootstrap";
import "./Vetting.css";
import { hiddenHeaders, hitStatusOptions, hitTypeOptions } from "./vetting-utils";

const Vetting = props => {
  const { getCachedCoreFields } = useContext(LookupContext);
  const [estimatedTimeHeader, setEstimatedTimeHeader] = useState();
  const hiddenColumns = hiddenHeaders.map(column => column.Accessor);

  const Headers = [
    ...hiddenHeaders,
    {
      Accessor: "paxId",
      Xl8: true,
      disableFilters: true,
      disableSortBy: true,
      Header: ["vet023", "Actions"],
      Cell: ({ row }) => (
        <DropdownButton
          variant="outline-info"
          title={<Xl8 xid="vet020">Choose Action</Xl8>}
          className="m-1 text-center"
        >
          <EventNotesModal paxId={row.original.paxId} callback={cb}></EventNotesModal>
          <DownloadReport paxId={row.original.paxId} flightId={row.original.flightId}>
            <div className="dropdown-item">
              <Xl8 xid="rep001">Download Report</Xl8>
            </div>
          </DownloadReport>
          <Notification
            paxId={`${row.original.paxId}`}
            usersEmails={usersEmails}
          ></Notification>

          <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.HITMGR]} alt={<></>}>
            <Confirm
              header={<Xl8 xid="vet021">Update Hit Status</Xl8>}
              message={
                <span>
                  <Xl8 xid="vet024">Please click confirm to change the status to:</Xl8>
                  <br />
                  <br />
                  {row.original.status === HIT_STATUS.REVIEWED ? (
                    <Xl8 xid="vet025">Reopened</Xl8>
                  ) : (
                    <Xl8 xid="vet026">Reviewed</Xl8>
                  )}
                </span>
              }
            >
              {confirm => (
                <Button
                  className="dropdown-item"
                  onClick={confirm(() =>
                    changeStatus(row.original.paxId, row.original.status)
                  )}
                >
                  {row.original.status === HIT_STATUS.REVIEWED ? (
                    <Xl8 xid="vet027">Reopen</Xl8>
                  ) : (
                    <Xl8 xid="vet028">Reviewed</Xl8>
                  )}
                </Button>
              )}
            </Confirm>
            {row.original.lookoutStatus !== LOOKOUTSTATUS.NOTPROMOTED &&
            row.original.lookoutStatus !== LOOKOUTSTATUS.DEMOTED ? (
              <></> //There doesn't need to be an indicator for an Already Promoted item, as it's self evident from the table.
            ) : (
              <Confirm
                header={<Xl8 xid="vet029">Promote To Lookout</Xl8>}
                message={
                  <span>
                    <Xl8 xid="vet030">
                      Please click confirm to promote this passenger to Lookout:
                    </Xl8>
                    <br />
                    <br />
                    {row.original.lookoutStatus !== LOOKOUTSTATUS.NOTPROMOTED &&
                    row.original.lookoutStatus !== LOOKOUTSTATUS.DEMOTED ? (
                      <Xl8 xid="vet031">Already Promoted</Xl8>
                    ) : (
                      <Xl8 xid="vet032">Promote To Lookout</Xl8>
                    )}
                  </span>
                }
              >
                {confirm => (
                  <Button
                    className="dropdown-item"
                    onClick={confirm(() =>
                      promoteToLookout(row.original.paxId, LOOKOUTSTATUS.ACTIVE)
                    )}
                  >
                    {row.original.lookoutStatus !== LOOKOUTSTATUS.NOTPROMOTED &&
                    row.original.lookoutStatus !== LOOKOUTSTATUS.DEMOTED ? (
                      <Xl8 xid="vet033">Already Promoted</Xl8>
                    ) : (
                      <Xl8 xid="vet034">Promote To Lookout</Xl8>
                    )}
                  </Button>
                )}
              </Confirm>
            )}
          </RoleAuthenticator>
        </DropdownButton>
      )
    },
    {
      Accessor: estimatedTimeHeader,
      Xl8: true,
      Header: ["wl018", "Timer"],
      Cell: ({ row }) => {
        return (
          <CountdownBadge
            future={row.original.timer}
            baseline={now}
            direction={row.original.flightDirection}
          />
        );
      }
    },
    {
      Accessor: "carrier",
      Xl8: true,
      Header: ["wl029", "Flight"],
      Cell: ({ row }) => (
        <div className="carrier-badge-container">
          <div className="margin-right-sm">
            <CarrierBadge src={row.original.flightNumber}></CarrierBadge>
          </div>
          <ToolTipWrapper
            data={{
              val: (
                <span className="carrier-badge-flight">{row.original.flightNumber}</span>
              ),
              lkup: LK.CARRIER
            }}
          ></ToolTipWrapper>
        </div>
      )
    },
    {
      Accessor: "flightNumber",
      Xl8: true,
      disableFilters: true,
      disableSortBy: true,
      Header: ["wl019", "Flight Info"],
      Cell: ({ row }) => (
        <div className="vetting">
          <FlightBadge
            data={{
              flightOrigin: row.original.flightOrigin,
              flightDestination: row.original.flightDestination,
              eta: row.original.flightETADate,
              etd: row.original.flightETDDate
            }}
            className="sm"
          ></FlightBadge>
        </div>
      )
    },
    {
      Accessor: "hitCounts",
      Xl8: true,
      Header: ["wl020", "Hits"],
      disableExport: true,
      Cell: ({ row }) => {
        const listdata = asArray(row.original.hitNames).map((hit, index) => {
          const triggerOverlay = !isShortText(hit, 45);
          return (
            <Overlay
              trigger={triggerOverlay ? ["click", "hover"] : ""}
              key={index}
              content={hit}
            >
              <li className={triggerOverlay ? "as-info" : ""}>{getShortText(hit, 45)}</li>
            </Overlay>
          );
        });
        return <ul className="hits-data">{listdata}</ul>;
      }
    },
    {
      Accessor: "fullName",
      Xl8: true,
      Header: ["wl021", "Biographic Information"],
      sortType: (row1, row2) =>
        stringComparator(row1.original.lastName, row2.original.lastName),
      Cell: ({ row }) => <BiographicInfo data={row.original} />
    },
    {
      Accessor: "status",
      Xl8: true,
      Header: ["vet022", "Status"],
      Cell: ({ row }) => <div>{row.original.status}</div>
    },
    {
      Accessor: "lookoutStatus",
      Xl8: true,
      Header: ["vet035", "Lookout Status"],
      Cell: ({ row }) => <div>{row.original.lookoutStatus}</div>
    }
  ];

  const onTableChange = () => {};
  const cb = () => {};

  const initTableState = {
    pageIndex: 0,
    pageSize: 50,
    sortBy: [{ id: "hitCounts", desc: true }]
  };

  let startDate = new Date();
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 4);
  startDate.setHours(startDate.getHours() - 6);
  const [data, setData] = useState();
  const [hitCategoryOptions, setHitCategoryOptions] = useState([]);
  const [filterFormKey, setFilterFormKey] = useState(0);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [noteTypes, setNoteTypes] = useState([]);
  const [usersEmails, setUsersEmails] = useState({});
  const [tableKey, setTableKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tableState] = useState(initTableState);

  const now = new Date();
  const initialParamState = {
    etaStart: startDate,
    etaEnd: addMinutes(endDate, 1),
    displayStatusCheckBoxes: hitStatusOptions,
    ruleTypes: hitTypeOptions,
    ruleCatFilter: hitCategoryOptions,
    notetypes: []
  };

  const getInitialState = () => {
    setShowDateTimePicker(false);
    setFilterFormKey(filterFormKey + 1);
    return initialParamState;
  };

  const getTableState = () => tableState;

  const changeStatus = (paxId, status) => {
    const newStatus =
      status === HIT_STATUS.REVIEWED ? HIT_STATUS.REOPENED : HIT_STATUS.REVIEWED;
    cases.updateStatus(paxId, newStatus.toUpperCase()).then(res => {
      setFilterFormKey(filterFormKey + 1);
    });
  };

  const promoteToLookout = (paxId, status) => {
    const req = {
      paxId: paxId,
      poeStatus: status
    };
    poe.put.updatePOEStatus(req).then(resp => {
      setFilterFormKey(filterFormKey + 1); //trigger update
    });
  };

  const toggleDateTimePicker = () => {
    setShowDateTimePicker(value => !value);
    setFilterFormKey(filterFormKey + 1);
  };

  const setDataWrapper = rawdata => {
    const parseddata = asArray(rawdata.cases).map(item => {
      setEstimatedTimeHeader(item.flightDirection === "O" ? "departure" : "arrival");
      const newitem = item;
      newitem.id = item.id || `${item.flightId}${item.paxId}`;
      newitem.carrier = item.flightNumber.slice(0, 2);
      newitem.hitCounts = `${lpad5(item.highPrioHitCount)}:${lpad5(
        item.medPrioHitCount
      )}:${lpad5(item.lowPrioHitCount)}`;
      newitem.timer =
        item.flightDirection === "O" ? item.flightETDDate : item.flightETADate;
      newitem.arrival = localeDate(item.flightETADate);
      newitem.departure = localeDate(item.flightETDDate);
      newitem.fullName = `${alt(item.firstName)} ${alt(item.middleName)}, ${alt(
        item.lastName
      )}`;
      return newitem;
    });

    setData(parseddata || []);
    setTableKey(tableKey + 1);
    setIsLoading(false);
  };

  const parameterAdapter = fields => {
    setIsLoading(true);
    let sortBy = [
      {
        column: "highPriorityRuleCatId",
        dir: "asc"
      }
    ];
    let paramObject = { pageSize: 500, pageNumber: 1, sort: sortBy };
    const fieldscopy = Object.assign([], fields);
    delete fieldscopy["showDateTimePicker"];

    if (!showDateTimePicker) {
      //passed range values insted of date
      const startRange = fields["startHourRange"] || 6; // default to -6 hours
      const endRange = fields["endHourRange"] || 96;
      let etaEnd = new Date();
      let etaStart = new Date();

      etaEnd.setHours(etaEnd.getHours() + +endRange);
      etaStart.setHours(etaStart.getHours() - +startRange);

      paramObject["etaStart"] = etaStart;
      paramObject["etaEnd"] = addMinutes(etaEnd, 1);

      delete fieldscopy["startHourRange"];
      delete fieldscopy["endHourRange"];
    }

    const fieldNames = Object.keys(fieldscopy);
    fieldNames.forEach(name => {
      if (name === "etaStart") {
        const date = new Date(fields[name]);
        paramObject[name] = date.toISOString();
      }

      if (name === "etaEnd") {
        const date = addMinutes(new Date(fields[name]), 1);
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
      setUsersEmails(res);
    });

    getCachedCoreFields(LK.HITCAT).then(res => {
      const options = asArray(res).map(hitCat => {
        return {
          label: hitCat.label,
          value: hitCat.label
        };
      });
      setHitCategoryOptions(options);
    });

    getCachedCoreFields(LK.NOTETYPE).then(types => {
      const nTypes = asArray(types).reduce((acc, type) => {
        if (type.noteType !== "DELETED") {
          acc.push({
            value: type.value,
            label: type.label
          });
        }
        return acc;
      }, []);
      setNoteTypes(nTypes);
    });
  };

  useEffect(() => {
    if (hasData(noteTypes) && hasData(hitCategoryOptions)) {
      //When both are fully loaded, impossible to know which one will finish first, check both
      setFilterFormKey(filterFormKey + 1);
    }
  }, [noteTypes, hitCategoryOptions]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SidenavContainer>
        <Col className="notopmargin">
          <FilterForm
            service={cases.get}
            callback={setDataWrapper}
            paramCallback={parameterAdapter}
            key={filterFormKey}
            getInitialState={getInitialState}
          >
            <LabelledInput
              datafield="myRulesOnly"
              name="myRulesOnly"
              labelText={<Xl8 xid="vet007">My Rules Only</Xl8>}
              inputtype="checkbox"
              inputval={false}
              callback={cb}
              selected={false}
              alt="My Rules Only"
              spacebetween
            />
            <LabelledInput
              name="displayStatusCheckBoxes"
              datafield="displayStatusCheckBoxes"
              labelText={<Xl8 xid="vet008">Passenger Hit Status</Xl8>}
              inputtype="multiSelect"
              inputval={hitStatusOptions}
              options={hitStatusOptions}
              callback={cb}
              alt={<Xl8 xid="3">Passenger Hit Status</Xl8>}
            />
            <LabelledInput
              name="ruleTypes"
              datafield="ruleTypes"
              labelText={<Xl8 xid="vet009">Hit Source</Xl8>}
              inputtype="multiSelect"
              inputval={hitTypeOptions}
              options={hitTypeOptions}
              callback={cb}
              alt="Hit Source"
            />
            <LabelledInput
              datafield
              name="noteTypes"
              labelText={<Xl8 xid="vet019">Note Type</Xl8>}
              inputtype="multiSelect"
              key={noteTypes}
              options={noteTypes}
              callback={cb}
              alt={<Xl8 xid="vet019">Note Type</Xl8>}
            />

            <LabelledInput
              name="ruleCatFilter"
              datafield="ruleCatFilter"
              labelText={<Xl8 xid="vet010">Passenger Hit Categories</Xl8>}
              inputtype="multiSelect"
              inputval={hitCategoryOptions}
              key={hitCategoryOptions}
              options={hitCategoryOptions}
              callback={cb}
              alt={<Xl8 xid="3">Passenger Hit Categories</Xl8>}
            />
            <LabelledInput
              datafield="lastName"
              labelText={<Xl8 xid="vet011">Last Name</Xl8>}
              inputtype="text"
              name="lastName"
              callback={cb}
              alt={<Xl8 xid="3">Last Name</Xl8>}
            />
            <LabelledInput
              datafield="flightNumber"
              labelText={<Xl8 xid="vet012">Flight</Xl8>}
              inputtype="text"
              name="flightNumber"
              callback={cb}
              alt={<Xl8 xid="3">Flight</Xl8>}
            />
            <hr />
            <LabelledInput
              datafield="showDateTimePicker"
              name="showDateTimePicker"
              labelText={<Xl8 xid="vet013">Show Date Time Picker</Xl8>}
              inputtype="checkbox"
              inputval={showDateTimePicker}
              callback={cb}
              toggleDateTimePicker={toggleDateTimePicker}
              selected={showDateTimePicker}
              alt="Show Date Time Picker"
              spacebetween
            />
            {showDateTimePicker && (
              <>
                <LabelledInput
                  datafield="etaStart"
                  inputtype="dateTime"
                  inputval={startDate}
                  labelText={<Xl8 xid="vet014">Start Date</Xl8>}
                  name="etaStart"
                  callback={cb}
                  className="dtp-vetting-upper"
                  required={true}
                  alt="Start Date"
                />
                <LabelledInput
                  datafield="etaEnd"
                  inputtype="dateTime"
                  inputval={endDate}
                  labelText={<Xl8 xid="vet015">End Date</Xl8>}
                  name="etaEnd"
                  callback={cb}
                  required={true}
                  className="dtp-vetting-lower"
                  alt="End Date"
                />
              </>
            )}
            {!showDateTimePicker && (
              <>
                <LabelledInput
                  labelText={<Xl8 xid="vet016">Hour Range (Start)</Xl8>}
                  inputtype="select"
                  name="startHourRange"
                  inputval="6"
                  inputStyle="form-select"
                  datafield="startHourRange"
                  options={[
                    { value: "0", label: "0 hour" },
                    { value: "6", label: "-6 hours" },
                    { value: "12", label: "-12 hours" },
                    { value: "24", label: "-24 hours" },
                    { value: "48", label: "-48 hours" },
                    { value: "96", label: "-96 hours" }
                  ]}
                  callback={cb}
                  alt="Hour range (Start)"
                />
                <LabelledInput
                  labelText={<Xl8 xid="vet017">Hour Range (End)</Xl8>}
                  inputtype="select"
                  name="endHourRange"
                  inputval="96"
                  inputStyle="form-select"
                  datafield="endHourRange"
                  options={[
                    { value: "0", label: "0 hour" },
                    { value: "6", label: "+6 hours" },
                    { value: "12", label: "+12 hours" },
                    { value: "24", label: "+24 hours" },
                    { value: "48", label: "+48 hours" },
                    { value: "96", label: "+96 hours" }
                  ]}
                  callback={cb}
                  alt="Hour range (End)"
                />
              </>
            )}
          </FilterForm>
        </Col>
      </SidenavContainer>
      <Main>
        <Title title={<Xl8 xid="vet018">Priority Vetting</Xl8>} uri={props.uri} />
        <Table
          data={data}
          callback={onTableChange}
          header={Headers}
          key={tableKey}
          isLoading={isLoading}
          stateVals={getTableState}
          exportFileName={EXPORTFILENAME.VETTITNG}
          hiddenColumns={hiddenColumns}
        />
      </Main>
    </>
  );
};

export default Vetting;

import React, { useEffect, useState, useRef } from "react";
import Table from "../../components/table/Table";
import { cases } from "../../services/serviceWrapper";
import Title from "../../components/title/Title";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import FilterForm from "../../components/filterForm/FilterForm";
import { hasData, asArray, getShortText, isShortText } from "../../utils/utils";
import { Col } from "react-bootstrap";
import LabelledDateTimePickerStartEnd from "../../components/inputs/LabelledDateTimePickerStartEnd/LabelledDateTimePickerStartEnd";
import "./Vetting.css";
import { useFetchHitCategories } from "../../services/dataInterface/HitCategoryService";
import SideNav from "../../components/sidenav/SideNav";
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

  const hitStatusOptions = [
    {
      value: "NEW",
      label: "New"
    },
    {
      value: "REVIEWED",
      label: "Reviewed"
    },
    {
      value: "RE_OPENED",
      label: "Re Opened"
    }
  ];
  const Headers = [
    {
      Accessor: "countdownTime",
      Header: "Timer",
      Cell: ({ row }) => {
        const future =
          row.original.countdownTime === "O"
            ? row.original.flightETDDate
            : row.original.flightETADate;
        return <CountdownBadge future={future} baseline={now} />;
      }
    },
    {
      Accessor: "flightNumber",
      Header: "Flight Id",
      Cell: ({ row }) => (
        <FlightInfo
          flightNumber={row.original.flightNumber}
          eta={row.original.flightETADate}
          etd={row.original.flightETDDate}
          origin={row.original.flightOrigin}
          destination={row.original.flightDestination}
        />
      )
    },
    {
      Accessor: "hitNames",
      Header: "Hits",
      Cell: ({ row }) => {
        const listdata = asArray(row.original.hitNames).map((hit, index) => {
          const triggerOverlay = !isShortText(hit, 20);
          return (
            <Overlay
              trigger={triggerOverlay ? ["click", "hover"] : ""}
              key={index}
              content={hit}
            >
              <li className={triggerOverlay ? "as-link" : ""}>{getShortText(hit, 20)}</li>
            </Overlay>
          );
        });
        return <ul>{listdata}</ul>;
      }
    },
    {
      Accessor: "paxName",
      Header: "Biographic Information",
      Cell: ({ row }) => (
        <Link to={`../paxDetail/${row.original.flightId}/${row.original.paxId}`}>
          {row.original.paxName}
        </Link>
      )
    },
    {
      Accessor: "status",
      Header: "Status"
    },
    {
      Accessor: "paxId",
      Header: "Actions",
      Cell: ({ row }) => (
        <>
          <ReviewPVL paxId={row.original.paxId} callback={setRefreshKey} />
          <Notification paxId={`${row.original.paxId}`} />
          <DownloadReport paxId={row.original.paxId} flightId={row.original.flightId} />
        </>
      )
    }
  ];

  const onTableChange = () => {};
  const onTextChange = () => {};
  const cb = () => {};

  let sDate = new Date();
  let eDate = new Date();
  eDate.setDate(eDate.getDate() + 7);
  sDate.setHours(sDate.getHours() - 7);
  const [startDate, setStartData] = useState(sDate);
  const [endDate, setEndData] = useState(eDate);
  const [data, setData] = useState([{}]);
  const { hitCategories, loading } = useFetchHitCategories();
  const [hitCategoryOptions, setHitCategoryOptions] = useState();
  const [refreshKey, setRefreshKey] = useState("");
  const showDateTimePicker = useRef(false);
  const now = new Date();

  const toggleDateTimePicker = ev => {
    showDateTimePicker.current = !showDateTimePicker.current;
    setRefreshKey(ev);
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
        } else {
          paramObject[name] = fields[name];
        }
      }
    });
    return "?requestDto=" + encodeURIComponent(JSON.stringify(paramObject));
  };

  useEffect(() => {
    if (hitCategories !== undefined) {
      const options = asArray(hitCategories).map(hitCat => {
        return {
          label: hitCat.name,
          value: hitCat.name
        };
      });
      setHitCategoryOptions(options);
    }
  }, [hitCategories, loading]);

  const dateRange = (
    <>
      <LabelledInput
        labelText="Hour Range (Start)"
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
      <LabelledInput
        labelText="Hour Range (End)"
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
    </>
  );
  const dateTimePicker = (
    <LabelledDateTimePickerStartEnd
      datafield={["etaStart", "etaEnd"]}
      name={["etaStart", "etaEnd"]}
      alt="Start/End Datepicker"
      inputType="dateTime"
      dateFormat="yyyy-MM-dd h:mm aa"
      callback={cb}
      showTimeSelect
      showYearDropdown
      inputVal={{ etaStart: startDate, etaEnd: endDate }}
      startDate={startDate}
      endDate={endDate}
      endMut={setEndData}
      startMut={setStartData}
    />
  );
  let renderedFilter;
  if (loading) {
    renderedFilter = <div>Loading Filter!</div>;
  } else {
    renderedFilter = (
      <>
        <SideNav>
          <Col>
            <FilterForm
              service={cases.get}
              title="Filter"
              callback={setDataWrapper}
              paramAdapter={parameterAdapter}
              key={refreshKey}
            >
              <hr className="horizontal-line" />
              <LabelledInput
                datafield="myRulesOnly"
                name="myRulesOnly"
                labelText="My Rules Only"
                inputType="checkbox"
                inputVal={false}
                callback={cb}
                selected={false}
                alt="nothing"
                spacebetween
              />
              <hr />
              <LabelledInput
                name="displayStatusCheckBoxes"
                datafield="displayStatusCheckBoxes"
                labelText="Passenger Hit Status"
                inputType="multiSelect"
                inputVal={[
                  {
                    value: "NEW",
                    label: "New"
                  },
                  {
                    value: "RE_OPENED",
                    label: "Re Opened"
                  }
                ]}
                options={hitStatusOptions}
                callback={cb}
                alt="nothing"
              />
              <LabelledInput
                name="ruleTypes"
                datafield="ruleTypes"
                labelText="Hit Types"
                inputType="multiSelect"
                inputVal={hitTypeOptions}
                options={hitTypeOptions}
                callback={cb}
                alt="nothing"
              />
              <LabelledInput
                name="ruleCatFilter"
                datafield="ruleCatFilter"
                labelText="Passenger Hit Categories"
                inputType="multiSelect"
                inputVal={hitCategoryOptions}
                options={hitCategoryOptions}
                callback={cb}
                alt="nothing"
              />
              <LabelledInput
                datafield="lastName"
                labelText="Passenger Last Name"
                inputType="text"
                name="lastName"
                callback={onTextChange}
                alt="nothing"
              />
              <LabelledInput
                datafield="flightNumber"
                labelText="Flight Number"
                inputType="text"
                name="flightNumber"
                callback={onTextChange}
                alt="nothing"
              />
              <hr />
              <LabelledInput
                datafield="showDateTimePicker"
                name="showDateTimePicker"
                labelText="Show Date Time Picker"
                inputType="checkbox"
                inputVal={showDateTimePicker.current}
                callback={cb}
                toggleDateTimePicker={toggleDateTimePicker}
                selected={showDateTimePicker.current}
                alt="nothing"
                spacebetween
              />
              {showDateTimePicker.current ? dateTimePicker : dateRange}
            </FilterForm>
          </Col>
        </SideNav>
        <Main>
          <Col>
            <Title title="Priority Vetting" uri={props.uri} />
            <Table
              data={data}
              id="FlightDataTable"
              callback={onTableChange}
              header={Headers}
              ignoredFields={[
                "countDown",
                "priorityVettingListRuleTypes",
                "ruleCatFilter"
              ]}
              key={data}
            />
          </Col>
        </Main>
      </>
    );
  }
  return renderedFilter;
};

export default Vetting;

// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, {useState, useContext, useEffect} from "react";
import Kanban from "../../components/kanban/Kanban";
import Title from "../../components/title/Title";
import Main from "../../components/main/Main";
import Xl8 from "../../components/xl8/Xl8";
import {Col} from "react-bootstrap";
import FilterForm from "../../components/filterForm2/FilterForm";
import {poe} from "../../services/serviceWrapper";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import SidenavContainer from "../../components/sidenavContainer/SidenavContainer";
import {addMinutes, asArray, hasData} from "../../utils/utils";
import { LookupContext } from "../../context/data/LookupContext";
import { LK } from "../../utils/constants";

const POE = props => {
  let startDate = new Date();
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 4);
  startDate.setHours(startDate.getHours() - 6);
  const [poeTiles, setPoeTiles] = useState([]);
  const [poeLanes, setPoeLanes] = useState([]);
  const [airports, setAirports] = useState([]);

  const { lookupAction, getFullCachedCoreFields } = useContext(LookupContext);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [filterFormKey, setFilterFormKey] = useState(0);
  const [poeKey, setPoeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const cb = () => {};

  const initialParamState = {
    etaStart: startDate,
    etaEnd: addMinutes(endDate, 1),
    airports: airports
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (hasData(airports)) {
      setFilterFormKey(filterFormKey + 1);
    }
  }, [airports]);

  const fetchData = () => {
    getFullCachedCoreFields(LK.AIRPORT).then(res => {
      let airportsWithABlankOption = [];
      airportsWithABlankOption.push(
         {
          label:"", 
          value:""
          }
        );
      const mappedAirports = asArray(res).map(airport => {
        return {
          label: airport.title,
          value: airport.value
        };
      });
      airportsWithABlankOption.push(...mappedAirports);
      setAirports(airportsWithABlankOption);
    })};


  const getInitialState = () => {
    setShowDateTimePicker(false);
    setIsLoading(true);
    setFilterFormKey(filterFormKey + 1);
    return initialParamState;
  };

  const parameterAdapter = fields => {
    let paramObject = {};
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
        paramObject[name] = fields[name];
      }
    });

    return "?requestDto=" + encodeURIComponent(JSON.stringify(paramObject));
  };

  const setDataWrapper = tileRes => {
    setIsLoading(true);

    poe.get.getAllLanes().then(laneRes => {
      setPoeLanes(laneRes);
      setPoeTiles(tileRes);
      setIsLoading(false);
      setPoeKey(poeKey+1);
    });
  };


  return (
      <>
  <SidenavContainer>
    <Col className="notopmargin">
      <FilterForm
          service={poe.get.getAllTiles}
          callback={setDataWrapper}
          paramCallback={parameterAdapter}
          key={filterFormKey}
          getInitialState={getInitialState}
      >
        <LabelledInput
            labelText={<Xl8 xid="poe0005">Hour Range (Start)</Xl8>}
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
            labelText={<Xl8 xid="poe0006">Hour Range (End)</Xl8>}
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
        <LabelledInput
              name="poeAirport"
              datafield="poeAirport"
              labelText={<Xl8 xid="poe0008">POE Airports</Xl8>}
              inputtype="select"
              inputval=""
              options={airports}
              callback={cb}
              alt="Poe Airport"
            />
      </FilterForm>
    </Col>
  </SidenavContainer>
  <Main>
    <Title title={<Xl8 xid="poe0007">Port Of Entry Lookout</Xl8>} uri={props.uri} />
    <Kanban
        lanes={poeLanes}
        tiles={poeTiles}
        key={poeKey}
        isLoading={isLoading}
    >
    </Kanban>
  </Main>
  </>
  )
};

export default POE;

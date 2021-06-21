// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CountdownBadge from "../../components/countdownBadge/CountdownBadge";
import { CardDeck, Col } from "react-bootstrap";
import { addMinutes, asArray, hasData, randomIntOfLength } from "../../utils/utils";
import Xl8 from "../../components/xl8/Xl8";

import "./Kanban.css";
import { poe } from "../../services/serviceWrapper";
import SidenavContainer from "../sidenavContainer/SidenavContainer";
import FilterForm from "../filterForm2/FilterForm";
import LabelledInput from "../labelledInput/LabelledInput";
import Main from "../../components/main/Main";
import Title from "../title/Title";
import Loading from "../../components/loading/Loading";
import { LK } from "../../utils/constants";
import ToolTipWrapper from "../tooltipWrapper/TooltipWrapper";

const Kanban = props => {
  let startDate = new Date();
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 4);
  startDate.setHours(startDate.getHours() - 6);
  const [poeTiles, setPoeTiles] = useState([]);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [filterFormKey, setFilterFormKey] = useState(0);
  const [showPending, setShowPending] = useState(true);
  const cb = () => {};

  const toggleDateTimePicker = () => {
    setShowDateTimePicker(value => !value);
    setFilterFormKey(filterFormKey + 1);
  };

  const initialParamState = {
    etaStart: startDate,
    etaEnd: addMinutes(endDate, 1)
  };

  const getInitialState = () => {
    setShowDateTimePicker(false);
    setShowPending(true);
    setFilterFormKey(filterFormKey + 1);
    return initialParamState;
  };

  const setDataWrapper = tileRes => {
    setShowPending(true);
    const tiles = [];
    const lanes = {};

    asArray(tileRes).map(tile => {
      tiles.push(createPOETile(tile)); //creates tile, adds to tile array
    });
    //THEN fetch and create all lanes, feeding tiles to each lane to calc if they belong base on poeStatus
    poe.get.getAllLanes().then(laneRes => {
      asArray(laneRes).map(lane => {
        lanes[lane.ord] = createPOELane(lane, tiles); //creates lane, adds to lane object
      });
      //After lanes AND tiles have both been created , set the constants
      setColumns(lanes);
      setPoeTiles(tiles);
      setShowPending(false);
    });
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

  const convertTileToData = (tile, status) => {
    const req = {
      paxId: tile.paxId,
      paxFirstName: null,
      paxLastName: null,
      document: null,
      hitCategory: null,
      flightCountdownTime: null,
      status: status
    };
    return req;
  };

  const createPOETile = tileData => {
    return {
      paxId: tileData.paxId,
      id: tileData.paxId + "",
      content: (
        <div>
          <div className="font-weight-bolder">
            <a href={"paxDetail/" + tileData.flightId + "/" + tileData.paxId}>
              {tileData.paxLastName}, {tileData.paxFirstName}
            </a>
          </div>
          <div>
            Flight #:
            <ToolTipWrapper
              data={{
                val: tileData.flightNumber,
                lkup: LK.CARRIER
              }}
            ></ToolTipWrapper>{" "}
          </div>
          <div> Doc #: {tileData.document.documentNumber}</div>
          <div>Reason: {tileData.hitCategory}</div>
          <div>&nbsp;</div>
          <div className="poe-countdown-outer">
            <div className="poe-countdown-inner">
              <CountdownBadge
                future={tileData.flightCountdownTime}
                baseline={new Date()}
                direction={tileData.direction}
              ></CountdownBadge>
            </div>
          </div>
        </div>
      ),
      status: tileData.status
    };
  };

  const createPOELane = (laneData, tiles) => {
    const tileList = [];
    tiles.forEach(tile => {
      //Give each lane its appropriate tile list
      if (laneData.status === tile.status) {
        tileList.push(tile);
      }
    });
    return {
      name: laneData.displayName,
      items: tileList,
      background: "#f0f0f0",
      dragbackground: "#c0ddec",
      status: laneData.status
    };
  };

  const [columns, setColumns] = useState({});

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      poe.put.updatePOEStatus(convertTileToData(removed, destColumn.status)).then(res => {
        /*console.log("updateSuccess")*/
      });
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
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
          </FilterForm>
        </Col>
      </SidenavContainer>
      <Main>
        <Title title={<Xl8 xid="poe0007">Port Of Entry Lookout</Xl8>} uri={props.uri} />
        {showPending && <Loading></Loading>}
        <CardDeck className="page-deck justify-content-center">
          <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBlock: "15px"
                  }}
                  key={columnId}
                >
                  <h5>{column.name}</h5>
                  <div style={{ margin: 8, maxHeight: "calc((vh-120px)/2)" }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? column.dragbackground
                                : column.background,
                              padding: 8,
                              width: 300,
                              minHeight: 200,
                              maxHeight: "calc((100vh - 250px)/2)",
                              overflowY: "auto",
                              border: "1px solid #d0d0d0",
                              backgroundColor: "white",
                              borderRadius: "3px"
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 6,
                                          margin: "0 0 8px 0",
                                          minHeight: "50px",
                                          backgroundColor: "#009e9233",
                                          color: "black",
                                          ...provided.draggableProps.style,
                                          border: "1px solid black",
                                          borderRadius: "5px",
                                          textAlign: "left"
                                        }}
                                      >
                                        {item.content}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </CardDeck>
      </Main>
    </>
  );
};

export default Kanban;

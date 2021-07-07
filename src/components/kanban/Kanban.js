// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CountdownBadge from "../../components/countdownBadge/CountdownBadge";
import { CardDeck, Col } from "react-bootstrap";
import { asArray, hasData } from "../../utils/utils";

import "./Kanban.css";
import { poe } from "../../services/serviceWrapper";
import Loading from "../../components/loading/Loading";
import { LK } from "../../utils/constants";
import ToolTipWrapper from "../tooltipWrapper/TooltipWrapper";

const Kanban = props => {
  const [poeTiles, setPoeTiles] = useState([]);
  const [showPending, setIsPending] = useState(false);

  useEffect(() => {
    const tiles = [];
    const lanes = {};
    if (hasData(props.tiles)) {
      asArray(props.tiles).map(tile => {
        tiles.push(createPOETile(tile)); //creates tile, adds to tile array
      });
    }
    if (hasData(props.lanes)) {
      asArray(props.lanes).map(lane => {
        lanes[lane.ord] = createPOELane(lane, tiles); //creates lane, associates tile, adds to lane object
      });
    }
    setColumns(lanes);
    setPoeTiles(tiles);
    setIsPending(false);
  }, []);

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
      {(props.isLoading || showPending) && <Loading></Loading>}
      <CardDeck className="poe-page-deck">
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div className="poe-drag-drop" key={columnId}>
                <h5>{column.name}</h5>
                <div className="poe-droppable-div">
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="poe-droppable"
                          style={{
                            background: snapshot.isDraggingOver
                              ? column.dragbackground
                              : column.background
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
                                      className="poe-draggable"
                                      style={{
                                        ...provided.draggableProps.style
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
    </>
  );
};

export default Kanban;

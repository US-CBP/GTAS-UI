import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CountdownBadge from "../../components/countdownBadge/CountdownBadge";
import { CardDeck } from "react-bootstrap";
import { randomIntOfLength } from "../../utils/utils";
import Xl8 from "../../components/xl8/Xl8";

import "./Kanban.css";

const Kanban = props => {
  const randdate = (length = 1) => new Date(Date.now() + randomIntOfLength(length));

  const actives = [
    {
      id: "1001",
      content: (
        <div>
          <div className="font-weight-bolder">Barthez, Veronique</div>
          <div>Doc #: 21099D-MA78</div>
          <div className="poe-countdown-outer">
            <span>Reason:</span>
            <div className="poe-countdown-inner">
              <CountdownBadge future={randdate(9)} baseline={randdate()}></CountdownBadge>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "1002",
      content: (
        <div>
          <div className="font-weight-bolder">Floyd, Jojo</div>
          <div>Doc #: 21099D-MA78</div>
          <div className="poe-countdown-outer">
            <span>Reason:</span>
            <div className="poe-countdown-inner">
              <CountdownBadge future={randdate(9)} baseline={randdate()}></CountdownBadge>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "1003",
      content: (
        <div>
          <div className="font-weight-bolder">Mellon, Carnegie</div>
          <div>Doc #: 21099D-MA78</div>
          <div className="poe-countdown-outer">
            <span>Reason:</span>
            <div className="poe-countdown-inner">
              <CountdownBadge future={randdate(8)} baseline={randdate()}></CountdownBadge>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "1004",
      content: (
        <div>
          <div className="font-weight-bolder">Liu, Simu</div>
          <div>Doc #: 21099D-MA78</div>
          <div className="poe-countdown-outer">
            <span>Reason:</span>
            <div className="poe-countdown-inner">
              <CountdownBadge future={randdate(6)} baseline={randdate()}></CountdownBadge>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "1005",
      content: (
        <div>
          <div className="font-weight-bolder">Varg, Hjordis</div>
          <div>Doc #: 21099D-MA78</div>
          <div className="poe-countdown-outer">
            <span>Reason:</span>
            <div className="poe-countdown-inner">
              <CountdownBadge future={randdate(9)} baseline={randdate()}></CountdownBadge>
            </div>
          </div>
        </div>
      )
    }
  ];

  const enroutes = [
    {
      id: "1010",
      content: (
        <div>
          <div className="font-weight-bolder">Martin, Doc</div>
          <div>Doc #: 21099D-MA78</div>
          <div className="poe-countdown-outer">
            <span>Reason:</span>
            <div className="poe-countdown-inner">
              <CountdownBadge future={randdate(6)} baseline={randdate()}></CountdownBadge>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "1012",
      content: (
        <div>
          <div className="font-weight-bolder">Olu, Idris</div>
          <div>Doc #: 21099D-MA78</div>
          <div className="poe-countdown-outer">
            <span>Reason:</span>
            <div className="poe-countdown-inner">
              <CountdownBadge future={randdate(7)} baseline={randdate()}></CountdownBadge>
            </div>
          </div>
        </div>
      )
    }
  ];

  const encounters = [
    {
      id: "1020",
      content: (
        <div>
          <div className="font-weight-bolder">Marin, Imelda</div>
          <div>Doc #: 21099D-MA78</div>
          <div className="poe-countdown-outer">
            <span>Reason:</span>
            <div className="poe-countdown-inner">
              <CountdownBadge future={randdate(3)} baseline={randdate()}></CountdownBadge>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "1022",
      content: (
        <div>
          <div className="font-weight-bolder">Olu, Idris</div>
          <div>Doc #: 21099D-MA78</div>
          <div className="poe-countdown-outer">
            <span>Reason: World Health</span>
            <div className="poe-countdown-inner">
              <CountdownBadge future={randdate(5)} baseline={randdate()}></CountdownBadge>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "1023",
      content: (
        <div>
          <div className="font-weight-bolder">Twee, Harrison</div>
          <div>Doc #: 21099D-MA78</div>
          <div className="poe-countdown-outer">
            <span>Reason:</span>
            <div className="poe-countdown-inner">
              <CountdownBadge future={randdate(5)} baseline={randdate()}></CountdownBadge>
            </div>
          </div>
        </div>
      )
    }
  ];

  const misses = [
    {
      id: "1030",
      content: (
        <div>
          <div className="font-weight-bolder">Popoto, Vaquita</div>
          <div>Doc #: 199485bb2</div>
          <div className="poe-countdown-outer">
            <span>Reason: Local Police</span>
            <div className="poe-countdown-inner">
              <CountdownBadge future={randdate()} baseline={randdate(6)}></CountdownBadge>
            </div>
          </div>
        </div>
      )
    }
  ];

  const negatives = [
    {
      id: "1040",
      content: (
        <div>
          <div className="font-weight-bolder">Hsieh, Yu Min</div>
          <div>Doc #: FF0294-KRCAN</div>
          <div className="poe-countdown-outer">
            <span>Reason: Interpol</span>
            <div className="poe-countdown-inner">
              <CountdownBadge future={randdate()} baseline={randdate(6)}></CountdownBadge>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "1041",
      content: (
        <div>
          <div className="font-weight-bolder">Sandiego, Carmen</div>
          <div>Doc #: 3948HHERUS</div>
          <div className="poe-countdown-outer">
            <span>Reason: </span>
            <div className="poe-countdown-inner">
              <CountdownBadge future={randdate()} baseline={randdate(6)}></CountdownBadge>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "1042",
      content: (
        <div>
          <div className="font-weight-bolder">Pietr, Samuel</div>
          <div>Doc #: BB2K9DRRE</div>
          <div className="poe-countdown-outer">
            <span>Reason: </span>
            <div className="poe-countdown-inner">
              <CountdownBadge future={randdate()} baseline={randdate(6)}></CountdownBadge>
            </div>
          </div>
        </div>
      )
    }
  ];

  const columnsFromBackend = {
    "9001": {
      name: <Xl8 xid="poe0001">Active Lookout</Xl8>,
      items: actives,
      background: "#f0f0f0",
      dragbackground: "#c0ddec"
    },
    "9002": {
      name: <Xl8 xid="poe0002">Officer En Route</Xl8>,
      items: enroutes,
      background: "#f0f0f0",
      dragbackground: "#c0ddec"
    },
    "9003": {
      name: <Xl8 xid="poe0003">Lookout Encountered</Xl8>,
      items: encounters,
      background: "#f0f0f0",
      dragbackground: "#c0ddec"
    },
    "9004": {
      name: <Xl8 xid="poe0004">Lookout Referred</Xl8>,
      items: [],
      background: "#f0f0f0",
      dragbackground: "#c0ddec"
    },
    "9005": {
      name: <Xl8 xid="poe0005">Did Not Board</Xl8>,
      items: [],
      background: "#f0f0f0",
      dragbackground: "lightyellow"
    },
    "9006": {
      name: <Xl8 xid="poe0006">Lookout Missed</Xl8>,
      items: misses,
      background: "#f0f0f0",
      dragbackground: "lightpink"
    },
    "9007": {
      name: <Xl8 xid="poe0007">Secondary Positive</Xl8>,
      items: [],
      dragbackground: "lightgreen",
      background: "#f0f0f0"
    },
    "9008": {
      name: <Xl8 xid="poe0008">Secondary Negative</Xl8>,
      items: negatives,
      background: "#f0f0f0",
      dragbackground: "lightgray"
    }
  };
  const [columns, setColumns] = useState(columnsFromBackend);

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
    <div className="scrollable">
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
    </div>
  );
};

export default Kanban;

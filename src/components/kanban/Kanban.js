import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Xl8 from "../../components/xl8/Xl8";

import "./Kanban.css";

const Kanban = props => {
  const actives = [
    { id: "1001", content: "Last Name:" },
    { id: "1002", content: "Second task" },
    { id: "1003", content: "Third task" },
    { id: "1004", content: "Fourth task" },
    { id: "1005", content: "Fifth task" }
  ];
  const enroutes = [
    { id: "1011", content: "Last Name:" },
    { id: "1012", content: "Second task" },
    { id: "1013", content: "Third task" }
  ];

  const columnsFromBackend = {
    ["9001"]: {
      name: <Xl8 xid="poe0001">Active Lookout</Xl8>,
      items: actives,
      background: "lightpink"
    },
    ["9002"]: {
      name: <Xl8 xid="poe0002">Officer En Route</Xl8>,
      items: enroutes,
      background: "lightyellow"
    },
    ["9003"]: {
      name: <Xl8 xid="poe0003">Lookout Encountered</Xl8>,
      items: [],
      background: "lightgreen"
    },
    ["9004"]: {
      name: <Xl8 xid="poe0004">Lookout Referred</Xl8>,
      items: [],
      background: "lightblue"
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
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h5>{column.name}</h5>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? "#c0ddec" : "#f0f0f0",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: "#0082c3",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                      border: "1px solid black",
                                      borderRadius: "5px"
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
    </div>
  );
};

export default Kanban;

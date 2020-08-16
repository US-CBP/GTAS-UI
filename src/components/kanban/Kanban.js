import React from "react";
import Board from "react-trello";
import Title from "../../components/title/Title";
import { Container } from "react-bootstrap";

import "./Kanban.css";

const Kanban = props => {
  const data = {
    lanes: [
      {
        id: "lane0",
        title: "Active Lookout",
        label: "20/70",
        style: {
          width: 280
        },
        cards: [
          {
            id: "Milk",
            title: "Buy milk",
            label: "15 mins",
            description: "2 Gallons of milk at the Deli store"
          },
          {
            id: "Plan2",
            title: "Dispose Garbage",
            label: "10 mins",
            description: "Sort out recyclable and waste as needed"
          },
          {
            id: "Plan3",
            title: "Write Blog",
            label: "30 mins",
            description: "Can AI make memes?"
          },
          {
            id: "Plan4",
            title: "Pay Rent",
            label: "5 mins",
            description: "Transfer to bank account"
          }
        ]
      },
      {
        id: "lane1",
        title: "Officer En Route",
        label: "10/20",
        style: {
          width: 280
        },
        cards: [
          {
            id: "Wip1",
            title: "Clean House",
            label: "30 mins",
            description:
              "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses"
          }
        ]
      },
      {
        id: "lane2",
        title: "Lookout Encountered",
        label: "0/0",
        style: {
          width: 280
        },
        cards: []
      },
      {
        id: "lane3",
        title: "Lookout Referred",
        style: {
          width: 280
        },
        label: "2/5",
        cards: [
          {
            id: "Completed1",
            title: "Practice Meditation",
            label: "15 mins",
            description: "Use Headspace app"
          },
          {
            id: "Completed2",
            title: "Maintain Daily Journal",
            label: "15 mins",
            description: "Use Spreadsheet for now"
          }
        ]
      },
      {
        id: "lane4",
        title: "Did Not Board",
        style: {
          width: 280
        },
        label: "1/1",
        cards: [
          {
            id: "Repeat1",
            title: "Morning Jog",
            label: "30 mins",
            description: "Track using fitbit"
          }
        ]
      },
      {
        id: "lane5",
        title: "Lookout Missed",
        style: {
          width: 280
        },
        label: "1/1",
        cards: [
          {
            id: "Archived1",
            title: "Go Trekking",
            label: "300 mins",
            description: "Completed 10km on cycle"
          }
        ]
      },
      {
        id: "lane6",
        title: "Secondary Positive",
        style: {
          width: 280
        },
        label: "1/1",
        cards: [
          {
            id: "Archived2",
            title: "Go Jogging",
            label: "300 mins",
            description: "Completed 10km on cycle"
          }
        ]
      },
      {
        id: "lane7",
        title: "Secondary Negative",
        style: {
          width: 280
        },
        label: "1/1",
        cards: [
          {
            id: "Archived3",
            title: "Go Cycling",
            label: "300 mins",
            description: "Completed 10km on cycle"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Container>
        <Title title="POE" />
      </Container>
      <Container fluid>
        <Board
          data={data}
          cardDragClass="draggingCard"
          laneDragClass="draggingLane"
          draggable
        />
      </Container>
    </>
  );
};

export default Kanban;

import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Title from "../../../../components/title/Title";
import { Button, Col, Container, Row } from "react-bootstrap";
import {codeEditor, users} from "../../../../services/serviceWrapper";
import AddAirportModal from "./AddAirportModal";
import CreateUserModal from "../../manageUsers/CreateUserModal";

const Airports = ({ name }) => {
  const cb = function(result) {};
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Create New User");
  const [editRowDetails, setEditRowDetails] = useState({});

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const openEditModal = (rowDetails) => {
    setIsEditModal(true);
    setModalTitle("Edit Airport Code");
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const headers =  [
    {
      Accessor: "Edit",
      Cell: ({row}) => {
        return (
            <div className="icon-col">
              <i
                  className="fa fa-pencil-square-o qbrb-icon"
                  onClick={() => openEditModal(row.original)}
              ></i>
            </div>
        );
      }
    },
    { Accessor: "iata" },
    { Accessor: "icao" },
    { Accessor: "name" },
    { Accessor: "city" },
    { Accessor: "country" },
    { Accessor: "latitude" },
    { Accessor: "longitude" }
  ];

  return (
    <Container fluid>
      <Row>
        <Col sm={{ span: 3, offset: 1 }}>
          <Button variant="outline-dark" onClick={() => {
            setShowModal(true)
            setModalTitle("Add Airport")
            setIsEditModal(false)
            setEditRowDetails({});
          }}>
            Add Airport
          </Button>
          <AddAirportModal
            show={showModal}
            onHide={() => setShowModal(false)}
            isEdit = {isEditModal}
            title = {modalTitle}
            editRowDetails = {editRowDetails}
            refresh = {refresh}
            callback={cb}
          />
        </Col>
        <Col sm={3}>
          <Title title={name}></Title>
        </Col>
        <Col sm={{ span: 3, offset: 1 }}>
          <Button variant="outline-dark" onClick={() => {
            codeEditor.put.restoreAirportsAll().then(res => {
              refresh();
            });
          }}>
            Restore All Airports
          </Button>
        </Col>
      </Row>

      <Table
        service={codeEditor.get.airportCodes}
        id="airports"
        callback={cb}
        header={headers}
        key={refreshKey}
      ></Table>
    </Container>
  );
};

export default Airports;

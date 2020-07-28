import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Title from "../../../../components/title/Title";
import { Button, Col, Container, Row } from "react-bootstrap";
import { codeEditor } from "../../../../services/serviceWrapper";
import CountryModal from "./CountryModal";

const Countries = ({ name }) => {
  const cb = function(result) {};
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [editRowDetails, setEditRowDetails] = useState({});

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const openEditModal = rowDetails => {
    setIsEditModal(true);
    setModalTitle("Edit Country Code");
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const headers = [
    {
      Accessor: "Edit",
      Cell: ({ row }) => {
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
    { Accessor: "iso2" },
    { Accessor: "iso3" },
    { Accessor: "isoNumeric" },
    { Accessor: "name" }
  ];

  return (
    <Container fluid>
      <Row>
        <Col sm={{ span: 3, offset: 1 }}>
          <Button
            variant="outline-dark"
            onClick={() => {
              setShowModal(true);
              setModalTitle("Add Country");
              setIsEditModal(false);
              setEditRowDetails({});
            }}
          >
            Add Country
          </Button>
          <CountryModal
            show={showModal}
            onHide={() => setShowModal(false)}
            isEdit={isEditModal}
            title={modalTitle}
            editRowDetails={editRowDetails}
            refresh={refresh}
            callback={cb}
          />
        </Col>
        <Col sm={3}>
          <Title title={name}></Title>
        </Col>
        <Col sm={{ span: 3, offset: 1 }}>
          <Button
            variant="outline-dark"
            onClick={() => {
              codeEditor.put.restoreCountriesAll().then(res => {
                refresh();
              });
            }}
          >
            Restore All Countries
          </Button>
        </Col>
      </Row>

      <Table
        service={codeEditor.get.countryCodes}
        id="countries"
        callback={cb}
        header={headers}
        key={refreshKey}
      ></Table>
    </Container>
  );
};

export default Countries;

import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Xl8 from "../../../../components/xl8/Xl8";
import { Button, Container } from "react-bootstrap";
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
    setModalTitle(<Xl8 xid="cou001">Edit Country:</Xl8>);
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const headers = [
    {
      Accessor: "Edit",
      disableFilters: true,
      disableSortBy: true,
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
      <div className="action-button-div">
        <Button
          variant="outline-dark"
          onClick={() => {
            setShowModal(true);
            setModalTitle(<Xl8 xid="cou004">Add Country:</Xl8>);
            setIsEditModal(false);
            setEditRowDetails({});
          }}
        >
          {<Xl8 xid="cou002">Add Country</Xl8>}
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            codeEditor.put.restoreCountriesAll().then(res => {
              refresh();
            });
          }}
        >
          {<Xl8 xid="cou003">Restore All Countries</Xl8>}
        </Button>
      </div>
      <CountryModal
        show={showModal}
        onHide={() => setShowModal(false)}
        isEdit={isEditModal}
        title={modalTitle}
        editRowDetails={editRowDetails}
        refresh={refresh}
        callback={cb}
      />

      <Table
        service={codeEditor.get.countryCodes}
        id="countries"
        callback={cb}
        header={headers}
        key={refreshKey}
        enableColumnFilter={true}
      ></Table>
    </Container>
  );
};

export default Countries;

import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Xl8 from "../../../../components/xl8/Xl8";
import { codeEditor } from "../../../../services/serviceWrapper";
import CountryModal from "./CountryModal";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

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
    setModalTitle(<Xl8 xid="cou001">Edit Country</Xl8>);
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const headers = [
    {
      Accessor: "Edit",
      Xl8: true,
      Header: ["edit001", "Edit"],
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) => {
        return (
          <div className="icon-col">
            <i
              className="fa fa-pencil-square-o table-icon"
              onClick={() => openEditModal(row.original)}
            ></i>
          </div>
        );
      }
    },
    { Accessor: "iso2", Xl8: true, Header: ["iso2001", "ISO2"] },
    { Accessor: "iso3", Xl8: true, Header: ["iso3001", "ISO3"] },
    { Accessor: "isoNumeric", Xl8: true, Header: ["isonum001", "ISO Numeric"] },
    { Accessor: "name", Xl8: true, Header: ["cou005", "Name"] }
  ];

  const restoreAll = () => {
    codeEditor.put.restoreCountriesAll().then(res => {
      refresh();
    });
  };

  return (
    <div>
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
        callback={cb}
        header={headers}
        key={refreshKey}
        enableColumnFilter={true}
      ></Table>
      <Fab icon={<i className="fa fa-plus" />} variant="info">
        <Action
          text={<Xl8 xid="cou004">Add Country</Xl8>}
          onClick={() => {
            setShowModal(true);
            setModalTitle(<Xl8 xid="cou004">Add Country</Xl8>);
            setIsEditModal(false);
            setEditRowDetails({});
          }}
        >
          <i className="fa fa-plus" />
        </Action>
        <Action
          text={<Xl8 xid="cou003">Restore All Countries</Xl8>}
          variant="rtf-red"
          onClick={restoreAll}
        >
          <i className="fa fa-recycle" />
        </Action>
      </Fab>
    </div>
  );
};

export default Countries;

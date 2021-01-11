import React, { useState, useEffect, useContext } from "react";
import Table from "../../../components/table/Table";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import { ACTION, ROLE } from "../../../utils/constants";
import RoleAuthenticator from "../../../context/roleAuthenticator/RoleAuthenticator";
import { LookupContext } from "../../../context/data/LookupContext";

import { query } from "../../../services/serviceWrapper";
import { hasData } from "../../../utils/utils";
import QRModal from "./QRModal";
import "./QueryRules.css";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

const Queries = props => {
  const cb = function(status, res) {
    if (status === ACTION.SAVE || status === ACTION.DELETE) {
      setTablekey(tablekey + 1);
    }
    closeModal();
  };

  const addQuery = <Xl8 xid="">Add Query</Xl8>;
  const editQuery = <Xl8 xid="">Edit Query</Xl8>;
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(0);
  const [record, setRecord] = useState({});
  const [tablekey, setTablekey] = useState(0);
  const [modalKey, setModalKey] = useState(0);
  const [modalTitle, setModalTitle] = useState(addQuery);
  const ctx = useContext(LookupContext);
  const unsavedQueryKey = "lastQuery";

  const header = [
    {
      Accessor: "id",
      Xl8: true,
      disableSortBy: true,
      Header: ["edit001", "Edit"],
      Cell: ({ row }) => (
        <div className="icon-col">
          <i
            className="fa fa-pencil-square-o table-icon"
            onClick={() => launchModal(row.original.id, row.original)}
          ></i>
        </div>
      )
    },
    { Accessor: "title", Xl8: true, Header: ["q004", "Title"] },
    { Accessor: "description", Xl8: true, Header: ["q005", "Description"] }
  ];

  const launchModal = (recordId, record) => {
    const title = recordId ? editQuery : addQuery;

    setId(recordId);
    setRecord(record);
    setModalTitle(title);
    setModalKey(new Date());
  };

  const closeModal = () => {
    setId();
    setRecord();
    setShowModal(false);
  };

  useEffect(() => {
    if (modalKey !== 0) setShowModal(true);
  }, [modalKey]);

  useEffect(() => {
    const lastQuery = ctx.getLookupState(unsavedQueryKey);

    if (hasData(lastQuery)) {
      const flatRule = {
        ...lastQuery,
        tag: lastQuery.query
      };

      setId(flatRule.id);
      setRecord(flatRule);
      launchModal(flatRule.id, flatRule);
      ctx.lookupAction({ type: unsavedQueryKey, method: "delete" });
    }
  }, []);

  return (
    <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.QRYMGR]}>
      <Main className="full bg-white">
        <Title title={<Xl8 xid="q002">Queries</Xl8>}></Title>
        <Table
          service={query.get}
          callback={cb}
          header={header}
          key={`table${tablekey}`}
        ></Table>
        <Fab
          icon={<i className="fa fa-plus nospin" />}
          variant="info"
          onClick={() => launchModal()}
        ></Fab>

        <QRModal
          show={showModal}
          onHide={closeModal}
          callback={cb}
          key={modalKey}
          data={record}
          title={modalTitle}
          id={id}
          service={query}
        />
      </Main>
    </RoleAuthenticator>
  );
};

export default Queries;

import React, { useState, useEffect } from "react";
import Table from "../../../components/table/Table";
import Title from "../../../components/title/Title";
import { Button, Container, Tabs, Tab } from "react-bootstrap";
import { navigate } from "@reach/router";

import { rulesall, rule } from "../../../services/serviceWrapper";
import { hasData } from "../../../utils/utils";
import QRModal from "./QRModal";
import "./QueryRules.css";

const Rules = props => {
  const cb = function(result) {};
  const mode = (props.mode || "my").toLowerCase();

  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(mode === "all" ? "all" : "my");
  const [modalTitle, setModalTitle] = useState(`Add Rule`);

  const header = [
    {
      Accessor: "id",
      Header: "Edit",
      Cell: ({ row }) => (
        <div className="icon-col">
          <i
            className="fa fa-pencil-square-o qbrb-icon"
            onClick={() => launchModal(row.original.id)}
          ></i>
        </div>
      )
    },
    {
      Accessor: "title",
      Cell: ({ row }) => <div className="wide-col">{row.original.title}</div>
    },
    {
      Accessor: "description",
      Cell: ({ row }) => <div className="wide-col">{row.original.description}</div>
    },
    {
      Accessor: "hitCount",
      Header: "Hits"
    },
    { Accessor: "overMaxHits" },
    { Accessor: "ruleCat" },
    { Accessor: "modifiedOn" },
    { Accessor: "modifiedBy" },
    { Accessor: "author" },
    {
      Accessor: "enabled",
      Cell: ({ row }) => {
        if (row.original.enabled)
          return (
            <div className="icon-col">
              <i className="fa fa-check-square qbrb-icon"></i>
            </div>
          );
      }
    }
  ];

  const launchModal = recordId => {
    setId(recordId);
    if (!isNaN(recordId)) {
      const title = recordId > 0 ? `Edit Rule` : `Add Rule`;
      setModalTitle(title);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setId(0);
    setShowModal(false);
  };

  const titleTabCallback = ev => {
    const id = ev.split("-")[2];

    if ((id || "my").toLowerCase() === "all") {
      // setTab("all");
      navigate(`/gtas/tools/rules/all`);
    } else {
      // setTab("my");
      navigate(`/gtas/tools/rules/my`);
    }
  };

  useEffect(() => {
    const service = tab === "all" ? rulesall : rule;

    service.get().then(res => {
      let parsed = [];

      if (hasData(res)) {
        parsed = res.map(item => {
          return {
            id: item.id,
            hitCount: item.hitCount,
            modifiedOn: item.modifiedOn,
            modifiedBy: item.modifiedBy,
            ...item.summary
          };
        });
      }

      setData(parsed);
    });
  }, [tab]);

  const tabs = (
    <Tabs defaultActiveKey={tab} id="qrTabs">
      <Tab eventKey="my" title="My Rules"></Tab>
      <Tab eventKey="all" title="All Rules"></Tab>
    </Tabs>
  );

  const button = (
    <Button
      block
      variant="ternary"
      className="btn btn-outline-info"
      name={props.name}
      placeholder={props.placeholder}
      onClick={() => launchModal(0)}
      required={props.required}
      value={props.inputVal}
      alt={props.alt}
    >
      {`Create new Rule`}
    </Button>
  );

  return (
    <Container fluid>
      <Title
        title="Rules"
        leftChild={tabs}
        leftCb={titleTabCallback}
        rightChild={button}
      ></Title>
      <Table data={data} key={data} id="Rules" callback={cb} header={header}></Table>
      <QRModal
        show={showModal}
        onHide={closeModal}
        callback={cb}
        title={modalTitle}
        id={id}
      />
    </Container>
  );
};

export default Rules;
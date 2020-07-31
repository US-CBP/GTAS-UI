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
  const mode = (props.mode || "my").toLowerCase();
  const [tab, setTab] = useState(mode === "all" ? "all" : "my");
  const service = tab === "all" ? rulesall : rule;
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [modalTitle, setModalTitle] = useState(`Add Rule`);
  const [record, setRecord] = useState();
  const [key, setKey] = useState(0);
  const [tablekey, setTablekey] = useState(0);

  const cb = function(result) {
    if (result === "SAVE" || result === "DELETE" || result === "CLOSE") {
      closeModal();
    }
  };

  const header = [
    {
      Accessor: "id",
      Header: "Edit",
      Cell: ({ row }) => (
        <div className="icon-col">
          <i
            className="fa fa-pencil-square-o qbrb-icon"
            onClick={() => fetchDetail(row.original.id)}
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
    {
      Accessor: "overMaxHits",
      Cell: ({ row }) => (
        <div className="icon-col">{row.original.overMaxHits ? "Yes" : "No"}</div>
      )
    },
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

  const fetchDetail = id => {
    rule.get(id).then(res => {
      if (hasData(res)) {
        res.title = res.summary.title;
        res.description = res.summary.description;
        res.ruleCat = res.summary.ruleCat;
        res.startDate = res.summary.startDate;
        res.endDate = res.summary.endDate;
        res.query = res.details;
        delete res.summary;
        delete res.details;

        launchModal(res);
      }
    });
  };

  const launchModal = rec => {
    const recordId = rec.id;
    setKey(key + 1);
    setId(recordId);
    setRecord(rec);
    const title = recordId > 0 ? `Edit Rule` : `Add Rule`;
    setModalTitle(title);
    setShowModal(true);
  };

  const closeModal = () => {
    setId();
    setRecord();
    setKey(key + 1);
    setTablekey(tablekey + 1);
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

  useEffect(() => {
    // setTab("my");
    setTablekey(tablekey + 1);
  }, [data]);

  const tabs = (
    <Tabs defaultActiveKey={tab} id="qrTabs">
      <Tab eventKey="my" title="My Rules"></Tab>
      <Tab eventKey="all" title="All Rules"></Tab>
    </Tabs>
  );

  const button = (
    <Button
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
      <Table data={data} id="Rules" callback={cb} header={header} key={tablekey}></Table>
      {showModal && (
        <QRModal
          show={showModal}
          onHide={closeModal}
          callback={cb}
          mode="RULE"
          key={key}
          data={record}
          title={modalTitle}
          id={id}
          service={rule}
        />
      )}
    </Container>
  );
};

export default Rules;

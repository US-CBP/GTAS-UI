import React, { useState, useEffect } from "react";
import Table from "../../../components/table/Table";
import Title from "../../../components/title/Title";
import { Button, Container, Tabs, Tab } from "react-bootstrap";
import { navigate } from "@reach/router";

import { rulesall, rule } from "../../../services/serviceWrapper";
import { hasData, getEndpoint } from "../../../utils/utils";
import { QR, ACTION, RULETAB } from "../../../utils/constants";
import QRModal from "./QRModal";
import "./QueryRules.css";

const Rules = props => {
  const endpoint = getEndpoint(props.location.pathname);
  const [tab, setTab] = useState(endpoint === "rules" ? RULETAB.MY : RULETAB.ALL);
  const service = tab === RULETAB.ALL ? rulesall : rule;
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [modalTitle, setModalTitle] = useState(`Add Rule`);
  const [record, setRecord] = useState();
  const [key, setKey] = useState(0);
  const [tablekey, setTablekey] = useState(0);

  const cb = function(status, res) {
    if (status === ACTION.DELETE || status === ACTION.SAVE) return closeModalAndRefresh();

    closeModal();
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
        if (row.original.enabled === true) {
          return (
            <div className="icon-col">
              <i className="fa fa-check-square qbrb-icon"></i>
            </div>
          );
        }
        return <div className="icon-col"></div>;
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
        res.enabled = res.summary.enabled;
        res.endDate = res.summary.endDate;
        res.query = res.details;
        delete res.summary;
        delete res.details;

        launchModal(res);
      }
      // else, launch info/warning notification?
    });
  };

  const launchModal = rec => {
    const recordId = rec?.id;
    const title = recordId ? `Edit Rule` : `Add Rule`;

    if (rec) {
      setKey(key + 1);
      setId(recordId);
      setRecord(rec);
      setModalTitle(title);
    }

    setShowModal(true);
  };

  const closeModalAndRefresh = () => {
    closeModal();
    fetchData();
  };

  const closeModal = () => {
    setShowModal(false);
    setId();
    setRecord();
  };

  const titleTabCallback = ev => {
    const id = ev.split("-")[2];
    if (!id) return;

    if ((id || RULETAB.MY).toLowerCase() === RULETAB.ALL) {
      setTab(RULETAB.ALL);
      navigate(`/gtas/tools/rules/${RULETAB.ALL}`);
    } else {
      setTab(RULETAB.MY);
      navigate(`/gtas/tools/rules/${RULETAB.MY}`);
    }
  };

  const fetchData = () => {
    service.get().then(res => {
      let parsed = [{}];

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
        setData(parsed);

        setTablekey(tablekey + 1);
      }
    });
  };

  useEffect(() => {
    if (endpoint === "rules") {
      // titleTabCallback expects a string in the in the format "somestring-somestring-TABNAME",
      // so we are building a fake string ending with the tab we want as the default;
      titleTabCallback(`click-tab-${RULETAB.MY}`);
    }

    fetchData();
  }, [tab]);

  const tabs = (
    <Tabs defaultActiveKey={RULETAB.MY} id="qrTabs">
      <Tab eventKey={RULETAB.MY} title="My Rules"></Tab>
      <Tab eventKey={RULETAB.ALL} title="All Rules"></Tab>
    </Tabs>
  );

  const button = (
    <Button
      variant="ternary"
      className="btn btn-outline-info"
      name={props.name}
      placeholder={props.placeholder}
      onClick={() => launchModal()}
      required={props.required}
      value={props.inputVal}
      alt={props.alt}
    >
      Create new Rule
    </Button>
  );

  return (
    <Container fluid>
      <Title
        title="Rules"
        key="title"
        leftChild={tabs}
        leftCb={titleTabCallback}
        rightChild={button}
      ></Title>
      <Table
        data={data}
        id="Rules"
        callback={cb}
        header={header}
        key={`table-${tablekey}`}
      ></Table>
      <QRModal
        show={showModal}
        onHide={closeModal}
        callback={cb}
        mode={QR.RULE}
        key={key}
        data={record}
        title={modalTitle}
        id={id}
        service={rule}
      />
    </Container>
  );
};

export default Rules;

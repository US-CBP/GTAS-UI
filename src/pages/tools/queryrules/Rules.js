import React, { useState, useEffect, useContext } from "react";
import Table from "../../../components/table/Table";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import { Button, Tabs, Tab } from "react-bootstrap";
import { navigate } from "@reach/router";
import { LookupContext } from "../../../context/data/LookupContext";

import { rulesall, rule } from "../../../services/serviceWrapper";
import { hasData, getEndpoint } from "../../../utils/utils";
import { QR, ACTION, RULETAB, ROLE } from "../../../utils/constants";
import RoleAuthenticator from "../../../context/roleAuthenticator/RoleAuthenticator";
import QRModal from "./QRModal";
import "./QueryRules.css";

//TODO - the two fetches, rulesall and rules, are separate but they don't need to be. Until we have requirements preventing some
//users or roles from fetching all rules, we should consider pulling all data from rulesall and filtering the results for "my rules".
const Rules = props => {
  const addRule = <Xl8 xid="rul001">Add Rule</Xl8>;
  const editRule = <Xl8 xid="rul002">Edit Rule</Xl8>;
  const endpoint = getEndpoint(props.location.pathname);
  const [tab, setTab] = useState(endpoint === "rules" ? RULETAB.MY : RULETAB.ALL);
  const service = endpoint === "all" ? rulesall : rule;
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState({});
  const [modalTitle, setModalTitle] = useState(addRule);
  const [record, setRecord] = useState();
  const [modalKey, setModalKey] = useState(-1);
  const [tablekey, setTablekey] = useState(0);
  const ctx = useContext(LookupContext);

  const cb = res => {};

  const modalCb = (status, res) => {
    if (status === ACTION.DELETE || status === ACTION.SAVE) return closeModalAndRefresh();

    closeModal();
  };

  const header = [
    {
      Accessor: "id",
      Xl8: true,
      Header: ["edit001", "Edit"],
      Cell: ({ row }) => (
        <div className="icon-col">
          <i
            className="fa fa-pencil-square-o table-icon"
            onClick={() => fetchDetail(row.original.id)}
          ></i>
        </div>
      )
    },
    {
      Accessor: "title",
      Xl8: true,
      Header: ["rul007", "Title"],
      Cell: ({ row }) => <div className="wide-col">{row.original.title}</div>
    },
    {
      Accessor: "description",
      Xl8: true,
      Header: ["rul008", "Description"],
      Cell: ({ row }) => <div className="wide-col">{row.original.description}</div>
    },
    {
      Accessor: "hitCount",
      Xl8: true,
      Header: ["rul009", "Hits"]
    },
    {
      Accessor: "overMaxHits",
      Xl8: true,
      Header: ["rul010", "Over Max Hits"],
      Cell: ({ row }) => (
        <div className="icon-col">{row.original.overMaxHits ? "Yes" : "No"}</div>
      )
    },
    { Accessor: "modifiedOn", Xl8: true, Header: ["rul011", "Modified On"] },
    { Accessor: "modifiedBy", Xl8: true, Header: ["rul012", "Modified By"] },
    { Accessor: "author", Xl8: true, Header: ["rul013", "Author"] },
    {
      Accessor: "enabled",
      Xl8: true,
      Header: ["rul014", "Enabled"],
      Cell: ({ row }) => {
        if (row.original.enabled === true) {
          return (
            <div className="icon-col">
              <i className="fa fa-check-square qbrb-icon-check"></i>
            </div>
          );
        }
        return <div className="icon-col"></div>;
      }
    }
  ];

  const fetchDetail = selectedId => {
    rule.get(selectedId).then(res => {
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

        setId(selectedId);
        setRecord(res);
        triggerShowModal(selectedId);
      }
    });
  };

  // Causes show modal to update in a useEffect. This gives the setRecord and setId (see fetchDetail) time to refresh
  // so the modal doesn't launch with stale or missing data.
  const triggerShowModal = recId => {
    const recordId = recId;
    const title = recordId ? editRule : addRule;

    setModalTitle(title);
    // timestamp as key ensures the modal gets refreshed and displayed on each launch.
    setModalKey(Date.now());
  };

  useEffect(() => {
    if (modalKey > -1) setShowModal(true);
  }, [modalKey]);

  const closeModalAndRefresh = () => {
    closeModal();
    fetchTableData();
  };

  const closeModal = () => {
    setId();
    setRecord();
    setShowModal(false);
  };

  // Called by the Tab component where ev is a dash separated string in the form of "tabId-tab-selectedTabName"
  const titleTabCallback = ev => {
    const selectedTabName = ev.split("-")[2];
    if (!selectedTabName) return;

    if ((selectedTabName || RULETAB.MY).toLowerCase() === RULETAB.ALL) {
      setTab(RULETAB.ALL);
      navigate(`/gtas/tools/rules/${RULETAB.ALL}`);
    } else {
      setTab(RULETAB.MY);
      navigate(`/gtas/tools/rules/${RULETAB.MY}`);
    }
  };

  const fetchTableData = () => {
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
      // Builds a dummy string with the default tabname in the 3rd position;
      titleTabCallback(`--${RULETAB.MY}`);
    }

    fetchTableData();
  }, [endpoint]);

  useEffect(() => {
    const lastRule = ctx.getLookupState("lastRule");

    if (hasData(lastRule)) {
      const flatRule = { ...lastRule.summary, query: lastRule.details, id: lastRule.id };

      setId(flatRule.id);
      setRecord(flatRule);
      triggerShowModal(flatRule.id);
      ctx.lookupAction({ type: "removeRule" });
    }
  }, []);

  const tabs = (
    <Tabs defaultActiveKey={RULETAB.MY} id="qrTabs">
      <Tab
        eventKey={RULETAB.MY}
        title={
          <Xl8 xid="rul003" id="qrTabs-tab-my">
            My Rules
          </Xl8>
        }
      ></Tab>
      <Tab
        eventKey={RULETAB.ALL}
        title={
          <Xl8 xid="rul004" id="qrTabs-tab-all">
            All Rules
          </Xl8>
        }
      ></Tab>
    </Tabs>
  );

  const button = (
    <Button
      variant="ternary"
      className="btn btn-info"
      name={props.name}
      placeholder={props.placeholder}
      onClick={() => triggerShowModal()}
      required={props.required}
      value={props.inputVal}
      alt={props.alt}
    >
      {addRule}
    </Button>
  );

  return (
    <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.RULEMGR]}>
      <Main className="full bg-white">
        <Title
          title={<Xl8 xid="rul006">Rules</Xl8>}
          key="title"
          leftChild={tabs}
          leftCb={titleTabCallback}
          rightChild={button}
        ></Title>
        <Table
          data={data}
          callback={cb}
          header={header}
          key={`table-${tablekey}`}
        ></Table>
        {showModal && (
          <QRModal
            show="true"
            onHide={closeModal}
            callback={modalCb}
            mode={QR.RULE}
            key={modalKey}
            data={record}
            title={modalTitle}
            id={id}
            service={rule}
          />
        )}
      </Main>
    </RoleAuthenticator>
  );
};

export default Rules;

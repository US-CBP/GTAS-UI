// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect, useContext } from "react";
import Table from "../../../components/table/Table";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import { Tabs, Tab } from "react-bootstrap";
import { LookupContext } from "../../../context/data/LookupContext";

import { rulesall, rule } from "../../../services/serviceWrapper";
import { getBooleanExportValue, hasData } from "../../../utils/utils";
import { QR, ACTION, RULETAB, ROLE, EXPORTFILENAME } from "../../../utils/constants";
import RoleAuthenticator from "../../../context/roleAuthenticator/RoleAuthenticator";
import QRModal from "./QRModal";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import "./QueryRules.css";
import { UserContext } from "../../../context/user/UserContext";

//TODO - the two fetches, rulesall and rules, are separate but they don't need to be. Until we have requirements preventing some
//users or roles from fetching all rules, we should consider pulling all data from rulesall and filtering the results for "my rules".
const Rules = props => {
  const addRule = <Xl8 xid="rul001">Add Rule</Xl8>;
  const editRule = <Xl8 xid="rul002">Edit Rule</Xl8>;
  const [tab, setTab] = useState(RULETAB.MY);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [modalTitle, setModalTitle] = useState(addRule);
  const [record, setRecord] = useState();
  const [modalKey, setModalKey] = useState();
  const [tablekey, setTablekey] = useState(0);
  const ctx = useContext(LookupContext);
  const unsavedRuleKey = "lastRule";
  const [myRules, setMyRules] = useState();
  const [allRules, setAllRules] = useState();

  const cb = () => {};

  const modalCb = (status, res) => {
    if (status === ACTION.DELETE || status === ACTION.SAVE) return closeModalAndRefresh();

    closeModal();
  };

  const header = [
    {
      Accessor: "id",
      Xl8: true,
      disableSortBy: true,
      Header: ["edit001", "Edit"],
      disableFilters: true,
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
      Accessor: "posCount",
      Xl8: true,
      Header: ["rul015", "Positive"]
    },
    {
      Accessor: "negCount",
      Xl8: true,
      Header: ["rul016", "Negative"]
    },
    {
      Accessor: "overMaxHits",
      Xl8: true,
      Header: ["rul010", "Over Max Hits"],
      isBoolean: true,
      getCellExportValue: row => getBooleanExportValue(row.original.overMaxHits),
      Cell: ({ row }) => {
        if (row.original.overMaxHits === 1) {
          return (
            <div className="icon-col">
              <i className="fa fa-check-square qbrb-icon-check-red"></i>
            </div>
          );
        }
        return <div className="icon-col"></div>;
      }
    },
    { Accessor: "modifiedOn", Xl8: true, Header: ["rul011", "Modified On"] },
    { Accessor: "modifiedBy", Xl8: true, Header: ["rul012", "Modified By"] },
    { Accessor: "author", Xl8: true, Header: ["rul013", "Author"] },
    {
      Accessor: "enabled",
      Xl8: true,
      isBoolean: true,
      Header: ["rul014", "Enabled"],
      getCellExportValue: row => getBooleanExportValue(row.original.enabled),
      Cell: ({ row }) => {
        if (row.original.enabled === 1) {
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
        triggerShowModal(res, selectedId);
      }
    });
  };

  // Causes show modal to update in a useEffect. This gives the setRecord and setId (see fetchDetail) time to refresh
  // so the modal doesn't launch with stale or missing data.
  const triggerShowModal = (rec, recId) => {
    if (showModal && !rec) return closeModal();
    const recordId = recId;
    const title = recordId ? editRule : addRule;

    setModalKey(Date.now());
    setModalTitle(title);
    setShowModal(true);
  };

  const closeModalAndRefresh = () => {
    closeModal();
    fetchTableData();
  };

  const closeModal = () => {
    setId();
    setRecord();
    setModalKey();
    setShowModal(false);
  };

  // Called by the Tab component where ev is a dash separated string in the form of "tabId-tab-selectedTabName"
  const titleTabCallback = ev => {
    const selectedTabName = ev.split("-")[2];
    if (!selectedTabName) return;

    if ((selectedTabName || RULETAB.MY).toLowerCase() === RULETAB.ALL) {
      setTab(RULETAB.ALL);
    } else {
      setTab(RULETAB.MY);
    }
  };

  const fetchTableData = () => {
    rulesall.get().then(res => {
      let all = [];
      let mine = [];

      if (hasData(res)) {
        res.forEach(item => {
          let parsedItem = {
            id: item.id,
            hitCount: item.hitCount,
            posCount: item.posCount,
            negCount: item.negCount,
            modifiedOn: item.modifiedOn,
            modifiedBy: item.modifiedBy,
            ...item.summary,
            overMaxHits: item.summary.overMaxHits === true ? 1 : 0,
            enabled: item.summary.enabled === true ? 1 : 0
          };
          if (isLoggedinUser(parsedItem.author)) {
            mine.push(parsedItem); //if author is logged in user, add to 'my' list
          }
          all.push(parsedItem); //always add to 'all rules'.
        });
      }
      setAllRules(all);
      setMyRules(mine);
      if (tab === RULETAB.ALL) {
        setData(all);
      } else {
        setData(mine);
      }
      setTablekey(tablekey + 1);
    });
  };

  // on tab
  useEffect(() => {
    if (tab) {
      if (hasData(allRules)) {
        if (tab === RULETAB.ALL) {
          //set to myRules/allRules based on tab. Replace with indexed DB? Maybe not necessary to store?
          setData(allRules);
        } else {
          setData(myRules);
        }
        setTablekey(tablekey + 1);
      } else {
        fetchTableData();
      }
    }
  }, [tab]);

  // on load
  useEffect(() => {
    titleTabCallback(`--${RULETAB.MY}`);
    const lastRule = ctx.getLookupState(unsavedRuleKey);

    if (hasData(lastRule)) {
      const flatRule = { ...lastRule.summary, query: lastRule.details, id: lastRule.id };

      setId(flatRule.id);
      setRecord(flatRule);
      triggerShowModal(flatRule, flatRule.id);
      ctx.lookupAction({ type: unsavedRuleKey, method: "delete" });
    }
  }, []);

  //For separating "myRules/allRules"
  const { getUserState } = useContext(UserContext);
  const isLoggedinUser = userId => {
    const loggedinUser = getUserState();
    return loggedinUser.userId === userId;
  };

  const tabs = (
    <Tabs defaultActiveKey={RULETAB.MY} id="qrTabs" className="gtas-tabs">
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

  return (
    <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.RULEMGR]}>
      <Main className="full bg-white">
        <Title
          title={<Xl8 xid="rul006">Rules</Xl8>}
          key="title"
          leftChild={tabs}
          leftCb={titleTabCallback}
        ></Title>
        <Table
          data={data}
          callback={cb}
          header={header}
          key={tablekey}
          enableColumnFilter={true}
          exportFileName={
            tab === RULETAB.ALL ? EXPORTFILENAME.RULE.ALL : EXPORTFILENAME.RULE.MYRULES
          }
        ></Table>
        <Fab
          icon={<i className="fa fa-plus nospin" />}
          variant="info"
          onClick={triggerShowModal}
        ></Fab>

        <QRModal
          show={showModal}
          onHide={closeModal}
          callback={modalCb}
          mode={QR.RULE}
          key={modalKey}
          data={record}
          title={modalTitle}
          id={id}
          service={rule}
        />
      </Main>
    </RoleAuthenticator>
  );
};

export default Rules;

import React, { useState, useEffect } from "react";
import Table from "../../../components/table/Table";
import Title from "../../../components/title/Title";
import Main from "../../../components/main/Main";
import Modal from "../../../components/modal/Modal";
import { Button, Tabs, Tab, Row } from "react-bootstrap";
import { navigate } from "@reach/router";

import { wlpax, wldocs, watchlistcats } from "../../../services/serviceWrapper";
import { hasData } from "../../../utils/utils";
import WLModal from "./WLModal";
import "./Watchlist.css";
import "./constants.js";
import CSVReader from "../../../components/CSVReader/CSVReader";

const Watchlist = props => {
  const cb = function(result) {};
  const TAB = { PAX: ["pax", "Passenger"], DOX: ["dox", "Document"] };
  const mode = (props.mode || "").toLowerCase();
  const isDox = mode === TAB.DOX[0];

  const [showModal, setShowModal] = useState(false);
  const [showMiniModal, setShowMiniModal] = useState(false);
  const [id, setId] = useState(0);
  const [key, setKey] = useState(0);
  const [data, setData] = useState();
  const [wlcatData, setWlcatData] = useState([]);
  const [editRow, setEditRow] = useState({});
  const [tab, setTab] = useState(isDox ? TAB.DOX : TAB.PAX); // default to pax when no param is in the uri

  const handleImportData = results => {
    const keys = {
      "First Name": "firstName",
      "Last Name": "lastName",
      DOB: "dob",
      Category: "categoryId",
      "Document Number": "documentNumber",
      "Document Type": "documentType"
    };

    const service = isDox ? wldocs : wlpax;
    const importedWl = { action: "Create", id: null, wlItems: [] };
    results.forEach(result => {
      const item = {};

      for (let key in result.data) {
        const newKey = keys[key];

        item[newKey] = result.data[key];
      }
      const catLabel = item["categoryId"];
      item["categoryId"] = (wlcatData.find(item => item.label === catLabel) || {}).id;
      if (item["dob"]) item["dob"].replace("/", "-"); //the rule engine throws error for date formated mm/dd/yyyy
      importedWl.wlItems.push(item);
    });

    service.post(importedWl).then(res => {
      setKey(key + 1); //refresh table
    });
  };

  const button = (
    <Row>
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
        {`Add ${tab[1]}`}
      </Button>
      <CSVReader callback={handleImportData} />
    </Row>
  );

  const launchModal = recordId => {
    setId(recordId);
    setShowModal(true);
  };

  const closeModal = ev => {
    setId(0);
    setEditRow({});
    setShowModal(false);

    if (ev === "SUCCESS") fetchData();
  };

  const launchMiniModal = recordId => {
    setId(recordId);
    setShowMiniModal(true);
  };

  const closeMiniModal = status => {
    setShowMiniModal(false);

    if (status === "Delete") {
      wlpax.del(id).then(res => {
        if (!hasData(wlcatData)) getCats();
        else fetchData();
      });
    }
    setId(0);
  };

  const tabs = (
    <Tabs defaultActiveKey={tab[0]} id="wlTabs">
      <Tab eventKey={TAB.PAX[0]} title={TAB.PAX[1]}></Tab>
      <Tab eventKey={TAB.DOX[0]} title={TAB.DOX[1]}></Tab>
    </Tabs>
  );

  const titleTabCallback = ev => {
    // only respond to tab click events. Clicking the header button has no effect.
    // Could also create separate callbacks for the left and right children in the title comp.
    if (ev.length === 0) return;

    const id = ev.split("-")[2];
    const newTab = (id || "").toLowerCase() === TAB.DOX[0] ? TAB.DOX : TAB.PAX;

    setTab(newTab);
    navigate(`/gtas/tools/watchlist/${newTab[0]}`);
  };

  /**
   * refetch data when the tab changes, but after fetching the watchlist cat.
   * Later we can cache the results and poll to refresh on a timer. Ultimately we should create a single watchlist fetch
   * and filter the results for each tab type. This is OK for now.
   */
  useEffect(() => {
    if (!hasData(wlcatData)) return;

    fetchData();
  }, [tab, wlcatData]);

  // fetch the wl cats on page load.
  useEffect(() => {
    getCats();
  }, []);

  const getCats = () => {
    watchlistcats.get().then(res => {
      setWlcatData(res);
    });
  };

  // Grab the value for the term whose field equals the name param.
  // So if coll.terms = [{"field": "examplename", "value": "examplevalue"}, {"field": "othername", "value": "othervalue"}]
  // getPropertyVal(coll, "examplename") returns "examplevalue"
  const getPropertyVal = (coll, name) => {
    return (coll.terms.filter(term => term.field === name)[0] || {}).value;
  };

  const fetchData = () => {
    const service = tab[0] === TAB.DOX[0] ? wldocs : wlpax;

    service.get().then(res => {
      let parsed = [];

      // Backend is sending us an object meant for running rules on the backend, which is just wrong.
      // so until we refactor that code, we have to filter through all the data we don't need here
      // and restructure it as a flat object. See #45.
      if (hasData(res)) {
        parsed = res.map(item => {
          const firstName = getPropertyVal(item, "firstName");
          const lastName = getPropertyVal(item, "lastName");
          const dob = getPropertyVal(item, "dob");
          const categoryId = getPropertyVal(item, "categoryId");
          const documentType = getPropertyVal(item, "documentType");
          const documentNumber = getPropertyVal(item, "documentNumber");
          const category = (wlcatData.find(item => item.id == categoryId) || {}).label; // allow coersion. item.id is an int, categoryId is a string.

          //TODO: consolidate pax/doc fetches??
          if (tab[0] === TAB.PAX[0])
            return {
              id: item.id,
              firstName: firstName,
              lastName: lastName,
              dob: dob,
              categoryId: categoryId,
              category: category
            };

          return {
            id: item.id,
            documentNumber: documentNumber,
            documentType: documentType,
            categoryId: categoryId,
            category: category
          };
        });
      }

      setData(parsed);
      setKey(key + 1);
    });
  };

  const doxHeader = [
    {
      Accessor: "id",
      Header: "Edit",
      disableExport: true,
      Cell: ({ row }) => (
        <div className="icon-col">
          <i
            className="fa fa-pencil-square-o qbrb-icon"
            onClick={() => {
              launchModal(row.original.id);
              setEditRow(row.original);
            }}
          ></i>
        </div>
      )
    },
    { Accessor: "documentType" },
    { Accessor: "documentNumber" },
    { Accessor: "category" },
    {
      Accessor: "delete",
      Header: "Delete",
      disableExport: true,
      Cell: ({ row }) => (
        <div className="icon-col">
          <i
            className="fa fa-remove qbrb-icon-black"
            onClick={() => {
              launchMiniModal(row.original.id);
            }}
          ></i>
        </div>
      )
    }
  ];

  const paxHeader = [
    {
      Accessor: "id",
      Header: "Edit",
      disableExport: true,
      Cell: ({ row }) => (
        <div className="icon-col">
          <i
            className="fa fa-pencil-square-o qbrb-icon"
            onClick={() => {
              launchModal(row.original.id);
              setEditRow(row.original);
            }}
          ></i>
        </div>
      )
    },
    { Accessor: "firstName" },
    { Accessor: "lastName" },
    { Accessor: "dob", Header: "DOB" },
    { Accessor: "category" },
    {
      Accessor: "delete",
      Header: "Delete",
      disableExport: true,
      Cell: ({ row }) => (
        <div className="icon-col">
          <i
            className="fa fa-remove qbrb-icon-black"
            onClick={() => {
              launchMiniModal(row.original.id);
            }}
          ></i>
        </div>
      )
    }
  ];

  const header = tab[0] === TAB.DOX[0] ? doxHeader : paxHeader;
  const wlType = tab[0] === TAB.DOX[0] ? "document" : "passenger";
  const deleteText = {
    message: "Are you sure you want to delete the record?",
    title: "Delete Confirmation",
    style: "danger"
  };

  return (
    <Main className="full">
      <Title
        title="Watchlists"
        leftChild={tabs}
        leftCb={titleTabCallback}
        rightChild={button}
      ></Title>
      <Table
        data={data}
        key={key}
        id={tab[0]}
        header={header}
        callback={cb}
        exportFileName={`watchlists-${wlType}`}
      ></Table>
      <Modal
        show={showMiniModal}
        onHide={closeMiniModal}
        data={deleteText}
        submittext="Delete"
        closetext="Cancel"
      ></Modal>
      <WLModal
        type={tab}
        show={showModal}
        onHide={closeModal}
        callback={cb}
        data={editRow}
        categories={wlcatData}
        id={id}
      />
    </Main>
  );
};

export default Watchlist;

import React, { useState, useEffect, useRef } from "react";
import Table from "../../../components/table/Table";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import { Button, Tabs, Tab, Row, DropdownButton, Dropdown } from "react-bootstrap";
import { wlpax, wldocs, hitcats } from "../../../services/serviceWrapper";
import { hasData } from "../../../utils/utils";
import WLModal from "./WLModal";
import "./constants.js";
import CSVReader from "../../../components/CSVReader/CSVReader";
import Toast from "../../../components/toast/Toast";
import Confirm from "../../../components/confirmationModal/Confirm";
import "./Watchlist.css";

const Watchlist = props => {
  const cb = function(result) {};
  const TAB = { PAX: "passenger", DOX: "document" };
  const mode = (props.mode || "").toLowerCase();
  const isDox = mode === TAB.DOX;
  const importRef = useRef(null);
  const [file, setFile] = useState();

  const [showModal, setShowModal] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [id, setId] = useState(0);
  const [key, setKey] = useState(0);
  const [data, setData] = useState();
  const [wlcatData, setWlcatData] = useState([]);
  const [editRow, setEditRow] = useState({});
  const [tab, setTab] = useState(isDox ? TAB.DOX : TAB.PAX); // default to pax when no param is in the uri
  const [buttonTypeText, setButtonTypeText] = useState(); // default to pax when no param is in the uri
  const [showToast, setShowToast] = useState(false);
  const [toastHeader, setToastHeader] = useState();
  const [toastContent, setToastContent] = useState();
  const [toastVariant, setToastVariant] = useState();

  const deleteText = {
    message: <Xl8 xid="wl005">Are you sure you want to delete the record?</Xl8>,
    title: <Xl8 xid="wl006">Delete Confirmation</Xl8>,
    style: "danger"
  };

  const handleImportData = results => {
    const keys = {
      "First Name": "firstName",
      "Last Name": "lastName",
      DOB: "dob",
      Category: "categoryId",
      "Document Number": "documentNumber",
      "Document Type": "documentType"
    };

    const service = tab === TAB.DOX ? wldocs : wlpax;
    const importedWl = { action: "Create", id: null, wlItems: [] };
    results.forEach(result => {
      const item = {};

      for (let key in result.data) {
        const newKey = keys[key];

        item[newKey] = result.data[key];
      }
      const catLabel = item["categoryId"];
      item["categoryId"] = (wlcatData.find(item => item.label === catLabel) || {}).id;
      if (item["dob"]) item["dob"].replaceAll("/", "-"); //the rule engine throws error for date formated mm/dd/yyyy
      importedWl.wlItems.push(item);
    });

    service.post(importedWl).then(res => {
      if (res.status === "SUCCESS") {
        fetchData(); //get latest dataa
        setToastHeader("Watchlist");
        setToastVariant("success");
        setToastContent(`${importedWl.wlItems.length} ${tab} watchlist items imported`);
        setShowToast(true);
      }
    });
  };

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

  const launchImport = file => {
    if (importRef.current) {
      setFile(file);
      importRef.current.open(file);
    }
  };

  const deleteWatchlistItem = wlId => {
    const service = wlpax;
    service.del(wlId).then(res => {
      if (!hasData(wlcatData)) getCats();
      else fetchData();
    });
  };

  const getDeleteColumData = id => {
    return (
      <Confirm header={deleteText.title} message={deleteText.message}>
        {confirm => (
          <div className="icon-col">
            <i
              className="fa fa-remove qbrb-icon-black"
              onClick={confirm(() => deleteWatchlistItem(id))}
            ></i>
          </div>
        )}
      </Confirm>
    );
  };

  const getEditRowData = item => {
    return (
      <div className="icon-col">
        <i
          className="fa fa-pencil-square-o table-icon"
          onClick={() => {
            launchModal(item.id);
            setEditRow(item);
          }}
        ></i>
      </div>
    );
  };

  const tabs = (
    <Tabs defaultActiveKey={tab} id="wlTabs">
      <Tab
        eventKey={TAB.PAX}
        title={
          <Xl8 xid="wl001" id="wlTabs-tab-passenger">
            Passenger
          </Xl8>
        }
      ></Tab>
      <Tab
        eventKey={TAB.DOX}
        title={
          <Xl8 xid="wl002" id="wlTabs-tab-document">
            Document
          </Xl8>
        }
      ></Tab>
    </Tabs>
  );

  const titleTabCallback = ev => {
    // only respond to tab click events. Clicking the header button has no effect.
    // Could also create separate callbacks for the left and right children in the title comp.
    if (ev.length === 0) return;

    const id = ev.split("-")[2];
    const newTab = (id || "").toLowerCase() === TAB.PAX ? TAB.PAX : TAB.DOX;

    setTab(newTab);
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

  useEffect(() => {
    tab === TAB.PAX
      ? setButtonTypeText(<Xl8 xid="wl004">Add Passenger</Xl8>)
      : setButtonTypeText(<Xl8 xid="wl003">Add Document</Xl8>);
  }, [tab]);

  // fetch the wl cats on page load.
  useEffect(() => {
    getCats();
  }, []);

  const getCats = () => {
    hitcats.get().then(res => {
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
    const service = tab === TAB.DOX ? wldocs : wlpax;

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
          if (tab === TAB.PAX)
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
      Xl8: true,
      Header: ["edit001", "Edit"],
      disableExport: true,
      disableSortBy: true,
      Cell: ({ row }) => getEditRowData(row.original)
    },
    { Accessor: "documentType", Xl8: true, Header: ["wl011", "Document Type"] },
    { Accessor: "documentNumber", Xl8: true, Header: ["wl012", "Document Number"] },
    { Accessor: "category", Xl8: true, Header: ["wl013", "Category"] },
    {
      Accessor: "delete",
      Xl8: true,
      Header: ["wl014", "Delete"],
      disableExport: true,
      Cell: ({ row }) => getDeleteColumData(row.original.id)
    }
  ];

  const paxHeader = [
    {
      Accessor: "id",
      Xl8: true,
      disableExport: true,
      disableSortBy: true,
      Header: ["edit001", "Edit"],
      Cell: ({ row }) => getEditRowData(row.original)
    },
    { Accessor: "firstName", Xl8: true, Header: ["wl015", "First Name"] },
    { Accessor: "lastName", Xl8: true, Header: ["wl016", "Last Name"] },
    { Accessor: "dob", Xl8: true, Header: ["wl016", "DOB"] },
    { Accessor: "category", Xl8: true, Header: ["wl017", "Category"] },
    {
      Accessor: "delete",
      Xl8: true,
      disableExport: true,
      Header: ["wl014", "Delete"],
      Cell: ({ row }) => getDeleteColumData(row.original.id)
    }
  ];

  const header = tab === TAB.DOX ? doxHeader : paxHeader;
  const wlType = tab;

  const dropdown = (
    <DropdownButton variant="info" title={<Xl8 xid="manu002">Choose Action</Xl8>}>
      <Dropdown.Item as="button" onClick={() => launchModal(0)}>
        {buttonTypeText}
      </Dropdown.Item>
      <Dropdown.Item as="button" onClick={e => launchImport(e)}>
        <CSVReader ref={importRef} callback={handleImportData} file={file} />
      </Dropdown.Item>
    </DropdownButton>
  );

  return (
    <Main className="full bg-white">
      <Title
        title={<Xl8 xid="wl007">Watchlists</Xl8>}
        leftChild={tabs}
        leftCb={titleTabCallback}
        rightChild={dropdown}
        key={tab}
      ></Title>
      <Table
        data={data}
        key={key}
        header={header}
        callback={cb}
        exportFileName={`watchlists-${wlType}`}
      ></Table>
      <WLModal
        type={tab}
        show={showModal}
        onHide={closeModal}
        callback={cb}
        data={editRow}
        categories={wlcatData}
        id={id}
      />
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        header={toastHeader}
        body={toastContent}
        variant={toastVariant}
      />
    </Main>
  );
};

export default Watchlist;

import React, { useEffect, useState } from "react";
import { attachment } from "../../../services/serviceWrapper";
import "./UploadAttachment.scss";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Table from "../../../components/table/Table";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import Confirm from "../../../components/confirmationModal/Confirm";
import AttachmentModal from "./AttachmentModal";
import { ACTION } from "../../../utils/constants";

const UploadAttachment = props => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [filesForDisplay, setFilesForDisplay] = useState([]);
  const [tableKey, setTableKey] = useState(0);
  const [refreshDataKey, setRefreshDataKey] = useState(0);
  const [data, setData] = useState([{}]);
  const [showModal, setShowModal] = useState(false);
  const paxId = props.paxId;

  const cb = (status, resp) => {
    if (status !== ACTION.CLOSE && status !== ACTION.CANCEL)
      setRefreshDataKey(refreshDataKey + 1);
  };

  const deleteAttachment = row => {
    attachment.del(row.id).then(resp => {
      setRefreshDataKey(refreshDataKey + 1);
    });
  };

  const downloadAttachment = row => {
    attachment.get.download(row.id);
  };

  useEffect(() => {
    const listItems = [];
    if (selectedFiles != null && typeof selectedFiles != "undefined") {
      for (var x = 0; x < selectedFiles.length; x++) {
        listItems.push(selectedFiles[x]);
      }
    }
    setFilesForDisplay(listItems);
  }, [selectedFiles]);

  useEffect(() => {
    attachment.get.getAllAttachmentsMeta(paxId).then(resp => {
      setData(resp);
      setTableKey(tableKey + 1);
    });
  }, [refreshDataKey]);

  const headers = [
    {
      Accessor: "Actions",
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) => {
        return (
          <div className="text-center edit-user">
            <DropdownButton
              variant="outline-info"
              title={<Xl8 xid="att011">Choose Action</Xl8>}
            >
              <Confirm
                header={<Xl8 xid="att01">Confirm Attachment Deletion</Xl8>}
                message={
                  <div>
                    <Xl8 xid="att02">Please confirm attachment deletion for file:</Xl8>
                    {row.original.filename}
                  </div>
                }
              >
                {confirm => (
                  <Dropdown.Item
                    as="button"
                    onClick={confirm(() => {
                      deleteAttachment(row.original);
                    })}
                  >
                    <Xl8 xid="att03">Delete Attachment</Xl8>
                  </Dropdown.Item>
                )}
              </Confirm>
              <Dropdown.Item as="button" onClick={() => downloadAttachment(row.original)}>
                <Xl8 xid="att04">Download File</Xl8>
              </Dropdown.Item>
            </DropdownButton>
          </div>
        );
      }
    },
    { Accessor: "filename", Xl8: true, Header: ["att005", "File Name"] },
    { Accessor: "contentType", Xl8: true, Header: ["att006", "File Type"] },
    { Accessor: "description", Xl8: true, Header: ["att007", "Description"] }
  ];

  const button = (
    <Button
      variant="ternary"
      className="btn btn-outline-info"
      name="Add Attachment"
      onClick={() => {
        setShowModal(true);
      }}
      required={props.required}
      value={props.inputVal}
      alt={props.alt}
    >
      <Xl8 xid="att008">Add an Attachment</Xl8>
    </Button>
  );

  return (
    <div className="container">
      <main>
        <Title title={<Xl8 xid="att009">Uploaded Attachments</Xl8>} rightChild={button} />
        <Table
          data={data}
          id="attachments"
          header={headers}
          key={tableKey}
          callback={cb}
        />
        <AttachmentModal
          show={showModal}
          callback={cb}
          onHide={() => setShowModal(false)}
          title={<Xl8 xid="att010">Upload Attachments</Xl8>}
          paxId={paxId}
        ></AttachmentModal>
      </main>
    </div>
  );
};

export default UploadAttachment;

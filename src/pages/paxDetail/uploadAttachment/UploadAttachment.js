import React, {useEffect, useState} from "react";
import {attachment} from "../../../services/serviceWrapper";
import "./UploadAttachment.scss";
import Title from "../../../components/title/Title";
import Table from "../../../components/table/Table";
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import Confirm from "../../../components/confirmationModal/Confirm";
import AttachmentModal from "./AttachmentModal";
import {ACTION} from "../../../utils/constants";

const UploadAttachment = props => {
    const [selectedFiles,setSelectedFiles] = useState(null);
    const [filesForDisplay, setFilesForDisplay] = useState([]);
    const [tableKey, setTableKey] = useState(0);
    const [refreshDataKey, setRefreshDataKey] = useState(0);
    const [data, setData] = useState([{}]);
    const [showModal, setShowModal] = useState(false);
    const paxId = props.paxId;

    const cb = (status, resp) => {
        if (status !== ACTION.CLOSE && status !== ACTION.CANCEL) setRefreshDataKey(refreshDataKey+1);
    }

    const deleteAttachment = (row) => {
        console.log(row);
        attachment.del(row.id).then(resp =>{
            setRefreshDataKey(refreshDataKey+1);
        })
    };

    const downloadAttachment = (row) => {
        console.log(row);
        attachment.get.download(row.id);
    };

    const maxFileSelect= ev =>{
        let files = ev.target.files // create file object
        if (files.length > 4) {
            const msg = 'Only 4 files may be uploaded at a time';
            ev.target.value = null // discard selected file
            console.log(msg)
            return false;
        }
        return true;
    };

    const maxFileSize= ev =>{
        let files = ev.target.files
        let size = 15000
        let err = "";
        for(var x = 0; x<files.length; x++) {
            if (files[x].size > size) {
                err += files[x].type+' exceeds file size limit \n';
            }
        };
        if (err !== '') {
            ev.target.value = null
            console.log(err)
            return false
        }
        return true;
    };

    useEffect(() => {
        console.log("Testing files");
        const listItems = [];
        if (selectedFiles != null && typeof selectedFiles != "undefined") {
            for (var x = 0; x < selectedFiles.length; x++) {
                listItems.push(selectedFiles[x]);
            }
        }
        setFilesForDisplay(listItems);
    }, [selectedFiles]);

    useEffect( ()=>{
        attachment.get.getAllAttachmentsMeta(paxId).then(resp =>{
            setData(resp);
            setTableKey(tableKey+1);
        });
    },[refreshDataKey]);

    const headers = [
        {
            Accessor: "Actions",
            disableFilters: true,
            disableSortBy: true,
            Cell: ({ row }) => {return (
            <div className="text-center edit-user">
                <DropdownButton variant="outline-info" title="Choose Action">
                    <Confirm
                        header="Confirm Attachment Deletion"
                        message={`Please confirm to delete an attachment with File Name: ${row.original.filename}`}
                    >
                        {confirm => (
                            <Dropdown.Item
                                as="button"
                                onClick={confirm(() => {
                                    deleteAttachment(row.original);
                                })}
                            >
                                Delete Attachment
                            </Dropdown.Item>
                        )}
                    </Confirm>
                    <Dropdown.Item as="button" onClick={() => downloadAttachment(row.original)}>
                        Download File
                    </Dropdown.Item>
                </DropdownButton>
            </div>
        );}
        },
        { Accessor: "filename", Header: "File Name" },
        { Accessor: "contentType", Header: "File Type" },
        { Accessor: "description", Header: "Description" }
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
            Add An Attachment
        </Button>
    );

    return (
       <div className="container">
           <main>
               <Title
                   title="Uploaded Attachments"
                   rightChild={button}
               />
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
                   title="Upload Attachment"
                   paxId={paxId}
               ></AttachmentModal>
           </main>
       </div>
    );
};

export default UploadAttachment;

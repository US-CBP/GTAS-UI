import React, {useEffect, useState} from "react";
import {attachment} from "../../../services/serviceWrapper";
import "./UploadAttachment.scss";
import Title from "../../../components/title/Title";
import Table from "../../../components/table/Table";

const UploadAttachment = props => {
    const cb = function(result) {};
    const [selectedFiles,setSelectedFiles] = useState(null);
    const [filesForDisplay, setFilesForDisplay] = useState([]);
    const [tableKey, setTableKey] = useState(0);
    const [refreshDataKey, setRefreshDataKey] = useState(0);
    const [data, setData] = useState([{}]);
    const userName = "admin"; //TEST VALUE
    const description = "Test Description"; //multi import creates problems with this
    const paxId = props.paxId;

    const processFiles = ev => {
        console.log(selectedFiles);
        const formData = new FormData();
        for(var x = 0; x<selectedFiles.length; x++){
            formData.append("file", selectedFiles[0]);
        }
        formData.append("desc", description);
        formData.append("paxId", paxId);
        upload(formData);
    };

    const onChangeCb = ev => {
        console.log(ev.target.files);
        if(maxFileSelect(ev) && maxFileSize) {
            setSelectedFiles(ev.target.files);
        }
    };

    const upload = (formData) => {
        attachment.post(formData).then(resp => {
            console.log(resp)
            setSelectedFiles(null);
            setRefreshDataKey(refreshDataKey+1);
        });
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
    }

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
    }

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
        { Accessor: "filename", Header: "File Name" },
        { Accessor: "contentType", Header: "File Type" },
        { Accessor: "description", Header: "Description" }
    ];

    return (
       <div className="container">
           <div className="row">
               <div className ="offset-md-3 col-md-6">
                       <div className="form-group files">
                           <label>Upload Your File</label>
                           <input type="file" className="form-control" multiple onChange={onChangeCb}/>
                        </div>
                       <button type="button" className="btn btn-sm" onClick={processFiles}>Upload</button>
                </div>
           </div>
           {selectedFiles != null && !selectedFiles.empty ? (
                <div className="container">
                   Files To Be Uploaded:
                    {filesForDisplay.map(data =>{
                        return <ul> <u>File Name:</u> {data.name}  <u>File Size:</u> {data.size} kbs </ul>;
                    })}
               </div>
           ) : ( <div></div>) }
           <main>
               <Title
                   title="Uploaded Attachments"
               />
               <Table
                   data={data}
                   id="attachments"
                   header={headers}
                   key={tableKey}
                   callback={cb}
               />
           </main>
       </div>

    );
};

export default UploadAttachment;

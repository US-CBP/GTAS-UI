import React, {useState} from "react";
import { attachment } from "../../../services/serviceWrapper";
import "./UploadAttachment.scss";
import { Button } from "react-bootstrap";

const UploadAttachment = props => {
    const [selectedFile,setSelectedFile] = useState(null);
    const userName = "admin"; //TEST VALUE
    const description = "Test Description"; //multi import creates problems with this
    const paxId = props.paxId;
    const password = "password";

    const processFiles = ev => {
        console.log(selectedFile);
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("desc", description);
        formData.append("username", userName);
        formData.append("password", password);
        formData.append("paxId", paxId);
        upload(formData);
    };

    const onChangeCb = ev => {
        console.log(ev.target.files);
        setSelectedFile(ev.target.files[0]);
    };

    const upload = (formData) => {
        const fileBody = {
            file : selectedFile,
            userName : userName,
            desc : description,
            paxId : paxId
        };
        attachment.post(formData);
    };

    return (
       <div class="container">
           <div class="row">
               <div class ="offset-md-3 col-md-6">
                       <div class="form-group files">
                           <label>Upload Your File</label>
                           <input type="file" class="form-control" onChange={onChangeCb}/>
                        </div>
                       <button type="button" class="btn btn-sm" onClick={processFiles}>Upload</button>
                </div>
           </div>
       </div>
    );
};

export default UploadAttachment;

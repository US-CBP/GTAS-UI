import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import Overlay from "../../../components/overlay/Overlay";
import { attachment } from "../../../services/serviceWrapper";
import { ACTION } from "../../../utils/constants";
import { hasData, isShortText, getShortText, formatBytes } from "../../../utils/utils";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../components/modal/Modal";
import "./UploadAttachment.scss";

const AttachmentModal = props => {
  const cb = function(result) {};
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filesForDisplay, setFilesForDisplay] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [variant, setVariant] = useState("");
  const paxId = props.paxId;

  const handleClose = (status, res) => {
    setShowModal(false);
    setShowAlert(false);
    setSelectedFiles([]);
    props.callback(status, res);
  };
  const handleShow = () => setShowModal(true);

  const postSubmit = (status, resp) => {
    if (status === ACTION.CANCEL) {
      handleClose();
    } else {
      if (resp.status === "SUCCESS") {
        handleClose(status, resp);
      } else {
        setVariant("danger");
        typeof resp.message != "undefined" && resp.message != null
          ? setAlertContent(resp.message)
          : setAlertContent("There was an issue with the server for that request.");
        setShowAlert(true);
        setSelectedFiles([]);
      }
    }
  };

  const toFileArray = filelist => {
    let result = [];
    for (let x = 0; x < selectedFiles.length; x++) {
      result.push(selectedFiles[x]);
    }
    return result;
  };

  const onChangeCb = ev => {
    if (maxFileSelect(ev) && maxFileSize) {
      setFilesForDisplay(toFileArray(ev.target.files));
      setSelectedFiles(ev.target.files);
    }
  };

  const maxFileSelect = ev => {
    let files = ev.target.files; // create file object
    if (files.length > 4) {
      const msg = "Only 4 files may be uploaded at a time";
      ev.target.value = null; // discard selected file
      return false;
    }
    return true;
  };

  const maxFileSize = ev => {
    let files = ev.target.files;
    let size = 15000;
    let err = "";
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err += files[x].type + " exceeds file size limit \n";
      }
    }
    if (err !== "") {
      ev.target.value = null;
      return false;
    }
    return true;
  };

  const preSubmit = fields => {
    let res = { ...fields[0] };
    if (typeof selectedFiles != "undefined" && selectedFiles != null) {
      let desc = [];
      const formData = new FormData();
      for (let x = 0; x < selectedFiles.length; x++) {
        formData.append("file", selectedFiles[x]);
        desc.push(res.description);
      }
      formData.append("descriptions", desc);
      formData.append("paxId", paxId);
      return [formData];
    }
  };

  useEffect(() => {
    const listItems = toFileArray(selectedFiles);
    setFilesForDisplay(listItems);
  }, [selectedFiles]);

  return (
    <>
      <div onClick={handleShow}>{props.children}</div>

      <Modal
        show={showModal}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="max-600-width-container"
      >
        <ModalHeader closeButton>
          <ModalTitle>
            <Xl8 xid="attm001">Attachments</Xl8>
          </ModalTitle>
        </ModalHeader>
        <Alert show={showAlert} variant={variant}>
          {alertContent}
          <hr />
          <Button onClick={() => setShowAlert(false)} variant="outline-success">
            <Xl8 xid="form003">Confirm</Xl8>
          </Button>
        </Alert>
        <ModalBody>
          <div className="container attachment-files">
            <Xl8 xid="attm002">Files (4 max)</Xl8>
            <div className="files">
              <input type="file" multiple onChange={onChangeCb} />
            </div>
          </div>

          <div className="container attachment-data">
            {filesForDisplay.map((data, index) => {
              const content = data.name;
              const triggerOverlay = !isShortText(content, 35);

              return (
                <Overlay
                  trigger={triggerOverlay ? ["click", "hover"] : ""}
                  key={data.name}
                  content={content}
                >
                  <div className={triggerOverlay ? "as-info" : ""}>
                    <span>{getShortText(content, 35)}</span>
                    <span className="attachment-size">{formatBytes(data.size)}</span>
                  </div>
                </Overlay>
              );
            })}
          </div>
          <div className="attachment-form-container">
            <Form
              submitService={attachment.post}
              title=""
              callback={postSubmit}
              action="add"
              paramCallback={preSubmit}
              cancellable
            >
              <LabelledInput
                datafield="description"
                inputType="textarea"
                labelText={<Xl8 xid="attm006">Description</Xl8>}
                name="description"
                required={true}
                alt="nothing"
                callback={cb}
              />
            </Form>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AttachmentModal;

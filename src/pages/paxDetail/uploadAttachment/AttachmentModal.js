import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import Overlay from "../../../components/overlay/Overlay";
import ErrorText from "../../../components/errorText/ErrorText";
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
  const [showModal, setShowModal] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const paxId = props.paxId;
  const fileUploadLimit = 4;
  const maxHoverContentLength = 35;

  const handleClose = (status, res) => {
    setShowModal(false);
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
        const serverError = (
          <Xl8 xid="attm003">Server Error: the request could not be completed</Xl8>
        );

        setAlertContent(resp?.message || serverError);
        setSelectedFiles([]);
      }
    }
  };

  const toFileArray = filelist => {
    let result = [];
    for (let x = 0; x < filelist.length; x++) {
      result.push(filelist[x]);
    }
    return result;
  };

  const onChangeCb = ev => {
    const files = ev.target.files;
    if (isCountValid(files) && isSizeValid(files)) {
      setFilesForDisplay(toFileArray(files));
      setSelectedFiles(files);
    } else {
      ev.target.value = null;
    }
  };

  const isCountValid = files => {
    setAlertContent(<Xl8 xid="attm007">Too many files were selected</Xl8>);
    return files.length <= fileUploadLimit;
  };

  const isSizeValid = files => {
    let fiveMb = 5242880;
    let isValid = true;

    for (var x = 0; x < files.length; x++) {
      if (files[x].size > fiveMb) {
        isValid = false;
        setAlertContent(<Xl8 xid="attm007">The file size limit is 5Mb per file</Xl8>);
      }
    }

    return isValid;
  };

  const preSubmit = fields => {
    let res = { ...fields[0] };
    if (hasData(selectedFiles)) {
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
    setAlertContent();
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
        <ModalBody>
          <div className="container attachment-files">
            <div className="attachment-files-title">
              <Xl8 xid="attm002">Files (4 max)</Xl8>
              <ErrorText message={alertContent}></ErrorText>
            </div>
            <div className="files">
              <input type="file" multiple onChange={onChangeCb} />
            </div>
          </div>

          <div className="container attachment-data">
            {filesForDisplay.map((data, index) => {
              const content = data.name;
              const triggerOverlay = !isShortText(content, maxHoverContentLength);

              return (
                <Overlay
                  trigger={triggerOverlay ? ["click", "hover"] : ""}
                  key={data.name}
                  content={content}
                >
                  <div className={triggerOverlay ? "as-info" : ""}>
                    <span>{getShortText(content, maxHoverContentLength)}</span>
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

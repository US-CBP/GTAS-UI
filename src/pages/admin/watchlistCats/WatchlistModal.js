import React from "react";
import { Modal, Button, Container } from "react-bootstrap";
import Form from "../../../components/form/Form";
import { watchlistcatspost } from "../../../services/serviceWrapper";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { ACTION } from "../../../utils/constants";

const WatchlistModal = props => {
  const title = "Watchlist Category";
  const cb = function(result) {};
  const severityLevels = [
    { value: "Top", label: "Top" },
    { value: "High", label: "High" },
    { value: "Normal", label: "Normal" }
  ];

  const postSubmit = status => {
    props.onHide();

    if (status !== ACTION.CANCEL) props.refresh();
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Form
            submitService={watchlistcatspost.post}
            callback={postSubmit}
            action="add"
            submitText="Submit"
            cancellable
            afterProcessed={props.onHide}
          >
            <LabelledInput
              datafield
              labelText="Watchlist Category Name:"
              inputType="text"
              name="label"
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText="Watchlist Category Description:"
              inputType="textarea"
              name="description"
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText="Watchlist Severity Level:"
              inputType="select"
              name="severity"
              placeholder="Choose Severity Level..."
              options={severityLevels}
              required={true}
              alt="nothing"
              callback={cb}
            />
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default WatchlistModal;

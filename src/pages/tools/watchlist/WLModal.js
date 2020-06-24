import React from "react";
import QueryBuilder from "../../../components/queryBuilder/QueryBuilder";
import { Button, Modal, Container } from "react-bootstrap";
import Form from "../../../components/form/Form";
import LabelledInput from "../../../components/labelledInput/LabelledInput";

const WLModal = props => {
  const cb = () => {
    props.onHide();
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="qbrb-modal-body">
          <Container fluid>
            <Form
              // submitService={userService.post}
              title=""
              callback={cb}
              action="add"
              // submitText="Submit"
              // paramCallback={preSubmit}
              cancellable
            >
              <LabelledInput
                datafield
                labelText="Document Type"
                inputType="select"
                name="documentType"
                // inputStyle="form-select"
                options={[
                  { value: "P", label: "Passenger" },
                  { value: "V", label: "Visa" }
                ]}
                callback={cb}
                alt="Document Type"
                spacebetween
              />

              <LabelledInput
                datafield
                labelText="Document Number"
                inputType="text"
                name="documentNumber"
                required={true}
                alt="nothing"
                callback={cb}
                spacebetween
              />

              <LabelledInput
                datafield
                labelText="Category ID"
                inputType="text"
                name="categoryId"
                required={true}
                alt="nothing"
                callback={cb}
                spacebetween
              />
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WLModal;

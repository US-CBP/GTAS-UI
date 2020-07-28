import React from "react";
import { Modal, Button, Container } from "react-bootstrap";
import Form from "../../../../components/form/Form";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { codeEditor } from "../../../../services/serviceWrapper";

const CountryModal = props => {
  const title = "Add Country";
  const cb = function(result) {};

  const postSubmit = ev => {
    props.onHide();
    props.refresh();
  };

  const preSubmit = fields => {
    let res = { ...fields[0] };
    //Id is lacking for updates in the body
    res.id = props.editRowDetails.id;
    res.originId = props.editRowDetails.originId;
    return [res];
  };

  const restoreSpecificCode = () => {
    codeEditor.put.restoreCountry(props.editRowDetails).then(res => {
      props.onHide();
      props.refresh();
    });
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
            submitService={
              props.isEdit ? codeEditor.put.updateCountry : codeEditor.post.createCountry
            }
            title=""
            callback={postSubmit}
            action="add"
            submitText={props.isEdit ? "Save" : "Submit"}
            paramCallback={preSubmit}
            afterProcessed={props.onHide}
          >
            <LabelledInput
              datafield
              labelText="ISO2:"
              inputType="text"
              name="iso2"
              required={true}
              alt="nothing"
              inputVal={props?.editRowDetails.iso2 || ""}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText="ISO3:"
              inputType="text"
              name="iso3"
              required={true}
              alt="nothing"
              inputVal={props?.editRowDetails.iso3 || ""}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText="ISO Numeric:"
              inputType="text"
              name="isoNumeric"
              required={true}
              alt="nothing"
              inputVal={props?.editRowDetails.isoNumeric || ""}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText="Name:"
              inputType="text"
              name="name"
              required={true}
              alt="nothing"
              inputVal={props?.editRowDetails.name || ""}
              callback={cb}
              spacebetween
            />
          </Form>
        </Container>
      </Modal.Body>
      {props.isEdit ? (
        <Modal.Footer>
          <Button
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={restoreSpecificCode}
          >
            Restore
          </Button>
          <Button
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={() => {
              codeEditor.delete.deleteCountry(props.editRowDetails.id).then(res => {
                postSubmit(undefined);
              });
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      ) : (
        <Modal.Footer>
          <Button variant="outline-danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CountryModal;

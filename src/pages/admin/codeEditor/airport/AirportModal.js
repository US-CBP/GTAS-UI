// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Button, Container } from "react-bootstrap";
import Form from "../../../../components/form/Form";
import Xl8 from "../../../../components/xl8/Xl8";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { ACTION } from "../../../../utils/constants";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../../components/modal/Modal";
import { codeEditor } from "../../../../services/lookupService";

const AirportModal = props => {
  const cb = () => {};
  const data = props.editRowDetails || {};
  const type = "airport";

  const postSubmit = (status = ACTION.CANCEL, results) => {
    props.onHide();

    if (status !== ACTION.CANCEL) props.refresh();
  };

  const preSubmit = fields => {
    let res = { ...fields[0] };
    //Id is lacking for updates in the body
    res.id = props.editRowDetails.id;
    res.originId = props.editRowDetails.originId;
    return [res];
  };

  const customButtons = props.isEdit
    ? [
        <Button
          type="button"
          className="m-2 outline-dark-outline"
          variant="outline-dark"
          key="restore"
          onClick={() => props.actionCallback(ACTION.UPDATE)}
        >
          <Xl8 xid="cem01">Restore</Xl8>
        </Button>,
        <Button
          type="button"
          className="m-2"
          variant="outline-danger"
          key="delete"
          onClick={() => props.actionCallback(ACTION.DELETE)}
        >
          <Xl8 xid="cem002">Delete</Xl8>
        </Button>
      ]
    : [];

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="max-500-width-container"
    >
      <ModalHeader closeButton>
        <ModalTitle>{props.title}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Container fluid>
          <Form
            submitService={
              props.isEdit
                ? body => codeEditor.put.update(type, body)
                : body => codeEditor.post(type, body)
            }
            title=""
            callback={postSubmit}
            action="add"
            paramCallback={preSubmit}
            afterProcessed={props.onHide}
            cancellable
            customButtons={customButtons}
          >
            <LabelledInput
              datafield
              labelText={<Xl8 xid="iata001">IATA: </Xl8>}
              inputtype="text"
              name="iata"
              required={true}
              alt="nothing"
              inputval={data.iata}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="icao001">ICAO: </Xl8>}
              inputtype="text"
              name="icao"
              required={true}
              alt="nothing"
              inputval={data.icao}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="airm003">Name: </Xl8>}
              inputtype="text"
              name="name"
              required={true}
              alt="nothing"
              inputval={data.name}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="airm004">City: </Xl8>}
              inputtype="text"
              name="city"
              required={true}
              alt="nothing"
              inputval={data.city}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="airm005">Country: </Xl8>}
              inputtype="text"
              name="country"
              required={true}
              alt="nothing"
              inputval={data.country}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="lati001">Latitude: </Xl8>}
              inputtype="text"
              name="latitude"
              required={true}
              alt="nothing"
              inputval={data.latitude?.toString() || ""}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="long001">Longitude: </Xl8>}
              inputtype="text"
              name="longitude"
              required={true}
              alt="nothing"
              inputval={data.longitude?.toString() || ""}
              callback={cb}
              spacebetween
            />
          </Form>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default AirportModal;

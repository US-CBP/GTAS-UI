import React, { useEffect, useState } from "react";
import { Modal, Container } from "react-bootstrap";
import Form from "../../../components/form/Form";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import Xid from "../../../components/xid/Xid";

import { wlpax, wldocs } from "../../../services/serviceWrapper";
import { hasData, asArray } from "../../../utils/utils";
import { ACTION } from "../../../utils/constants";

const WLModal = props => {
  const TAB = { PAX: ["pax", "Passenger"], DOX: ["dox", "Document"] };
  const type = (props.type || {})[0] === TAB.DOX[0] ? TAB.DOX : TAB.PAX;
  const typeXid =
    (props.type || {})[0] === TAB.DOX[0] ? (
      <Xid xid="7">Document</Xid>
    ) : (
      <Xid xid="7">Passenger</Xid>
    );
  const id = props.id || 0;
  const mode = id === 0 ? "Add" : "Edit";
  const modeXid = id === 0 ? <Xid xid="7">Add</Xid> : <Xid xid="7">Edit</Xid>;
  const title = <>modeXid typeXid</>;

  const onFormChange = () => {};

  // Form submitted or closed
  const onFormExit = (action, ev) => {
    //Currently the backend returns a success message or nothing.
    //Form inserts a message with status = "CANCELED", so the page will receive either
    // "SUCCESS", "CANCELED" or null. Need to standardize the return vals so we can pass
    // the error back to the users in the alert/modal whatever.
    // Here we will keep the modal form up if there's an error so the user can review the inputs.
    const status = ev?.status;
    if (hasData(status) || action === ACTION.CANCEL) props.onHide(status);
  };

  const categories = asArray(props.categories).map(item => {
    return { label: item.label, value: item.id };
  });

  const docTemplate = `{"@class":"gov.gtas.model.watchlist.json.WatchlistSpec","name":"Document","entity":"DOCUMENT",
    "watchlistItems":[
        {"id":{id},"action":"{action}","terms":[
            {"entity":"DOCUMENT","field":"documentType","type":"string","value":"{documentType}"},
            {"entity":"DOCUMENT","field":"documentNumber","type":"string","value":"{documentNumber}"},
            {"entity":"DOCUMENT","field":"categoryId","type":"integer","value":"{categoryId}"}
          ]}]}`;

  const paxTemplate = `{"@class":"gov.gtas.model.watchlist.json.WatchlistSpec","name":"Passenger","entity":"PASSENGER",
    "watchlistItems":[
        {"id":{id},"action":"{action}","terms":[
            {"entity":"PASSENGER","field":"firstName","type":"string","value":"{firstName}"},
            {"entity":"PASSENGER","field":"lastName","type":"string","value":"{lastName}"},
            {"entity":"PASSENGER","field":"dob","type":"date","value":"{dob}"},
            {"entity":"PASSENGER","field":"categoryId","type":"integer","value":"{categoryId}"}
          ]}]}`;

  const docFields = (
    <>
      <LabelledInput
        datafield
        labelText="Document Type"
        inputType="select"
        name="documentType"
        options={[
          { value: "P", label: "Passport" },
          { value: "V", label: "Visa" }
        ]}
        callback={onFormChange}
        alt="Document Type"
        spacebetween
      />
      <LabelledInput
        datafield
        labelText="Document Number"
        inputType="text"
        name="documentNumber"
        required={true}
        alt="Document Number"
        callback={onFormChange}
        spacebetween
      />
      <LabelledInput
        datafield
        labelText="Category ID"
        inputType="select"
        options={categories}
        name="categoryId"
        required={true}
        alt="Category ID"
        callback={onFormChange}
        spacebetween
      />
    </>
  );

  const paxFields = (
    <>
      <LabelledInput
        datafield
        labelText="First Name"
        inputType="text"
        name="firstName"
        callback={onFormChange}
        alt="First Name"
        spacebetween
      />
      <LabelledInput
        datafield
        labelText="Last Name"
        inputType="text"
        name="lastName"
        callback={onFormChange}
        alt="Last Name"
        spacebetween
      />
      <LabelledInput
        datafield
        labelText="Date of Birth"
        inputType="text"
        name="dob"
        required={true}
        alt="Date of Birth"
        callback={onFormChange}
        spacebetween
      />
      <LabelledInput
        datafield
        labelText="Category ID"
        inputType="select"
        options={categories}
        name="categoryId"
        required={true}
        alt="Category ID"
        callback={onFormChange}
        spacebetween
      />
    </>
  );

  const fields = type[0] === TAB.DOX[0] ? docFields : paxFields;
  const serviceType = type[0] === TAB.DOX[0] ? wldocs : wlpax;
  const service = mode === "Add" ? serviceType.post : serviceType.put;
  const template = type[0] === TAB.DOX[0] ? docTemplate : paxTemplate;

  const preSubmit = values => {
    if (!hasData(values[0])) return [];

    const vals = values[0];
    const documentType = vals["documentType"];
    const documentNumber = vals["documentNumber"];
    const firstName = vals["firstName"];
    const lastName = vals["lastName"];
    const dob = vals["dob"];
    const categoryId = vals["categoryId"];
    const action = mode === "Add" ? "Create" : "Update";
    const recordId = mode === "Add" ? "null" : id;

    const result = template
      .replace("{documentType}", documentType)
      .replace("{documentNumber}", documentNumber)
      .replace("{firstName}", firstName)
      .replace("{lastName}", lastName)
      .replace("{dob}", dob)
      .replace("{categoryId}", categoryId)
      .replace("{action}", action)
      .replace("{id}", recordId);

    return [JSON.parse(result)];
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
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="qbrb-modal-body">
          <Container fluid>
            <Form
              submitService={service}
              title=""
              callback={onFormExit}
              action={mode.toLowerCase()}
              paramCallback={preSubmit}
              data={props.data}
              cancellable
            >
              {fields.props.children}
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WLModal;

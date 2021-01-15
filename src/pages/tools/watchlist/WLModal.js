// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import Form from "../../../components/form/Form";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import Xl8 from "../../../components/xl8/Xl8";

import { wlpax, wldocs } from "../../../services/serviceWrapper";
import {
  hasData,
  asArray,
  watchlistDateFormat,
  timezoneFreeDate
} from "../../../utils/utils";
import { ACTION } from "../../../utils/constants";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../components/modal/Modal";
import "./Watchlist.css";

const WLModal = props => {
  const TAB = { PAX: "passenger", DOX: "document" };
  const type = (props.type || {}) === TAB.PAX ? TAB.PAX : TAB.DOX;
  const id = props.id || 0;
  const isEdit = id !== 0;
  const mode = isEdit ? "Edit" : "Add";
  const data = props.data;
  const parsedData = hasData(data) ? { ...data, dob: new Date(data["dob"]) } : data;
  const title =
    (type || {}) === TAB.DOX ? (
      id === 0 ? (
        <Xl8 xid="wlm001"> Add Document</Xl8>
      ) : (
        <Xl8 xid="wlm002"> Edit Document</Xl8>
      )
    ) : id === 0 ? (
      <Xl8 xid="wlm003"> Add Passenger</Xl8>
    ) : (
      <Xl8 xid="wlm004"> Edit Passenger</Xl8>
    );

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

  const docFields = (
    <>
      <LabelledInput
        required
        datafield
        labelText={<Xl8 xid="wlm005"> Document Type</Xl8>}
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
        required
        datafield
        labelText={<Xl8 xid="wlm006"> Document Number</Xl8>}
        inputType="text"
        name="documentNumber"
        alt="Document Number"
        callback={onFormChange}
        spacebetween
      />
      <LabelledInput
        required
        datafield
        labelText={<Xl8 xid="wlm007"> Category ID</Xl8>}
        inputType="select"
        options={categories}
        name="categoryId"
        alt="Category ID"
        callback={onFormChange}
        spacebetween
      />
    </>
  );

  const paxFields = (
    <>
      <LabelledInput
        required
        datafield
        labelText={<Xl8 xid="wlm008"> First Name</Xl8>}
        inputType="text"
        name="firstName"
        callback={onFormChange}
        alt="First Name"
        spacebetween
      />
      <LabelledInput
        required
        datafield
        labelText={<Xl8 xid="wlm009"> Last Name</Xl8>}
        inputType="text"
        name="lastName"
        callback={onFormChange}
        alt="Last Name"
        spacebetween
      />
      <LabelledInput
        required
        datafield
        labelText={<Xl8 xid="wlm010"> Date of Birth</Xl8>}
        inputType="dateTime"
        name="dob"
        alt="Date of Birth"
        callback={onFormChange}
        spacebetween
        format="MM/dd/yyyy"
        disableCalendar={true}
      />
      <LabelledInput
        datafield
        labelText={<Xl8 xid="wlm007"> Category ID</Xl8>}
        inputType="select"
        options={categories}
        name="categoryId"
        required
        alt="Category ID"
        callback={onFormChange}
        spacebetween
      />
    </>
  );

  const fields = type === TAB.DOX ? docFields : paxFields;
  const serviceType = type === TAB.DOX ? wldocs : wlpax;
  const service = isEdit ? serviceType.put : serviceType.post;

  const preSubmit = values => {
    if (!hasData(values[0])) return [];

    const vals = values[0];
    const documentType = vals["documentType"];
    const documentNumber = vals["documentNumber"];
    const firstName = vals["firstName"];
    const lastName = vals["lastName"];
    const dob = watchlistDateFormat(vals["dob"]);
    const categoryId = vals["categoryId"];
    const action = isEdit ? "Update" : "Create";
    const recordId = mode === "Add" ? "null" : id;

    const result =
      type === TAB.DOX
        ? {
            action: action,
            id: recordId,
            wlItems: [
              {
                documentType: documentType,
                documentNumber: documentNumber,
                categoryId: categoryId,
                id: recordId
              }
            ]
          }
        : {
            action: action,
            id: recordId,
            wlItems: [
              {
                firstName: firstName,
                lastName: lastName,
                dob: timezoneFreeDate(dob),
                categoryId: categoryId,
                id: recordId
              }
            ]
          };

    return [result];
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="max-600-width-container"
    >
      <ModalHeader closeButton>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Container fluid className="wl-modal">
          <Form
            submitService={service}
            title=""
            callback={onFormExit}
            action={mode.toLowerCase()}
            paramCallback={preSubmit}
            data={parsedData}
            cancellable
          >
            {fields.props.children}
          </Form>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default WLModal;

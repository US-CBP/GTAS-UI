import React, { useEffect, useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import Form from "../../../components/form/Form";
import {users, userService} from "../../../services/serviceWrapper"; //Add hooks
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import CheckboxGroup from "../../../components/inputs/checkboxGroup/CheckboxGroup";
import { asArray } from "../../../utils/utils";
import "./ManageUsers.scss";

const UserModal = props => {
  //TODO make this a service call return data
  const cb = function(result) {};

  const roles = [
    { roleId: 1, roleDescription: "Admin" },
    { roleId: 2, roleDescription: "Manage Queries" },
    { roleId: 3, roleDescription: "View Passenger" },
    { roleId: 4, roleDescription: "Manage Watch List" },
    { roleId: 5, roleDescription: "Manage Rules" },
    { roleId: 7, roleDescription: "Manage Hits" },
    { roleId: 8, roleDescription: "Manage Cases" }
  ];

  const isCheckedRole = (roleToBeChecked, activeRoles) => {
    let boolVal = false;
    activeRoles.map(activeRole => {
      if (activeRole.roleId === roleToBeChecked.roleId) {
        boolVal = true;
      }
    });
    return boolVal;
  };

  const transformRoles = roles.map(role => {
    let isChecked = false;
    if (props.isEdit) {
      isChecked = isCheckedRole(role, props.editRowDetails.roles);
    } else{ //New user generation default to having this checked
      if (role.roleId == 3){
        isChecked = true;
      }
    }

    return {
      ...role,
      label: role.roleDescription,
      key: role.roleId,
      type: "checkbox",
      checked: isChecked
    };
  });

  const rcb = {
    name: "rolesCheckboxes",
    value: transformRoles
  };

  // const optionsForEmails = ["Enabled/Disabled"];

  const postSubmit = ev => {
    props.onHide();
    props.refresh();
  };

  const preSubmit = fields => {
    let res = { ...fields[0] };

    res.roles = asArray(res.roles)
      .filter(role => role.checked)
      .map(role => {
        return { roleId: role.roleId, roleDescription: role.roleDescription };
      });

    if (res.active === true) {
      res.active = 1;
    } else {
      res.active = 0;
    }

    return [res];
  };

  const getPasswordInput = () => {
    return props.isEdit ? (
      <></>
    ) : (
      <LabelledInput
        datafield
        labelText="Password"
        inputType="password"
        name="password"
        required={true}
        alt="nothing"
        callback={cb}
        spacebetween
      />
    );
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
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Form
            submitService={props.isEdit ? users.put : users.post}
            title=""
            callback={postSubmit}
            action="add"
            submitText="Submit"
            paramCallback={preSubmit}
            cancellable
          >
            {props.isEdit ? (
              <LabelledInput
                datafield
                labelText="User ID"
                inputType="text"
                name="userId"
                required={true}
                inputVal={props?.editRowDetails.userId || ""}
                alt="nothing"
                callback={cb}
                readOnly={true}
                spacebetween
              ></LabelledInput>
            ) : (
              <LabelledInput
                datafield
                labelText="User ID"
                inputType="text"
                name="userId"
                required={true}
                inputVal={props?.editRowDetails.userId || ""}
                alt="nothing"
                callback={cb}
                spacebetween
              />
            )}

            {getPasswordInput()}

            <LabelledInput
              datafield
              labelText="First Name"
              inputType="text"
              name="firstName"
              required={true}
              inputVal={props?.editRowDetails.firstName || ""}
              alt="nothing"
              callback={cb}
              spacebetween
            />

            <LabelledInput
              datafield
              labelText="Last Name"
              inputType="text"
              name="lastName"
              required={true}
              inputVal={props?.editRowDetails.lastName || ""}
              alt="nothing"
              callback={cb}
              spacebetween
            />

            <LabelledInput
              datafield
              labelText="Email"
              inputType="email"
              name="email"
              required={true}
              inputVal={props?.editRowDetails.email || ""}
              alt="nothing"
              callback={cb}
              spacebetween
            />

            <LabelledInput
              datafield="emailEnabled"
              labelText="Enable User Email Notification"
              inputType="checkbox"
              name="emailEnabled"
              required={true}
              alt="nothing"
              inputVal={props?.editRowDetails.emailEnabled || false}
              callback={cb}
              selected={props?.editRowDetails.emailEnabled || false}
              spacebetween
            />

            <LabelledInput
              datafield
              labelText="Automated Email Notification"
              inputType="checkbox"
              name="highPriorityEmail"
              required={true}
              alt="nothing"
              inputVal={props?.editRowDetails.highPriorityEmail || false}
              callback={cb}
              selected={props?.editRowDetails.highPriorityEmail || false}
              spacebetween
            />
            {props.isEdit ? (
            <LabelledInput
              datafield
              labelText="User Is Enabled"
              inputType="checkbox"
              name="active"
              required={true}
              alt="nothing"
              inputVal={(props?.editRowDetails.active || null) === 1 ? true : false}
              callback={cb}
              selected={(props?.editRowDetails.active || null) === 1 ? true : false}
              spacebetween
            />
            ):(
            <LabelledInput
                datafield
                labelText="User Is Enabled"
                inputType="checkbox"
                name="active"
                required={true}
                alt="nothing"
                inputVal={true}
                callback={cb}
                selected={true}
                spacebetween
            />
            )}


            <div className="um-checkbox">
              <CheckboxGroup
                datafield
                inputVal={rcb.value}
                labelText="Roles"
                name="roles"
              />
            </div>
          </Form>
        </Container>
      </Modal.Body>
      {props.isEdit && (
          <Modal.Footer>
            <Button
                type="button"
                className="m-2 outline-dark-outline"
                variant="outline-dark"
                onClick={() => {
                  users.del(props.editRowDetails.userId).then(res => {
                    postSubmit(undefined);
                  });
                }}
            >
              Delete
            </Button>
          </Modal.Footer>
      )}
    </Modal>
  );
};

export default UserModal;

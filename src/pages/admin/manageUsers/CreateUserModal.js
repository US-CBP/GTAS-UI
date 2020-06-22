import React from "react";
import { Modal, Button, Container } from "react-bootstrap";
import Form from "../../../components/form/Form";
import { userService, users } from "../../../services/serviceWrapper"; //Add hooks
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import CheckboxGroup from "../../../components/inputs/checkboxGroup/CheckboxGroup";


const CreateUserModal = props => { //TODO make this a service call return data
  const title = "Create New User";
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

  const transformRoles = roles.map(roles => {
    return {
      ...roles,
      label: roles.roleDescription,
      key: roles.roleId,
      type: "checkbox",
      checked: false
    };
  });

  const rcb = {
      name: "rolesCheckboxes",
      value: transformRoles
  };

  const optionsForEmails = ["Enabled/Disabled"];

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
            submitService={userService.post}
            title=""
            callback={props.callback}
            action="add"
            submitText="Submit"
            afterProcessed={props.onHide}
          >
            <LabelledInput
              datafield
              labelText="User ID"
              inputType="text"
              name="userId"
              required={true}
              alt="nothing"
              callback={cb}
            />

            <LabelledInput
                datafield
                labelText="Password"
                inputType="password"
                name="password"
                required={true}
                alt="nothing"
                callback={cb}
            />

            <LabelledInput
                datafield
                labelText="First Name"
                inputType="text"
                name="firstName"
                required={true}
                alt="nothing"
                callback={cb}
            />

            <LabelledInput
                datafield
                labelText="Last Name"
                inputType="text"
                name="lastName"
                required={true}
                alt="nothing"
                callback={cb}
            />

            <LabelledInput
                datafield
                labelText="Email"
                inputType="email"
                name="email"
                required={true}
                alt="nothing"
                callback={cb}
            />

            <LabelledInput
                datafield ="emailEnabled"
                labelText="Enable User Email Notification"
                inputType="checkbox"
                name="emailEnabled"
                required={true}
                alt="nothing"
                inputVal={false}
                options={optionsForEmails}
                callback={cb}
            />

            <LabelledInput
                datafield="highPriorityEmail"
                labelText="Automated Email Notification"
                inputType="checkbox"
                name="highPriorityEmail"
                required={true}
                alt="nothing"
                inputVal={false}
                options={[1,2]}
                callback={cb}
            />

            <CheckboxGroup
                datafield={rcb}
                inputVal={rcb.value}
                labelText="Roles"
                name="roles"
            />

          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserModal;

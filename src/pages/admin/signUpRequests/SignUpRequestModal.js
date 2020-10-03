import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import Form from "../../../components/form/Form";
import { roles, signuprequests } from "../../../services/serviceWrapper";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { asArray } from "../../../utils/utils";
import { ROLE } from "../../../utils/constants";
import Title from "../../../components/title/Title";

function SignUpRequestModal(props) {
  const [allRoles, setAllRoles] = useState([]);

  const cb = () => {};

  const preSubmit = fields => {
    const requestId = fields[0];
    const roles = asArray(fields[1].roles).filter(role => role.checked);
    const res = { requestId: requestId, roles: roles };
    return [res];
  };

  const fetchRoles = () => {
    roles.get().then(roles => {
      const transforemedRoles = asArray(roles).map(role => {
        let isChecked = false;
        let isDisabled = false;

        if (role.roleDescription === ROLE.FLIGHTVWR) {
          isChecked = true;
          isDisabled = true;
        }
        return {
          ...role,
          label: role.roleDescription,
          key: role.roleId,
          type: "checkbox",
          checked: isChecked,
          disabled: isDisabled
        };
      });
      setAllRoles(transforemedRoles);
    });
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Title title="Select Roles" />
      </Modal.Header>
      <Modal.Body>
        <Form
          submitService={signuprequests.approve}
          title=""
          callback={props.callback}
          action="add"
          submitText="Approve"
          paramCallback={preSubmit}
          cancellable
          recordId={props.requestId}
        >
          <LabelledInput
            datafield
            inputType="checkboxGroup"
            inputVal={allRoles}
            labelText="Roles:"
            name="roles"
            alt="Roles"
            callback={cb}
          />
        </Form>
      </Modal.Body>
    </Modal>
  );
}

SignUpRequestModal.propTypes = {
  requestId: PropTypes.string,
  callback: PropTypes.func,
  show: PropTypes.bool,
  onHide: PropTypes.func
};

export default SignUpRequestModal;

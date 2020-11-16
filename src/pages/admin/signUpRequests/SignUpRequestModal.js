import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Form from "../../../components/form/Form";
import { roles, signuprequests } from "../../../services/serviceWrapper";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { asArray } from "../../../utils/utils";
import { ROLE } from "../../../utils/constants";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../components/modal/Modal";

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
      className="max-500-width-container"
    >
      <ModalHeader closeButton>
        <ModalTitle>{<Xl8 xid="surm001">Select Roles</Xl8>}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form
          submitService={signuprequests.approve}
          title=""
          callback={props.callback}
          action="add"
          submitText={<Xl8 xid="surm002">Approve</Xl8>}
          paramCallback={preSubmit}
          cancellable
          recordId={props.requestId}
        >
          <div className="signup-checkbox">
            <LabelledInput
              datafield
              inputType="checkboxGroup"
              inputVal={allRoles}
              labelText={<Xl8 xid="surm003">Roles:</Xl8>}
              name="roles"
              alt="Roles"
              callback={cb}
            />
          </div>
        </Form>
      </ModalBody>
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

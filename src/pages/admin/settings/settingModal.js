import React from "react";
import Form from "../../../components/form/Form";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../components/modal/Modal";
import Xl8 from "../../../components/xl8/Xl8";
import { settingsinfo } from "../../../services/serviceWrapper";
import PropTypes from "prop-types";

const SettingModal = props => {
  const cb = () => {};
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
        <ModalTitle>
          <Xl8 xid="setm001">Edit Settings</Xl8>
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form
          submitService={settingsinfo.put}
          callback={props.callback}
          title=""
          action="edit"
          refreshOnSubmit
          data={props.data}
          cancellable
        >
          <LabelledInput
            datafield
            labelText={<Xl8 xid="set002">Matching Threshold</Xl8>}
            inputtype="number"
            name="matchingThreshold"
            callback={cb}
            alt={<Xl8 xid="7">Matching Threshold</Xl8>}
          />
          <LabelledInput
            datafield
            labelText={<Xl8 xid="set003">Maximum Passenger Query Results: </Xl8>}
            inputtype="number"
            name="maxPassengerQueryResult"
            callback={cb}
            alt="nothing"
          />
          <LabelledInput
            datafield
            labelText={<Xl8 xid="set004">Maximum Flight Query Results: </Xl8>}
            inputtype="number"
            name="maxFlightQueryResult"
            callback={cb}
            alt="nothing"
          />
          <LabelledInput
            datafield
            labelText={
              <Xl8 xid="set005">Maximum Rule Hits Allowed Per Run on Rule: </Xl8>
            }
            inputtype="number"
            name="maxRuleHit"
            callback={cb}
            alt="nothing"
          />
          <LabelledInput
            datafield
            labelText={<Xl8 xid="set006">APIS Only Flag:</Xl8>}
            inputtype="select"
            options={[
              { value: "TRUE", label: "TRUE" },
              { value: "FALSE", label: "FALSE" }
            ]}
            name="apisOnlyFlag"
            callback={cb}
            alt="nothing"
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
SettingModal.propTypes = {
  show: PropTypes.bool,
  callback: PropTypes.func,
  onHide: PropTypes.func,
  data: PropTypes.object
};

export default SettingModal;

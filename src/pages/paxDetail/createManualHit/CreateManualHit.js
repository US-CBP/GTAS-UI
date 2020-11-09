import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import RoleAuthenticator from "../../../context/roleAuthenticator/RoleAuthenticator";
import { asArray } from "../../../utils/utils";
import { ROLE } from "../../../utils/constants";
import { manualHit, hitcats } from "../../../services/serviceWrapper";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../components/modal/Modal";

const CreateManualHit = props => {
  const cb = () => {};
  const [show, setShow] = useState(false);
  const [wlCategories, setWlCategories] = useState([]);
  const paxId = props.paxId;
  const flightId = props.flightId;

  const handleClose = (status, res) => {
    setShow(false);
    props.callback(Date.now());
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    hitcats.get().then(res => {
      const wlc = asArray(res).map(wl => {
        return {
          label: wl.label,
          value: wl.id,
          key: wl.id
        };
      });
      setWlCategories(wlc);
    });
  }, []);

  return (
    <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.HITMGR]} alt={<></>}>
      <Button className="dropdown-item" onClick={handleShow}>
        <Xl8 xid="cmh001">Create Manual Hit</Xl8>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        className="max-500-width-container"
        centered
      >
        <ModalHeader closeButton>
          <ModalTitle>
            <Xl8 xid="cmh001">Create Manual Hit</Xl8>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form
            title=""
            submitService={manualHit.post}
            callback={handleClose}
            action="add"
            id="createManualHit"
            cancellable
          >
            <LabelledInput
              datafield
              labelText={<Xl8 xid="cmh002">Passenger ID:</Xl8>}
              inputType="text"
              name="paxId"
              inputVal={paxId || ""}
              alt="nothing"
              readOnly={true}
              spacebetween
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="cmh003">Flight ID:</Xl8>}
              inputType="text"
              name="flightId"
              inputVal={flightId || ""}
              alt={<Xl8 xid="2">Flight ID:</Xl8>}
              callback={cb}
              readOnly={true}
              spacebetween
            />
            <LabelledInput
              inputType="select"
              labelText={<Xl8 xid="cmh004">Hit Category:</Xl8>}
              name="hitCategoryId"
              alt={<Xl8 xid="2">Hit Category:</Xl8>}
              datafield
              required
              callback={cb}
              options={wlCategories}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="cmh005">Description:</Xl8>}
              inputType="text"
              name="description"
              required=""
              inputVal=""
              alt={<Xl8 xid="2">Description:</Xl8>}
              callback={cb}
              spacebetween
            />
          </Form>
        </ModalBody>
      </Modal>
    </RoleAuthenticator>
  );
};
CreateManualHit.propTypes = {
  paxId: PropTypes.string,
  flightId: PropTypes.string,
  callback: PropTypes.func
};

export default CreateManualHit;

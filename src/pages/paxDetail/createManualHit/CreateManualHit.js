// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import RoleAuthenticator from "../../../context/roleAuthenticator/RoleAuthenticator";
import { manualHit } from "../../../services/serviceWrapper";
import { LookupContext } from "../../../context/data/LookupContext";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../components/modal/Modal";
import { asArray } from "../../../utils/utils";
import { ROLE, LK } from "../../../utils/constants";

const CreateManualHit = props => {
  const cb = () => {};
  const [show, setShow] = useState(false);
  const [wlCategories, setWlCategories] = useState([]);
  const paxId = props.paxId;
  const flightId = props.flightId;
  const { refreshPartial } = useContext(LookupContext);

  const handleClose = () => {
    setShow(false);
    props.callback(Date.now());
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    refreshPartial(LK.HITCAT).then(res => {
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

  const launcher = props.icon ? (
    <div onClick={handleShow}>
      <i className="fa fa-flag"></i>
    </div>
  ) : (
    <div className="dropdown-item" onClick={handleShow}>
      <Xl8 xid="cmh001">Create Manual Hit</Xl8>
    </div>
  );

  return (
    <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.HITMGR]} alt={<></>}>
      {launcher}

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
              inputtype="text"
              name="paxId"
              inputval={paxId || ""}
              alt="nothing"
              readOnly={true}
              spacebetween
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="cmh003">Flight ID:</Xl8>}
              inputtype="text"
              name="flightId"
              inputval={flightId || ""}
              alt={<Xl8 xid="2">Flight ID:</Xl8>}
              callback={cb}
              readOnly={true}
              spacebetween
            />
            <LabelledInput
              inputtype="select"
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
              inputtype="text"
              name="description"
              required=""
              inputval=""
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

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { manualHit, watchlistcats } from "../../../services/serviceWrapper";
import Form from "../../../components/form/Form";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { asArray } from "../../../utils/utils";

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
    watchlistcats.get().then(res => {
      const wlc = asArray(res).map(wl => {
        {
          return {
            label: wl.label,
            value: wl.id,
            key: wl.id
          };
        }
      });
      setWlCategories(wlc);
    });
  }, []);

  return (
    <>
      <Button variant="outline-danger" size="sm" onClick={handleShow}>
        Create Manual Hit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Manual Hit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            title=""
            submitText="SAVE"
            submitService={manualHit.post}
            callback={handleClose}
            action="add"
            id="createManualHit"
            cancellable
          >
            <LabelledInput
              datafield
              labelText="Passenger ID"
              inputType="text"
              name="paxId"
              required={true}
              inputVal={paxId || ""}
              alt="nothing"
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText="flight ID"
              inputType="text"
              name="flightId"
              required={true}
              inputVal={flightId || ""}
              alt="nothing"
              callback={cb}
              spacebetween
            />
            <LabelledInput
              inputType="select"
              alt="Nothing"
              name="hitCategoryId"
              labelText=""
              placeholder="Choose Hit Category"
              datafield
              required
              callback={cb}
              options={wlCategories}
            />
            <LabelledInput
              datafield
              labelText="Description"
              inputType="text"
              name="description"
              required=""
              inputVal=""
              alt="nothing"
              callback={cb}
            />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
CreateManualHit.propTypes = {
  paxId: PropTypes.string,
  flightId: PropTypes.string,
  callback: PropTypes.func
};

export default CreateManualHit;

// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState } from "react";
import { Button, Container, Alert } from "react-bootstrap";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import RoleAuthenticator from "../../../context/roleAuthenticator/RoleAuthenticator";
import { ROLE } from "../../../utils/constants";
import { addWLItems, hitcats } from "../../../services/serviceWrapper";

import { asArray } from "../../../utils/utils";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../components/modal/Modal";

const AddToWatchlist = props => {
  const cb = () => {};
  const [show, setShow] = useState(false);
  const [wlCategories, setWlCategories] = useState([]);
  const passenger = props.watchlistItems.passenger;
  const documents = props.watchlistItems.documents;

  const handleClose = (status, res) => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const paramCallback = fields => {
    const categoryId = fields[0]["categoryId"];
    const paxWatchlistItems = getPaxWatchlistItems(categoryId);
    const docWatchlistItems = getDocWatchlistItems(categoryId);

    const watchlistItems = {
      passenger: paxWatchlistItems,
      documents: docWatchlistItems
    };
    return [watchlistItems];
  };

  const getPaxWatchlistItems = categoryId => {
    return {
      action: "Create",
      id: null,
      wlItems: [
        {
          firstName: passenger?.firstName,
          lastName: passenger?.lastName,
          dob: passenger?.dob,
          categoryId: categoryId,
          id: null
        }
      ]
    };
  };

  const getDocWatchlistItems = categoryId => {
    const docWatchlistItems = { action: "Create", id: null, wlItems: [] };
    asArray(documents).forEach(doc => {
      const item = {
        documentType: doc.documentType,
        documentNumber: doc.documentNumber,
        categoryId: categoryId,
        id: null
      };
      docWatchlistItems.wlItems.push(item);
    });
    return docWatchlistItems;
  };

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

  const launcher = props.icon ? (
    <div onClick={handleShow}>
      <i className="fa fa-eye"></i>
    </div>
  ) : (
    <div className="dropdown-item" onClick={handleShow}>
      <Xl8 xid="atw001">Add to Watchlist</Xl8>
    </div>
  );

  return (
    <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.WLMGR]} alt={<></>}>
      {launcher}
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        centered
        aria-labelledby="contained-modal-title-vcenter"
        className="max-500-width-container"
      >
        <ModalHeader closeButton>
          <ModalTitle>
            <Xl8 xid="atw002">Add to Watchlist</Xl8>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Container fluid>
            <Form
              submitService={addWLItems.post}
              // submitText={<Xl8 xid="atw002">Add to Watchlist</Xl8>}
              title=""
              callback={handleClose}
              action="add"
              cancellable
              paramCallback={paramCallback}
            >
              <LabelledInput
                datafield
                labelText={<Xl8 xid="atw004">Category ID:</Xl8>}
                inputType="select"
                options={wlCategories}
                name="categoryId"
                required={true}
                alt="Category ID"
                callback={cb}
              />
              <Alert variant="warning">
                <Xl8 xid="atw005">
                  This will add the following passenger and their applicable documents to
                  the watchlist:
                </Xl8>
                <br />
                {passenger?.firstName} {passenger?.lastName}
              </Alert>
            </Form>
          </Container>
        </ModalBody>
      </Modal>
    </RoleAuthenticator>
  );
};

export default AddToWatchlist;

import React, { useEffect, useState } from "react";
import { asArray, hasData } from "../../../utils/utils";
import { Button, Modal, Container, Alert } from "react-bootstrap";
import { addWLItems, watchlistcats } from "../../../services/serviceWrapper";
import Form from "../../../components/form/Form";
import LabelledInput from "../../../components/labelledInput/LabelledInput";

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
        Add to Watchlist
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Passenger/Document to Watchlist</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container fluid>
            <Alert variant="warning">
              This will add {passenger?.firstName} {passenger?.lastName} and their
              applicable documents to the watchlist.
            </Alert>
            <Form
              submitService={addWLItems.post}
              submitText="Add to Watchlist"
              title=""
              callback={handleClose}
              action="add"
              cancellable
              paramCallback={paramCallback}
            >
              <LabelledInput
                datafield
                labelText="Choose Category ID"
                inputType="select"
                options={wlCategories}
                name="categoryId"
                required={true}
                alt="Category ID"
                callback={cb}
              />
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddToWatchlist;

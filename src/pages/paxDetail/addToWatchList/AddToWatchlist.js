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

  const docTemplate = `{"@class":"gov.gtas.model.watchlist.json.WatchlistSpec","name":"Document","entity":"DOCUMENT",
    "watchlistItems":[
        {"id":{id},"action":"Create","terms":[
            {"entity":"DOCUMENT","field":"documentType","type":"string","value":"{documentType}"},
            {"entity":"DOCUMENT","field":"documentNumber","type":"string","value":"{documentNumber}"},
            {"entity":"DOCUMENT","field":"categoryId","type":"integer","value":"{categoryId}"}
          ]}]}`;

  const paxTemplate = `{"@class":"gov.gtas.model.watchlist.json.WatchlistSpec","name":"Passenger","entity":"PASSENGER",
    "watchlistItems":[
        {"id":{id},"action":"Create","terms":[
            {"entity":"PASSENGER","field":"firstName","type":"string","value":"{firstName}"},
            {"entity":"PASSENGER","field":"lastName","type":"string","value":"{lastName}"},
            {"entity":"PASSENGER","field":"dob","type":"date","value":"{dob}"},
            {"entity":"PASSENGER","field":"categoryId","type":"integer","value":"{categoryId}"}
          ]}]}`;

  const watchlistItems = {
    passenger: paxTemplate
      .replace("{firstName}", passenger?.firstName)
      .replace("{lastName}", passenger?.lastName)
      .replace("{dob}", passenger?.dob)
      .replace("{id}", null),

    documents: documents?.reduce((accumulator, doc) => {
      const docTypes = ["V", "P", "v", "p"];

      if (docTypes.includes(doc.documentType)) {
        const template = docTemplate
          .replace("{id}", null)
          .replace("{documentType}", doc.documentType)
          .replace("{documentNumber}", doc.documentNumber);
        accumulator.push(template);
      }
      return accumulator;
    }, [])
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
              data={watchlistItems}
              cancellable
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

import React, { useState, useEffect } from "react";
import QueryBuilder from "../../../components/queryBuilder/QueryBuilder";
import { Button, Modal, Container, Row } from "react-bootstrap";
import { hasData } from "../../../utils/utils";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { initQuery } from "../../../components/queryBuilder/constants";

const QRModal = props => {
  const id = props.id;
  const svc = props.service;

  const [data, setData] = useState(props.data?.query);
  const [key, setKey] = useState(0);
  const [title, setTitle] = useState(props.data?.title);
  const [desc, setDesc] = useState(props.data?.description);
  const [query, setQuery] = useState();
  const isEdit = hasData(props.data);

  const cb = ev => {
    if (ev.name === "description") setDesc(ev.value);
    if (ev.name === "title") setTitle(ev.value);
  };

  const dataCallback = formatted => {
    setQuery(formatted);
  };

  const onDelete = () => {
    if (hasData(svc)) svc.del(id);
    props.callback("DELETE");
  };

  const onSave = () => {
    const safeid = id > 0 ? id : null;
    const q = {
      id: safeid,
      title: title,
      description: desc,
      query: query
    };

    if (hasData(svc)) {
      isEdit ? svc.put(id, q) : svc.post(q);
    }
    props.callback("SAVE");
  };

  const onRun = () => {
    props.callback("RUN");
  };

  const onClear = () => {
    setData(undefined);
    setDesc("");
    setTitle("");
    setKey(key + 1);
  };

  useEffect(() => {
    setData(props.data?.query);
  }, []);

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="md"
        // aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="qbrb-modal-body">
          <Container fluid>
            <Row>
              <LabelledInput
                datafield
                key={`title${key}`}
                labelText="Title"
                inputType="text"
                inputVal={title}
                name="title"
                callback={cb}
                alt="Title"
              />
              <LabelledInput
                datafield
                labelText="Description"
                key={`desc${key}`}
                inputType="text"
                inputVal={desc}
                name="description"
                callback={cb}
                alt="Description"
              />
            </Row>
            <QueryBuilder
              data={data}
              key={key}
              // cb={cb}
              dataCallback={dataCallback}
            ></QueryBuilder>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={onClear}
          >
            Clear
          </Button>
          <Button
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={onSave}
          >
            Save
          </Button>
          <Button
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={onRun}
          >
            Run
          </Button>
          {isEdit && (
            <Button
              type="button"
              className="m-2 outline-dark-outline"
              variant="outline-dark"
              onClick={onDelete}
            >
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QRModal;

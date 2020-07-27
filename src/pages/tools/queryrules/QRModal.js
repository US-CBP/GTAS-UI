import React, { useState, useEffect } from "react";
import QueryBuilder from "../../../components/queryBuilder/QueryBuilder";
import { Button, Modal, Container, Row } from "react-bootstrap";
import { hasData, asArray, localeDateOnly } from "../../../utils/utils";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import {
  buttonConfigQuery,
  buttonConfigRule
} from "../../../components/queryBuilder/constants";
import { navigate } from "@reach/router";
import { watchlistcats } from "../../../services/serviceWrapper";

const QRModal = props => {
  const id = props.id;
  const svc = props.service;
  const mode = props.mode === "RULE" ? "RULE" : "QUERY";
  const buttonConfig = mode === "RULE" ? buttonConfigRule : buttonConfigQuery;
  const [data, setData] = useState(props.data?.query);
  const [key, setKey] = useState(0);
  const [metaData, setMetaData] = useState(props.data);
  const [title, setTitle] = useState(props.data?.title);
  const [desc, setDesc] = useState(props.data?.description);
  const [catid, setCatid] = useState(props.data?.ruleCat);
  const [startDate, setStartDate] = useState(props.data?.startDate);
  const [endDate, setEndDate] = useState(props.data?.endDate);
  const [categories, setCategories] = useState([]);
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
    navigate("/gtas/tools/qrdetails", {
      state: {
        data: {
          pageNumber: 1,
          pageSize: 10,
          query: data
        }
      }
    });
    props.callback("RUN");
  };

  const onClear = () => {
    setData(undefined);
    // setDesc("");
    // setTitle("");
    setMetaData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      enabled: true,
      ruleCat: 0
    });
    setKey(key + 1);
  };

  useEffect(() => {
    setData(props.data?.query);
    watchlistcats.get().then(res => {
      const cats = asArray(res).map(item => {
        return { label: item.label, value: item.id };
      });

      setCategories(cats);
    });
  }, [props.id]);

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
            <Row className="card-columns qrm">
              <LabelledInput
                datafield
                key={`title${key}`}
                labelText="Title"
                required={true}
                inputType="text"
                inputVal={metaData.title}
                name="title"
                callback={cb}
                alt="Title"
                spacebetween
              />
              <LabelledInput
                datafield
                labelText="Description"
                key={`desc${key}`}
                required={true}
                inputType="text"
                inputVal={metaData.description}
                name="description"
                callback={cb}
                alt="Description"
                spacebetween
              />
            </Row>
            {mode === "RULE" && (
              <>
                <Row className="card-columns qrm">
                  <LabelledInput
                    datafield
                    labelText="Start Date"
                    key={`sd${metaData}`}
                    required={true}
                    inputType="text"
                    inputVal={localeDateOnly(metaData.startDate)}
                    name="startDate"
                    callback={cb}
                    alt="start date"
                    spacebetween
                  />
                  <LabelledInput
                    datafield
                    labelText="End Date"
                    key={`ed${metaData}`}
                    inputType="text"
                    inputVal={localeDateOnly(metaData.endDate)}
                    name="endDate"
                    callback={cb}
                    alt="end date"
                    spacebetween
                  />
                </Row>
                <Row className="card-columns qrm">
                  <LabelledInput
                    datafield
                    labelText="Enabled"
                    inputType="checkbox"
                    name="enabled"
                    alt="query or rule is enabled"
                    selected={metaData.enabled}
                    callback={cb}
                    spacebetween
                  />
                  <LabelledInput
                    datafield
                    labelText="Rule Category"
                    inputType="select"
                    options={categories}
                    inputVal={metaData.ruleCat}
                    required={true}
                    name="ruleCat"
                    key={`rc${categories}`}
                    callback={cb}
                    alt="rule category"
                    spacebetween
                  />
                </Row>
              </>
            )}
            <QueryBuilder
              data={data}
              key={key}
              translations={buttonConfig}
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

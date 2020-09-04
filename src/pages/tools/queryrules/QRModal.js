import React, { useState, useEffect } from "react";
import QueryBuilder from "../../../components/queryBuilder/QueryBuilder";
import RAQB from "../../../components/raqb/RAQB";
import { Button, Modal, Container, Row } from "react-bootstrap";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import {
  buttonConfigQuery,
  buttonConfigRule
} from "../../../components/queryBuilder/constants";
import { navigate } from "@reach/router";
import { hasData, asArray, localeDateOnly } from "../../../utils/utils";
import { QR, ACTION } from "../../../utils/constants";
import { watchlistcats } from "../../../services/serviceWrapper";

const QRModal = props => {
  const id = props.id;
  const svc = props.service;
  const mode = props.mode === QR.RULE ? QR.RULE : QR.QUERY;
  const buttonConfig = mode === QR.RULE ? buttonConfigRule : buttonConfigQuery;
  const [data, setData] = useState(props.data?.query);
  const [key, setKey] = useState(0);
  const [summaryData, setSummaryData] = useState(
    props.data || { startDate: localeDateOnly(Date.now()), enabled: true }
  );
  const [title, setTitle] = useState(props.data?.title || "");
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState();
  const isEdit = hasData(props.data);

  const cb = ev => {
    let newSummary = summaryData;
    newSummary[ev.name] = ev.value;

    setSummaryData(newSummary);
    setTitle(newSummary.title);
  };

  const dataCallback = formatted => {
    setQuery(formatted);
  };

  const onDelete = () => {
    if (hasData(svc)) {
      svc.del(id).then(res => {
        props.callback(ACTION.DELETE);
      });
    }
  };

  const onSave = () => {
    if (!hasData(svc)) return;

    const q = getSaveObject();
    const saveMethod = isEdit ? svc.put : svc.post;
    const saveArgs = hasData(id) ? [id, q] : [q];

    saveMethod(...saveArgs).then(() => {
      // postpone callback to parent until *after* the save promise is resolved.
      // Ensures the save is complete before we attempt to refresh the parent table data
      props.callback(ACTION.SAVE);
    });
  };

  const getSaveObject = () => {
    const safeid = id > 0 ? id : null;

    if (props.mode === QR.RULE) {
      return {
        id: safeid,
        details: query,
        summary: {
          title: summaryData.title,
          description: summaryData.description,
          input: "select",
          startDate: new Date(summaryData.startDate || Date.now()),
          endDate: summaryData.endDate ? new Date(summaryData.endDate) : undefined,
          enabled: summaryData.enabled,
          ruleCat: summaryData.ruleCat,
          overMaxHits: null
        }
      };
    }

    return {
      id: safeid,
      title: summaryData.title,
      description: summaryData.description,
      query: query
    };
  };

  const onClose = () => {
    props.callback(ACTION.CLOSE);
  };

  const onRun = () => {
    navigate("/gtas/tools/qrdetails", {
      state: {
        data: {
          pageNumber: 1,
          pageSize: 10,
          query: data || query
        }
      }
    });
    props.callback(ACTION.RUN);
  };

  const onClear = () => {
    setData(undefined);

    setSummaryData({
      title: "",
      description: "",
      startDate: localeDateOnly(Date.now()),
      endDate: "",
      enabled: true,
      ruleCat: -1
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
      setKey(key + 1);
    });
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
          <Modal.Title key="">{`${props.title}: ${title || ""}`}</Modal.Title>
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
                inputVal={summaryData?.title}
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
                inputVal={summaryData?.description}
                name="description"
                callback={cb}
                alt="Description"
                spacebetween
              />
            </Row>
            {mode === QR.RULE && (
              <>
                <Row className="card-columns qrm">
                  <LabelledInput
                    datafield
                    labelText="Start Date"
                    key={`sd${key}`}
                    required={true}
                    inputType="text"
                    inputVal={localeDateOnly(summaryData?.startDate)}
                    name="startDate"
                    callback={cb}
                    alt="start date"
                    spacebetween
                  />
                  <LabelledInput
                    datafield
                    labelText="End Date"
                    key={`ed${key}`}
                    inputType="text"
                    inputVal={localeDateOnly(summaryData?.endDate)}
                    name="endDate"
                    callback={cb}
                    alt="end date"
                    spacebetween
                  />
                </Row>
                <Row className="card-columns qrm">
                  <LabelledInput
                    key={`en${key}`}
                    datafield
                    labelText="Enabled"
                    inputType="checkbox"
                    name="enabled"
                    alt="query or rule is enabled"
                    selected={summaryData?.enabled}
                    callback={cb}
                    spacebetween
                  />
                  <LabelledInput
                    datafield
                    key={`rc${key}`}
                    labelText="Rule Category"
                    inputType="select"
                    options={categories}
                    inputVal={summaryData?.ruleCat}
                    required={true}
                    name="ruleCat"
                    callback={cb}
                    alt="rule category"
                    spacebetween
                  />
                </Row>
              </>
            )}

            <RAQB data={data} key={key} dataCallback={dataCallback}></RAQB>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            key="close"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            type="button"
            key="clear"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={onClear}
          >
            Clear
          </Button>
          <Button
            key="save"
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={onSave}
          >
            Save
          </Button>
          <Button
            key="run"
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={onRun}
          >
            Run
          </Button>
          {isEdit && (
            <Button
              key="delete"
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

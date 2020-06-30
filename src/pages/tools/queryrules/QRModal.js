import React, { useState, useEffect } from "react";
import QueryBuilder from "../../../components/queryBuilder/QueryBuilder";
import { Button, Modal, Container } from "react-bootstrap";
import { hasData } from "../../../utils/utils";

const QRModal = props => {
  const data = props.data;
  const id = props.id;
  const fakequery = {
    id: "g-Nt6Tb1r0WCpD-YuO8_TbA",
    rules: [
      {
        id: "r-jZsVcEeqAhwc9pv4mc5uS",
        field: "Address.line1",
        value: "",
        operator: "null"
      },
      {
        id: "r-g0evILfJ3KUCGu12wMokL",
        field: "Bag.airline",
        value: "",
        operator: "null"
      },
      {
        id: "g-xWAFwb_nuhGLWTII6Hfwo",
        rules: [
          {
            id: "r-LPFoRuzNV_QM3kJW_YDAo",
            field: "Address.line2",
            value: "",
            operator: "null"
          },
          {
            id: "r-wxBfBY335cUyBSF-Zpjlz",
            field: "CreditCard.number",
            value: "",
            operator: "null"
          },
          { id: "g-BOcl111YHA0gLJr2ztJT7", rules: [], combinator: "and", not: false },
          {
            id: "r-T52HEf8YEhO1NVNQ0nwax",
            field: "BookingDetail.origin",
            value: "",
            operator: "null"
          }
        ],
        combinator: "and",
        not: false
      },
      {
        id: "r-oCVbdomIhUsXSbdt4cvx9",
        field: "CreditCard.expiration",
        value: "",
        operator: "null"
      },
      {
        id: "g-EFxwdBNCTMHYuJxn_CRma",
        rules: [
          {
            id: "r-UnPwHG4_tTsnxdXyWeGO2",
            field: "Address.country",
            value: "",
            operator: "null"
          },
          {
            id: "r-Wx-wjSop4nnmK5vK6cb4s",
            field: "Email.domain",
            value: "",
            operator: "null"
          }
        ],
        combinator: "and",
        not: false
      }
    ],
    combinator: "and",
    not: false
  };
  const qry = hasData(data) ? fakequery : undefined;
  const [query, setQuery] = useState(qry);
  const [key, setKey] = useState(0);
  const isEdit = hasData(props.data);

  const clearForm = () => {
    setQuery(undefined);
    setKey(key + 1);
  };

  useEffect(() => {
    setQuery(qry);
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
            <QueryBuilder query={query} key={key}></QueryBuilder>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            onClick={clearForm}
          >
            Clear
          </Button>
          <Button
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
          >
            Save
          </Button>
          <Button
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            // onClick={this.onFormCancel}
          >
            Run
          </Button>
          {isEdit && (
            <Button
              type="button"
              className="m-2 outline-dark-outline"
              variant="outline-dark"
              // onClick={this.onFormCancel}
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

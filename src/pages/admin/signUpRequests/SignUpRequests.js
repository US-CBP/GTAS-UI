import React, { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import Title from "../../../components/title/Title";
import Table from "../../../components/table/Table";
import { signuprequests } from "../../../services/serviceWrapper";

const SignUpRequests = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [show, setShow] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [variant, setVariant] = useState("");
  const cb = () => {};

  const handleResponse = res => {
    const status = res.status;
    const message = res.message;
    setAlertContent(`${status} : ${message}`);
    status === "SUCCESS" ? setVariant("success") : setVariant("danger");
    setShow(true);
  };
  const approve = request => {
    signuprequests.approve(request).then(res => {
      handleResponse(res);
      setRefreshKey(refreshKey + 1);
    });
  };

  const reject = request => {
    signuprequests.reject(request).then(res => {
      handleResponse(res);
      setRefreshKey(refreshKey + 1);
    });
  };

  const headers = [
    {
      Accessor: "username"
    },
    {
      Accessor: "firstName"
    },
    {
      Accessor: "lastName"
    },
    {
      Accessor: "signupLocation"
    },
    {
      Accessor: "status"
    },
    {
      Accessor: "id",
      Header: "Action",
      Cell: ({ row }) => (
        <>
          <Button
            variant="outline-info"
            className="fa fa-thumbs-up"
            onClick={() => approve(row.original)}
          >
            Approve
          </Button>
          <Button
            variant="outline-danger"
            className="fa fa-thumbs-down"
            onClick={() => reject(row.original)}
          >
            Reject
          </Button>
        </>
      )
    }
  ];

  return (
    <Container fluid>
      <Title title="Sign Up Requests"></Title>
      <Alert show={show} variant={variant}>
        {alertContent}
        <hr />
        <Button onClick={() => setShow(false)} variant="outline-success">
          CLOSE
        </Button>
      </Alert>
      <Table
        service={signuprequests.get}
        header={headers}
        id="SigUpRequest"
        callback={cb}
        key={refreshKey}
      ></Table>
    </Container>
  );
};

export default SignUpRequests;

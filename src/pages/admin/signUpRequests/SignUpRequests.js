import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import Title from "../../../components/title/Title";
import Table from "../../../components/table/Table";
import SideNav from "../../../components/sidenav/SideNav";
import Main from "../../../components/main/Main";
import Xl8 from "../../../components/xl8/Xl8";
import FilterForm from "../../../components/filterForm2/FilterForm";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { hasData } from "../../../utils/utils";
import { signuprequests } from "../../../services/serviceWrapper";

const SignUpRequests = () => {
  const [data, setData] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const [fetchData, setFetchData] = useState(0);
  const [show, setShow] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [variant, setVariant] = useState("");
  const cb = () => {};

  const setDataWrapper = data => {
    setData(data);
    setRefreshKey(refreshKey + 1);
  };
  const handleResponse = res => {
    const status = res.status;
    const message = res.message;
    setAlertContent(`${status} : ${message}`);
    status === "SUCCESS" ? setVariant("success") : setVariant("danger");
    setShow(true);
    setFetchData(setFetchData + 1);
  };
  const approve = requestId => {
    signuprequests.approve(requestId).then(res => {
      handleResponse(res);
    });
  };

  const reject = requestId => {
    signuprequests.reject(requestId).then(res => {
      handleResponse(res);
    });
  };

  const preFetchCallback = params => {
    let parsedParams = "?";

    if (hasData(params.username)) parsedParams += "&username=" + params.username;
    if (hasData(params.location)) parsedParams += "&location=" + params.location;
    if (hasData(params.status)) parsedParams += "&status=" + params.status;

    return parsedParams.replace("?&", "?");
  };

  const requestStatusOptions = [
    {
      value: "NEW",
      label: "New"
    },
    {
      value: "APPROVED",
      label: "Approved"
    },
    {
      value: "REJECTED",
      label: "Rejected"
    }
  ];

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
            onClick={() => approve(row.original.id)}
            disabled={row.original.status !== "NEW"}
          >
            <Xl8 xid="sur001">Approve</Xl8>
          </Button>
          <Button
            variant="outline-danger"
            className="fa fa-thumbs-down"
            onClick={() => reject(row.original.id)}
            disabled={row.original.status !== "NEW"}
          >
            <Xl8 xid="sur002">Reject</Xl8>
          </Button>
        </>
      )
    }
  ];

  return (
    <>
      <SideNav>
        <FilterForm
          title="Filter"
          service={signuprequests.get}
          paramCallback={preFetchCallback}
          callback={setDataWrapper}
          key={fetchData}
        >
          <hr />
          <LabelledInput
            labelText={<Xl8 xid="sur003">Username</Xl8>}
            datafield
            name="username"
            inputType="text"
            callback={cb}
            alt="Username"
          />
          <LabelledInput
            labelText={<Xl8 xid="sur004">Status</Xl8>}
            datafield
            name="status"
            inputType="select"
            inputVal="NEW"
            inputStyle="form-select"
            options={requestStatusOptions}
            callback={cb}
            alt="status"
          />
          <LabelledInput
            labelText={<Xl8 xid="sur005">Location</Xl8>}
            datafield
            name="location"
            inputType="text"
            callback={cb}
            alt="Location"
          />
        </FilterForm>
      </SideNav>
      <Main>
        <Title title={<Xl8 xid="sur006">Sign Up Requests</Xl8>}></Title>
        <Alert show={show} variant={variant}>
          {alertContent}
          <hr />
          <Button onClick={() => setShow(false)} variant="outline-success">
            <Xl8 xid="sur007">Close</Xl8>
          </Button>
        </Alert>
        <Table
          data={data}
          header={headers}
          id="SigUpRequest"
          callback={cb}
          key={refreshKey}
        ></Table>
      </Main>
    </>
  );
};

export default SignUpRequests;

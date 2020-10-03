import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Title from "../../../components/title/Title";
import Table from "../../../components/table/Table";
import { signuprequests } from "../../../services/serviceWrapper";
import SideNav from "../../../components/sidenav/SideNav";
import Main from "../../../components/main/Main";
import FilterForm from "../../../components/filterForm2/FilterForm";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { hasData } from "../../../utils/utils";
import SignUpRequestModal from "./SignUpRequestModal";
import { ACTION, STATUS } from "../../../utils/constants";
import Toast from "../../../components/toast/Toast";
import Confirm from "../../../components/confirmationModal/Confirm";

const SignUpRequests = () => {
  const [data, setData] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const [fetchData, setFetchData] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState("");
  const [toastHeader, setToastHeader] = useState("");
  const [variant, setVariant] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [requestId, setRequestId] = useState();
  const cb = () => {};
  const actions = { REJECT: "Reject", APPROVE: "Approve" };
  const setDataWrapper = data => {
    setData(data);
    setRefreshKey(refreshKey + 1);
  };

  const handleResponse = (res, actionType) => {
    const status = res.status;
    const message = res.message;

    if (status === STATUS.SUCCESS) {
      setVariant("success");
    } else {
      setVariant("danger");
    }
    setToastContent(message);
    setToastHeader(`${actionType} Sign up Request`);
    setToastHeader(status);
    setToastContent(message); //TODO: the front end should decide what message to dispaly
    setShowModal(false);
    setShowToast(true);
    setFetchData(fetchData + 1);
  };

  const approve = requestId => {
    setRequestId(requestId);
    setShowModal(true);
  };

  const postApproveCallback = (status, res) => {
    if (status === ACTION.CANCEL) setShowModal(false);
    else handleResponse(res, actions.APPROVE);
  };

  const reject = requestId => {
    signuprequests.reject(requestId).then(res => {
      handleResponse(res, actions.REJECT);
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
            Approve
          </Button>
          <Confirm
            header="Reject Sign up Request"
            message={`Please confirm to reject the sign up request by ${row.original.firstName} ${row.original.lastName}`}
          >
            {confirm => (
              <Button
                variant="outline-danger"
                className="fa fa-thumbs-down"
                onClick={confirm(() => reject(row.original.id))}
                disabled={row.original.status !== "NEW"}
              >
                Reject
              </Button>
            )}
          </Confirm>
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
            labelText="Username"
            datafield
            name="username"
            inputType="text"
            callback={cb}
            alt="Username"
          />
          <LabelledInput
            labelText="Status"
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
            labelText="Location"
            datafield
            name="location"
            inputType="text"
            callback={cb}
            alt="Location"
          />
        </FilterForm>
      </SideNav>
      <Main>
        <Title title="Sign Up Requests"></Title>

        <Table
          data={data}
          header={headers}
          id="SigUpRequest"
          callback={cb}
          key={refreshKey}
        ></Table>

        <SignUpRequestModal
          show={showModal}
          onHide={() => setShowModal(false)}
          callback={postApproveCallback}
          requestId={requestId}
        />
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          header={toastHeader}
          body={toastContent}
          variant={variant}
        ></Toast>
      </Main>
    </>
  );
};

export default SignUpRequests;

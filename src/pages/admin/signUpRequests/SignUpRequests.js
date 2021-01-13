import React, { useState } from "react";
import { Dropdown, DropdownButton, Col } from "react-bootstrap";
import Title from "../../../components/title/Title";
import Table from "../../../components/table/Table";
import { signuprequests } from "../../../services/serviceWrapper";
import SidenavContainer from "../../../components/sidenavContainer/SidenavContainer";
import Main from "../../../components/main/Main";
import Xl8 from "../../../components/xl8/Xl8";
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
      Accessor: "id",
      Xl8: true,
      Header: ["sur013", "Action"],
      disableSortBy: true,
      Cell: ({ row }) => {
        return (
          <div className="text-center edit-user">
            <DropdownButton
              variant="outline-info"
              title={<Xl8 xid="manu002">Choose Action</Xl8>}
            >
              <Dropdown.Item
                as="button"
                onClick={() => approve(row.original.id)}
                disabled={row.original.status !== "NEW"}
              >
                <Xl8 xid="sur001">Approve</Xl8>
              </Dropdown.Item>

              <Confirm
                header={<Xl8 xid="sur014">Reject Sign up Request</Xl8>}
                message={
                  <span>
                    <Xl8 xid="sur015">
                      Please click confirm to reject the sign up request by:
                    </Xl8>
                    <br />
                    <br />
                    {row.original.firstName} {row.original.lastName}
                  </span>
                }
              >
                {confirm => (
                  <Dropdown.Item
                    as="button"
                    onClick={confirm(() => reject(row.original.id))}
                    disabled={row.original.status !== "NEW"}
                  >
                    <Xl8 xid="sur002">Reject</Xl8>
                  </Dropdown.Item>
                )}
              </Confirm>
            </DropdownButton>
          </div>
        );
      }
    },

    { Accessor: "username", Xl8: true, Header: ["sur008", "Username"] },
    { Accessor: "email", Xl8: true, Header: ["sur016", "Email"] },
    { Accessor: "firstName", Xl8: true, Header: ["sur009", "First Name"] },
    { Accessor: "lastName", Xl8: true, Header: ["sur010", "Last Name"] },
    { Accessor: "signupLocation", Xl8: true, Header: ["sur011", "Signup Location"] },
    { Accessor: "status", Xl8: true, Header: ["sur012", "Status"] }
  ];

  return (
    <>
      <SidenavContainer>
        <Col className="notopmargin">
          <FilterForm
            service={signuprequests.get}
            paramCallback={preFetchCallback}
            callback={setDataWrapper}
            key={fetchData}
          >
            <LabelledInput
              labelText={<Xl8 xid="sur003">Username</Xl8>}
              datafield
              name="username"
              inputtype="text"
              callback={cb}
              alt="Username"
            />
            <LabelledInput
              labelText={<Xl8 xid="sur004">Status</Xl8>}
              datafield
              name="status"
              inputtype="select"
              inputval="NEW"
              inputStyle="form-select"
              options={requestStatusOptions}
              callback={cb}
              alt="status"
            />
            <LabelledInput
              labelText={<Xl8 xid="sur005">Location</Xl8>}
              datafield
              name="location"
              inputtype="text"
              callback={cb}
              alt="Location"
            />
          </FilterForm>
        </Col>
      </SidenavContainer>
      <Main>
        <Title title={<Xl8 xid="sur006">Sign Up Requests</Xl8>}></Title>

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

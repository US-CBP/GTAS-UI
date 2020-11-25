import React, { useState } from "react";
import Table from "../../../components/table/Table";
import { auditlog } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import { Col } from "react-bootstrap";
import SidenavContainer from "../../../components/sidenavContainer/SidenavContainer";
import FilterForm from "../../../components/filterForm2/FilterForm";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import Main from "../../../components/main/Main";
import { localeDate } from "../../../utils/utils";

const AuditLog = ({ name }) => {
  const cb = function(result) {};
  const [data, setData] = useState();
  const [refreshKey, setRefreshKey] = useState(1);
  let startDate = new Date();
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);
  startDate.setDate(startDate.getDate() - 1);

  const initialParamState = () => {
    return {
      startDate: startDate,
      endDate: endDate
    };
  };

  const auditActions = [
    { value: "ALL_ACTIONS", label: "ALL_ACTIONS" },
    { value: "CREATE_UDR", label: "CREATE_UDR" },
    { value: "UPDATE_UDR", label: "UPDATE_UDR" },
    { value: "UPDATE_UDR_META", label: "UPDATE_UDR_META" },
    { value: "DELETE_UDR", label: "DELETE_UDR" },
    { value: "CREATE_WL", label: "CREATE_WL" },
    { value: "UPDATE_WL", label: "UPDATE_WL" },
    { value: "DELETE_WL", label: "DELETE_WL" },
    { value: "LOAD_APIS", label: "LOAD_APIS" },
    { value: "LOAD_PNR", label: "LOAD_PNR" },
    { value: "CREATE_USER", label: "CREATE_USER" },
    { value: "UPDATE_USER", label: "UPDATE_USER" },
    { value: "SUSPEND_USER", label: "SUSPEND_USER" },
    { value: "DELETE_USER", label: "DELETE_USER" },
    { value: "TARGETING_RUN", label: "TARGETING_RUN" },
    { value: "LOADER_RUN", label: "LOADER_RUN" },
    { value: "UPDATE_DASHBOARD_RUN", label: "UPDATE_DASHBOARD_RUN" },
    { value: "MESSAGE_INGEST_PARSING", label: "MESSAGE_INGEST_PARSING" },
    { value: "RULE_HIT_CASE_OPEN", label: "RULE_HIT_CASE_OPEN" },
    { value: "DISPOSITION_STATUS_CHANGE", label: "DISPOSITION_STATUS_CHANGE" }
  ];
  const preFetchCallback = params => {
    let parsedParams = "?";
    if (params) {
      if (params.startDate) {
        parsedParams += "startDate=" + params.startDate.toISOString();
      }
      if (params.endDate) {
        parsedParams += "&endDate=" + params.endDate.toISOString();
      }
      if (params.actionType) {
        parsedParams += "&actionType=" + params.actionType;
      }
      if (params.user) {
        parsedParams += "&user=" + params.user;
      }
    }
    return parsedParams;
  };

  const headers = [
    {
      Accessor: "actionType",
      Xl8: true,
      Header: ["al005", "Action Type"]
    },
    {
      Accessor: "status",
      Xl8: true,
      Header: ["al006", "Status"]
    },
    {
      Accessor: "message",
      Xl8: true,
      Header: ["al007", "Message"]
    },
    {
      Accessor: "user",
      Xl8: true,
      Header: ["al008", "User"]
    },
    {
      Accessor: "timestamp",
      Xl8: true,
      Header: ["al009", "Timestamp"],
      Cell: ({ row }) => localeDate(row.original.timestampInMilli)
    }
  ];

  const setDataWrapper = res => {
    setData(res);
    setRefreshKey(refreshKey + 1);
  };

  return (
    <>
      <SidenavContainer>
        <Col className="notopmargin">
          <FilterForm
            service={auditlog.get}
            paramCallback={preFetchCallback}
            callback={setDataWrapper}
            getInitialState={initialParamState}
          >
            <LabelledInput
              labelText={<Xl8 xid="al001">User</Xl8>}
              datafield="user"
              name="user"
              inputType="text"
              callback={cb}
              alt="User"
            />
            <LabelledInput
              labelText={<Xl8 xid="al002">Actions</Xl8>}
              datafield="actionType"
              inputType="select"
              name="actionType"
              options={auditActions}
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
              datafield
              inputType="dateTime"
              inputVal={startDate}
              labelText={<Xl8 xid="al003">Start Date</Xl8>}
              name="startDate"
              callback={cb}
              required={true}
              alt="Start Date"
            />
            <LabelledInput
              datafield
              inputType="dateTime"
              inputVal={endDate}
              labelText={<Xl8 xid="al004">End Date</Xl8>}
              name="endDate"
              callback={cb}
              required={true}
              alt="End Date"
            />
          </FilterForm>
        </Col>
      </SidenavContainer>
      <Main>
        <Title title={name}></Title>
        <Table
          data={data}
          key={refreshKey}
          id="Audit Log"
          callback={cb}
          header={headers}
        ></Table>
      </Main>
    </>
  );
};

export default AuditLog;

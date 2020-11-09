import React, { useState } from "react";
import Table from "../../../components/table/Table";
import { errorlog } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import SidenavContainer from "../../../components/sidenavContainer/SidenavContainer";
import { Col } from "react-bootstrap";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import FilterForm from "../../../components/filterForm2/FilterForm";
import { localeDate } from "../../../utils/utils";

const ErrorLog = ({ name }) => {
  const cb = function(result) {};
  const [data, setData] = useState();
  const [refreshKey, setRefreshKey] = useState(1);
  let startDate = new Date();
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);
  startDate.setDate(startDate.getDate() - 1);
  const initialParamState = { startDate: startDate, endDate: endDate };

  const headers = [
    {
      Accessor: "errorId",
      Xl8: true,
      Header: ["el005", "Error Id"]
    },
    {
      Accessor: "errorCode",
      Xl8: true,
      Header: ["el006", "Error Code"]
    },
    {
      Accessor: "errorDescription",
      Xl8: true,
      Header: ["el007", "Error Description"]
    },
    {
      Accessor: "timestamp",
      Xl8: true,
      Header: ["el008", "Error Timestamp"],
      Cell: ({ row }) => localeDate(row.original.timestamp)
    }
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
      if (params.errorCode) {
        parsedParams += "&code=" + params.errorCode;
      }
    }

    return parsedParams;
  };

  const setDataWrapper = res => {
    setData(res);
    setRefreshKey(refreshKey + 1);
  };

  return (
    <>
      <SidenavContainer>
        <Col className="notopmargin">
          <FilterForm
            service={errorlog.get}
            paramCallback={preFetchCallback}
            callback={setDataWrapper}
            initialParamState={initialParamState}
          >
            <LabelledInput
              labelText={<Xl8 xid="el001">Error Code</Xl8>}
              datafield="errorCode"
              name="code"
              inputType="text"
              callback={cb}
              alt="Error Code"
            />
            <LabelledInput
              datafield
              inputType="dateTime"
              inputVal={startDate}
              labelText={<Xl8 xid="el003">Start Date</Xl8>}
              name="startDate"
              callback={cb}
              required={true}
              alt="Start Date"
            />
            <LabelledInput
              datafield
              inputType="dateTime"
              inputVal={endDate}
              labelText={<Xl8 xid="el004">End Date</Xl8>}
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
          id="errorLog"
          callback={cb}
          header={headers}
          key={refreshKey}
        ></Table>
      </Main>
    </>
  );
};

export default ErrorLog;

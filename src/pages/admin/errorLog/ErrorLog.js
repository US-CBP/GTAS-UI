import React, { useState } from "react";
import Table from "../../../components/table/Table";
import { errorlog } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import { Col } from "react-bootstrap";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import FilterForm from "../../../components/filterForm2/FilterForm";
import Main from "../../../components/main/Main";
import SideNav from "../../../components/sidenav/SideNav";

const ErrorLog = ({ name }) => {
  const cb = function(result) {};
  const [data, setData] = useState();
  const [refreshKey, setRefreshKey] = useState(1);
  let startDate = new Date();
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);
  startDate.setDate(startDate.getDate() - 1);

  const visibleCols = ["errorId", "errorCode", "errorDescription", "errorTimestamp"];

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
      <SideNav>
        <Col>
          <FilterForm
            service={errorlog.get}
            paramCallback={preFetchCallback}
            callback={setDataWrapper}
          >
            <br />
            <LabelledInput
              labelText="Error Code"
              datafield="errorCode"
              name="code"
              inputType="text"
              callback={cb}
              alt="Error Code"
            />
            <LabelledInput
              datafield
              inputType="datePicker"
              inputVal={startDate}
              labelText="Start Date"
              name="startDate"
              callback={cb}
              required={true}
              alt="Start Date"
            />
            <LabelledInput
              datafield
              inputType="datePicker"
              inputVal={endDate}
              labelText="End Date"
              name="endDate"
              callback={cb}
              required={true}
              alt="End Date"
            />
          </FilterForm>
        </Col>
      </SideNav>
      <Main>
        <Title title={name}></Title>

        <Table
          data={data}
          id="errorLog"
          callback={cb}
          header={visibleCols}
          key={refreshKey}
        ></Table>
      </Main>
    </>
  );
};

export default ErrorLog;

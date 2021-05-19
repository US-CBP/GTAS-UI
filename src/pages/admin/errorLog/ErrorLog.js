// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { errorlog } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import SidenavContainer from "../../../components/sidenavContainer/SidenavContainer";
import { Col } from "react-bootstrap";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import FilterForm from "../../../components/filterForm2/FilterForm";
import { addMinutes, asArray, localeDate } from "../../../utils/utils";

const ErrorLog = ({ name }) => {
  const cb = () => {};
  const [data, setData] = useState();
  const [refreshKey, setRefreshKey] = useState(1);
  const [filterKey, setFilterKey] = useState(1);
  const [errorCodes, setErrorCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectAllCodes = "Select All Codes";
  let startDate = new Date();
  let endDate = addMinutes(new Date(), 1);
  startDate.setDate(startDate.getDate() - 1);
  const initialParamState = () => {
    return { startDate: startDate, endDate: endDate, errorCode: selectAllCodes };
  };

  const headers = [
    {
      Accessor: "errorId",
      Xl8: true,
      Header: ["el005", "ID"]
    },
    {
      Accessor: "errorCode",
      Xl8: true,
      Header: ["el006", "Code"]
    },
    {
      Accessor: "errorDescription",
      Xl8: true,
      Header: ["el007", "Description"]
    },
    {
      Accessor: "timestamp",
      Xl8: true,
      Header: ["el008", "Timestamp"],
      Cell: ({ row }) => localeDate(row.original.timestamp)
    }
  ];
  const preFetchCallback = params => {
    setIsLoading(true);
    let parsedParams = "?";
    if (params) {
      if (params.startDate) {
        parsedParams += "startDate=" + params.startDate.toISOString();
      }
      if (params.endDate) {
        const endDate = addMinutes(params.endDate, 1);
        parsedParams += "&endDate=" + endDate.toISOString();
      }
      if (params.errorCode != selectAllCodes) {
        parsedParams += "&code=" + params.errorCode;
      }
    }

    return parsedParams;
  };

  useEffect(() => {
    errorlog.get.codes().then(res => {
      let codes = [{ label: selectAllCodes, value: selectAllCodes }]; //Always top dummy value
      codes = codes.concat(
        asArray(res).map(code => {
          return {
            label: code,
            value: code
          };
        })
      );
      setErrorCodes(codes);
      setFilterKey(filterKey + 1);
    });
  }, []);

  const setDataWrapper = res => {
    setData(res);
    setRefreshKey(refreshKey + 1);
    setIsLoading(false);
  };

  return (
    <>
      <SidenavContainer>
        <Col className="notopmargin">
          <FilterForm
            service={errorlog.get.logs}
            paramCallback={preFetchCallback}
            callback={setDataWrapper}
            getInitialState={initialParamState}
            key={filterKey}
          >
            <LabelledInput
              labelText={<Xl8 xid="el001">Error Codes</Xl8>}
              datafield="errorCode"
              inputtype="select"
              name="errorCode"
              inputval={selectAllCodes}
              options={errorCodes}
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
              datafield
              inputtype="dateTime"
              inputval={startDate}
              labelText={<Xl8 xid="el003">Start Date</Xl8>}
              name="startDate"
              className="error-top"
              callback={cb}
              required={true}
              alt="Start Date"
            />
            <LabelledInput
              datafield
              inputtype="dateTime"
              inputval={endDate}
              className="error-bottom"
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
          isLoading={isLoading}
        ></Table>
      </Main>
    </>
  );
};

export default ErrorLog;

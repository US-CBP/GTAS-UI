import React, {useEffect, useState} from "react";
import Table from "../../../components/table/Table";
import {errorlog} from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import SidenavContainer from "../../../components/sidenavContainer/SidenavContainer";
import { Col } from "react-bootstrap";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import FilterForm from "../../../components/filterForm2/FilterForm";
import {asArray, localeDate} from "../../../utils/utils";

const ErrorLog = ({ name }) => {
  const cb = function(result) {};
  const [data, setData] = useState();
  const [refreshKey, setRefreshKey] = useState(1);
  const [filterKey, setFilterKey] = useState(1);
  const [errorCodes, setErrorCodes] = useState([]);
  let startDate = new Date();
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);
  startDate.setDate(startDate.getDate() - 1);
  const initialParamState = () => {
    return { startDate: startDate, endDate: endDate };
  };

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

  useEffect(() => {
    errorlog.get.codes().then(res =>{
      const codes = asArray(res).map(code => {
        return {
          label: code,
          value: code,
        };
      });
      setErrorCodes(codes);
      setFilterKey(filterKey+1);
    });
  }, []);

  const setDataWrapper = res => {
    setData(res);
    setRefreshKey(refreshKey + 1);
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
                inputType="select"
                name="errorCode"
                inputVal="ALL_ERRORS"
                options={errorCodes}
                required={true}
                alt="nothing"
                callback={cb}
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

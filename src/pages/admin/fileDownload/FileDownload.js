import React, { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { logfile, paxdetailsReport, users } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import { Container } from "react-bootstrap";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { asArray, hasData } from "../../../utils/utils";
import "./fileDownload.css";

const FileDownload = ({ name }) => {
  const [logTypes, setLogTypes] = useState([]);
  const [data, setData] = useState([]);
  const [selRefreshKey, setSelRefreshKey] = useState(0); //Should be safe as should only ever be updated once.
  const [tblRefreshKey, setTblRefreshKey] = useState(2);
  const [tblId, setTblId] = useState("No Log Files Found");
  const [currentLogType, setCurrentLogType] = useState("");
  const cb = function(result) {};

  const onLogTypeSelect = target => {
    let logFileType = target.selectedOptions[0].value;
    if (hasData(logFileType) && logFileType != "") {
      getLogFilesList(logFileType);
      setTblId(logFileType);
      setCurrentLogType(logFileType);
    } else {
      setData([]);
      setTblId("No Log Files Found");
      setTblRefreshKey(tblRefreshKey + 1);
      setCurrentLogType("");
    }
  };

  const getLogFilesList = logFileType => {
    logfile.get(undefined, logFileType).then(res => {
      setData(res);
      setTblRefreshKey(tblRefreshKey + 1);
    });
  };

  //Get logtypes for dropdown selection
  useEffect(() => {
    if (logTypes.length === 0) {
      logfile.get().then(res => {
        setLogTypes(parseLogTypes(res));
        setSelRefreshKey(selRefreshKey + 1);
      });
    }
  }, []);
  //Parse log types return into array of values for select
  const parseLogTypes = res => {
    if (res) {
      return asArray(res).map(logType => {
        return {
          value: logType,
          label: logType
        };
      });
    }
    return [];
  };

  const downloadFile = rowDetails => {
    console.log(rowDetails);
    logfile.download(currentLogType + "/" + rowDetails.fileName);
  };

  const headers = [
    {
      Accessor: "Download",
      Cell: ({ row }) => {
        return (
          <div className="icon-col">
            <i
              className="fa fa-pencil-square-o qbrb-icon"
              onClick={() => downloadFile(row.original)}
            ></i>
          </div>
        );
      }
    },
    { Accessor: "fileName" },
    { Accessor: "size" },
    { Accessor: "createDate" },
    { Accessor: "lastModified" }
  ];

  const fileTypeCtrl = (
    <LabelledInput
      inputType="select"
      inputStyle="file-type"
      name="severity"
      placeholder="Choose Log Type..."
      options={logTypes}
      required={true}
      alt="nothing"
      callback={onLogTypeSelect}
      key={selRefreshKey}
    />
  );

  return (
    <Container fluid>
      <Title title={name} rightChild={fileTypeCtrl}></Title>
      <Table
        id={tblId}
        callback={cb}
        key={tblRefreshKey}
        data={data}
        header={headers}
      ></Table>
    </Container>
  );
};

export default FileDownload;

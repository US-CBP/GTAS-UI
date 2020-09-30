import React, { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { logfile } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
// import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { asArray, hasData } from "../../../utils/utils";
import "./fileDownload.css";

const FileDownload = ({ name }) => {
  const [logTypes, setLogTypes] = useState([]);
  const [data, setData] = useState([]);
  const [selRefreshKey, setSelRefreshKey] = useState(0); //Should be safe as should only ever be updated once.
  const [tblRefreshKey, setTblRefreshKey] = useState(2);
  const [currentLogType, setCurrentLogType] = useState("");
  const cb = function(result) {};

  const onLogTypeSelect = target => {
    let logFileType = target.selectedOptions[0].value;
    if (hasData(logFileType) && logFileType != "") {
      getLogFilesList(logFileType);
      setCurrentLogType(logFileType);
    } else {
      setData([]);
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
      },
      Xl8: true,
      Header: ["fdl002", "Download"]
    },
    { Accessor: "fileName", Xl8: true, Header: ["fdl003", "File Name"] },
    { Accessor: "size", Xl8: true, Header: ["fdl004", "Size"] },
    { Accessor: "createDate", Xl8: true, Header: ["fdl005", "Create Date"] },
    { Accessor: "lastModified", Xl8: true, Header: ["fdl006", "Last Modified"] }
  ];

  const fileTypeCtrl = (
    <LabelledInput
      inputType="select"
      inputStyle="file-type"
      name="severity"
      placeholder="Choose log type"
      options={logTypes}
      required={true}
      alt="nothing"
      callback={onLogTypeSelect}
      key={selRefreshKey}
    />
  );

  return (
    <Main className="full">
      <Title title={name} rightChild={fileTypeCtrl}></Title>
      <Table callback={cb} key={tblRefreshKey} data={data} header={headers}></Table>
    </Main>
  );
};

export default FileDownload;

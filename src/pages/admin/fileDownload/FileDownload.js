import React, { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { logfile } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { asArray, hasData, localeDate } from "../../../utils/utils";
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
      Xl8: true,
      Header: ["fdl002", "Download"],
      disableSortBy: true,
      Cell: ({ row }) => {
        return (
          <div className="icon-col">
            <i
              className="fa fa-download table-icon"
              onClick={() => downloadFile(row.original)}
            ></i>
          </div>
        );
      }
    },
    { Accessor: "fileName", Xl8: true, Header: ["fdl003", "File Name"] },
    { Accessor: "size", Xl8: true, Header: ["fdl004", "Size"] },
    {
      Accessor: "createDate",
      Xl8: true,
      Header: ["fdl005", "Create Date"],
      Cell: ({ row }) => localeDate(row.original.createDate)
    },
    {
      Accessor: "lastModified",
      Xl8: true,
      Header: ["fdl006", "Last Modified"],
      Cell: ({ row }) => localeDate(row.original.lastModified)
    }
  ];

  const fileTypeCtrl = (
    <div className="filedownload-action-buttons">
      <LabelledInput
        inputType="select"
        labelText={<Xl8 xid="fdl007">Log Type</Xl8>}
        inputStyle="file-type"
        name="severity"
        options={logTypes}
        required={true}
        alt="nothing"
        spacebetween
        callback={onLogTypeSelect}
        key={selRefreshKey}
      />
    </div>
  );

  return (
    <Main className="full bg-white">
      <Title title={name} rightChild={fileTypeCtrl}></Title>
      <Table callback={cb} key={tblRefreshKey} data={data} header={headers}></Table>
    </Main>
  );
};

export default FileDownload;

import React from "react";
import { paxdetailsReport } from "../../../services/serviceWrapper";
import Xl8 from "../../../components/xl8/Xl8";
import { Button } from "react-bootstrap";

const DownloadReport = props => {
  const download = () => {
	  const currentLanguage = window.navigator.language.split("-")[0];
    paxdetailsReport.get(props.paxId, props.flightId, currentLanguage).then(res => {
      if (res) {
        let data = new Uint8Array(res);
        let blob = new Blob([data], { type: "application/pdf" });
        let url = window.URL.createObjectURL(blob);
        let a = window.document.createElement("a");
        a.href = url;
        a.download = "gtas_event_report";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.log("ERROR! Error in generating GTAS Event Report. No data was retured");
      }
    });
  };

  const launcher = props.icon ? (
    <div onClick={download}>
      <i className="fa fa-download"></i>
    </div>
  ) : (
    <div className="dropdown-item" onClick={download}>
      <Xl8 xid="rep001">Download Report</Xl8>
    </div>
  );

  return launcher;
};

export default DownloadReport;

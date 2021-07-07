// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import Main from "../../../components/main/Main";
import { querypax } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Toast from "../../../components/toast/Toast";
import Xl8 from "../../../components/xl8/Xl8";
import RoleAuthenticator from "../../../context/roleAuthenticator/RoleAuthenticator";
import { Link } from "@reach/router";
import {
  asArray,
  getAge,
  alt,
  localeDate,
  timezoneFreeDate,
  getNumberExportValue
} from "../../../utils/utils";
import { EXPORTFILENAME, ROLE } from "../../../utils/constants";

const QRDetails = props => {
  const cb = () => {};
  const [data, setData] = useState();
  const [key, setKey] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const OVER_QUERY_LIMIT_HEADER = (
    <>
      <Xl8 xid="qrd001"> WARNING: Query Over Limit </Xl8>
    </>
  );
  const OVER_QUERY_LIMIT = (
    <Xl8 xid="qrd002">Query has exceeded results limit, return truncated</Xl8>
  );

  const parseData = data => {
    return asArray(data).map(item => {
      item.docNumber = item.documents?.length > 0 ? item.documents[0].documentNumber : ""; // TODO Documents: shd show all or none here.
      item.age = getAge(item.dob) ? ` (${getAge(item.dob)})` : "";
      item.dobStr = new Date(item.dob).toISOString().slice(0, -14);
      item.dobAge = `${alt(timezoneFreeDate(item.dobStr))} ${item.age}`;
      item.rulehit = item.onRuleHitList ? 1 : "";
      item.watchhit = item.onWatchList ? 1 : "";
      item.flight = item.carrier + item.flightNumber;
      item.eta = localeDate(item.eta);
      item.etd = localeDate(item.etd);

      return item;
    });
  };

  const headers = [
    {
      Accessor: "rulehit",
      Xl8: true,
      Header: ["fl014", "Rule Hits"]
    },
    {
      Accessor: "watchhit",
      Xl8: true,
      Header: ["fl013", "Watchlist Hits"]
    },
    {
      Accessor: "flight",
      Xl8: true,
      Header: ["fl019", "Flight"]
    },
    {
      Accessor: "eta",
      Xl8: true,
      Header: ["qrd003", "ETA"]
    },
    {
      Accessor: "etd",
      Xl8: true,
      Header: ["qrd004", "ETD"]
    },
    { Accessor: "passengerType", Xl8: true, Header: ["qrd005", "Passenger Type"] },
    {
      Accessor: "lastName",
      Xl8: true,
      Header: ["qrd006", "Last Name"],
      Cell: ({ row }) => {
        return (
          <Link to={`/gtas/paxDetail/${row.original.flightId}/${row.original.id}`}>
            {row.original.lastName}
          </Link>
        );
      }
    },
    { Accessor: "firstName", Xl8: true, Header: ["qrd007", "First Name"] },
    { Accessor: "middleName", Xl8: true, Header: ["qrd008", "Middle Name"] },
    { Accessor: "gender", Xl8: true, Header: ["qrd009", "Gender"] },
    {
      Accessor: "dobStr",
      Xl8: true,
      Header: ["qrd010", "DOB"],
      Cell: ({ row }) => <div>{row.original.dobAge}</div>
    },
    {
      Accessor: "docNumber",
      Xl8: true,
      Header: ["qrd011", "Document Number"],
      getCellExportValue: row => getNumberExportValue(row.original.docNumber)
    },
    { Accessor: "nationality", Xl8: true, Header: ["qrd012", "Nationality"] }
  ];

  useEffect(() => {
    querypax.post(props.location?.state?.data).then(res => {
      const resData = parseData(res.result?.passengers);
      setData(resData);
      setKey(key + 1);
      if (res.result?.queryLimitReached) {
        setShowToast(true);
      }
    });
  }, []);

  //TOOD - need a back button or some way to get back to the query/rule page that brought us here.
  return (
    <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.QRYMGR]}>
      <Main className="full bg-white">
        <Title title={<Xl8 xid="">Query Details</Xl8>}></Title>
        <Table
          data={data}
          header={headers}
          callback={cb}
          key={key}
          exportFileName={EXPORTFILENAME.QUERYRESULTS}
        ></Table>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          header={OVER_QUERY_LIMIT_HEADER}
          body={OVER_QUERY_LIMIT}
          variant={"danger"}
          containerClass={"toast-container-qrd"}
        />
      </Main>
    </RoleAuthenticator>
  );
};

export default QRDetails;

import React, { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { querypax } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import RoleAuthenticator from "../../../context/roleAuthenticator/RoleAuthenticator";
import { Link } from "@reach/router";
import {Container} from "react-bootstrap";
import { asArray, getAge, alt, localeDateOnly } from "../../../utils/utils";
import { ROLE } from "../../../utils/constants";
import Toast from "../../../components/toast/Toast";
import Main from "../../../components/main/Main";

const QRDetails = props => {
  const cb = function(result) {};
  const [data, setData] = useState();
  const [key, setKey] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const OVER_QUERY_LIMIT_HEADER = (
      <>
        <Xl8 xid="qrd001"> WARNING: Query Over Limit </Xl8>
      </>
  );
  const OVER_QUERY_LIMIT = <Xl8 xid="qrd002">Query has exceeded results limit, return truncated</Xl8>;

  const parseData = data => {
    return asArray(data).map(item => {
      item.docNumber = item.documents?.length > 0 ? item.documents[0].documentNumber : ""; // TODO Documents: shd show all or none here.
      item.age = getAge(item.dob) ? ` (${getAge(item.dob)})` : "";
      item.dobStr = new Date(item.dob).toISOString().slice(0, -14);
      item.dobAge = `${alt(localeDateOnly(item.dobStr))} ${item.age}`;
      item.rulehit = item.onRuleHitList ? 1 : "";
      item.watchhit = item.onWatchList ? 1 : "";

      return item;
    });
  };

  const headers = [
    {
      Accessor: "rulehit"
    },
    {
      Accessor: "watchhit"
    },
    { Accessor: "passengerType", Header: "Type" },
    {
      Accessor: "lastName",
      Cell: ({ row }) => {
        return (
          <Link to={`/gtas/paxDetail/${row.original.flightId}/${row.original.id}`}>
            {row.original.lastName}
          </Link>
        );
      }
    },
    { Accessor: "firstName" },
    { Accessor: "middleName" },
    { Accessor: "gender" },
    {
      Accessor: "dobStr",
      Header: "DOB",
      Cell: ({ row }) => <div>{row.original.dobAge}</div>
    },
    { Accessor: "docNumber" },
    { Accessor: "nationality" }
  ];

  useEffect(() => {
    querypax.post(props.location?.state?.data).then(res => {
      const resData = parseData(res.result?.passengers);
      setData(resData);
      setKey(key + 1);
      if(res.result?.queryLimitReached){
        setShowToast(true);
      }
    });
  }, []);

  //TOOD - need a back button or some way to get back to the query/rule page that brought us here.
  return (
    <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.QRYMGR]}>
      <Container fluid>
        <Title title={<Xl8 xid="">Query Details</Xl8>}></Title>
        <Table data={data} header={headers} callback={cb} key={key}></Table>
      </Container>
      <Main>
      <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          header={OVER_QUERY_LIMIT_HEADER}
          body={OVER_QUERY_LIMIT}
          variant={"danger"}
      />
      </Main>
    </RoleAuthenticator>
  );
};

export default QRDetails;

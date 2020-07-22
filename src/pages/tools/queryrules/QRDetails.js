import React, { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { querypax } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import { Link } from "@reach/router";
import { Container } from "react-bootstrap";
import { asArray, getAge, alt, localeDateOnly } from "../../../utils/utils";

const QRDetails = props => {
  const cb = function(result) {};
  const [data, setData] = useState([]);
  const [key, setKey] = useState(0);

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
          <Link to={`/gtas/paxDetail/${props.id}/${row.original.id}`}>
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
    });
  }, []);

  //TOOD - need a back button or some way to get back to the query/rule page that brought us here.
  return (
    <Container fluid>
      <Title title="Query Details"></Title>
      <Table
        data={data}
        header={headers}
        id="Query Details"
        callback={cb}
        key={key}
      ></Table>
    </Container>
  );
};

export default QRDetails;

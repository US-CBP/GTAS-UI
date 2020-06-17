import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { passengers } from "../../services/serviceWrapper";
import Title from "../../components/title/Title";
import { Link } from "@reach/router";
import { Container } from "react-bootstrap";
import { asArray, hasData, getAge, alt, localeDateOnly } from "../../utils/utils";

const FlightPax = props => {
  const cb = function(result) {};

  const [data, setData] = useState([]);
  const [key, setKey] = useState(0);

  const parseData = data => {
    return asArray(data).map(item => {
      // item.name = `${item.lastName}, ${item.firstName} ${item.middleName}`;
      item.docNumber = item.documents?.length > 0 ? item.documents[0] : ""; // TODO Documents: shd show all or none here.
      item.age = getAge(item.dob) ? ` (${getAge(item.dob)})` : "";
      item.dobStr = new Date(item.dob).toISOString().slice(0, -14);
      item.dobAge = `${alt(localeDateOnly(item.dobStr))} ${item.age}`;

      //TODO: Do we need arrival and departure for passengers?? timestamp will be the same for all, right???
      console.log(item);
      return item;
    });
  };

  const headers = [
    { Accessor: "onRuleHitList", Header: "Rule Hits" },
    { Accessor: "onWatchList", Header: "Watchlist Hits" },
    { Accessor: "passengerType" },
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
      Cell: ({ row }) => row.original.dobAge
    },
    { Accessor: "docNumber" },
    { Accessor: "nationality" }
  ];

  useEffect(() => {
    passengers.get(props.id).then(res => {
      if (!hasData(res)) {
        setData([]);
        return;
      }

      let parsed = parseData(res);

      setData(parsed);
      setKey(1);
    });
  }, [props.id]);

  return (
    <Container fluid>
      <div className="box2">
        <Title title="Flight Passengers"></Title>
        <Table
          key={key}
          header={headers}
          data={data}
          id="Flight Passegers"
          callback={cb}
        ></Table>
      </div>
    </Container>
  );
};

export default FlightPax;

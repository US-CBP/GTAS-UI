import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { passengers } from "../../services/serviceWrapper";
import Title from "../../components/title/Title";
import { Link } from "@reach/router";
import { Container } from "react-bootstrap";
import { asArray, hasData, getAge } from "../../utils/utils";

const FlightPax = props => {
  const cb = function(result) {};

  const [data, setData] = useState([]);
  const [key, setKey] = useState(0);

  const parseData = data => {
    return asArray(data).map(item => {
      item.name = `${item.lastName}, ${item.firstName} ${item.middleName}`;
      item.docNumber = item.documents?.length > 0 ? item.documents[0].documentNumber : ""; // TODO Documents: shd show all or none here.
      item.dob = `${item.dob} - (${getAge(item.dob)})`;

      //TODO: Do we need arrival and departure for passengers?? timestamp will be the same for all, right???
      return item;
    });
  };

  const headers = [
    { Accessor: "onRuleHitList", Header: "Rule Hits" },
    { Accessor: "onWatchList", Header: "Watchlist Hits" },
    { Accessor: "type" },
    {
      Accessor: "name",
      Cell: ({ row }) => {
        return (
          <Link to={`/gtas/paxDetail/${props.id}/${row.original.id}`}>
            {row.original.name}
          </Link>
        );
      }
    },
    { Accessor: "gender" },
    { Accessor: "seat" },
    { Accessor: "dob", Header: "DOB" },
    { Accessor: "nationality" }
  ];

  useEffect(() => {
    passengers.post(props.id || 1).then(res => {
      if (!hasData(res) || !hasData(res.passengers)) {
        setData([]);
        return;
      }

      let parsed = parseData(res.passengers);

      setData(parsed);
      setKey(key + 1);
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

import React, { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import Table from "../../components/table/Table";
import { search } from "../../services/serviceWrapper";
import { hasData } from "../../utils/utils";
import { Container } from "react-bootstrap";
import { useParams } from "@reach/router";

const Search = props => {
  const [data, setData] = useState([]);
  const { searchParam } = useParams();
  const cb = () => {};
  const Headers = [
    {
      Accessor: "passengerId",
      Header: "Id"
    },
    {
      Accessor: "lastName",
      Header: "Last Name"
    },
    {
      Accessor: "firstName",
      Header: "First Name"
    },
    {
      Accessor: "middleName",
      Header: "Middle Name"
    },
    {
      Accessor: "flightNumber",
      Header: "Flight Number"
    },
    {
      Accessor: "origin",
      Header: "Origin"
    },
    {
      Accessor: "etd",
      Header: "ETD"
    },
    {
      Accessor: "eta",
      Header: "ETA"
    }
  ];

  const params = `?pageNumber=1&pageSize=500&column=_score&dir=des&query=${searchParam}`;

  useEffect(() => {
    search.passengers(params).then(res => {
      if (hasData(res.result)) setData(res.result.passengers);
    });
  }, [searchParam]);

  return (
    <Container fluid>
      <Title title={`Search Result for ${searchParam.toUpperCase()}`} uri={props.uri} />
      <Table data={data} id="searchTable" callback={cb} header={Headers} key={data} />
    </Container>
  );
};

export default Search;

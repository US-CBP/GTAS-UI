import React, { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import Table from "../../components/table/Table";
import { search } from "../../services/serviceWrapper";
import { hasData, localeDate } from "../../utils/utils";
import { Container } from "react-bootstrap";
import { useParams } from "@reach/router";
import "./Search.scss";

const Search = props => {
  const [data, setData] = useState([]);
  const [refreshKey, setRefreshKey] = useState([]);
  const { searchParam } = useParams();
  const cb = () => {};
  const isSearchedText = text => {
    return ("" + text).toUpperCase().includes(searchParam.toUpperCase());
  };
  const Headers = [
    {
      Accessor: "passengerId",
      Header: "Id",
      Cell: ({ row }) => {
        const highlight = isSearchedText(row.original.passengerId) ? "highlight" : "";
        return <span className={highlight}>{row.original.passengerId}</span>;
      }
    },
    {
      Accessor: "lastName",
      Header: "Last Name",
      Cell: ({ row }) => {
        const highlight = isSearchedText(row.original.lastName) ? "highlight" : "";
        return <span className={highlight}>{row.original.lastName}</span>;
      }
    },
    {
      Accessor: "firstName",
      Header: "First Name",
      Cell: ({ row }) => {
        const highlight = isSearchedText(row.original.firstName) ? "highlight" : "";
        return <span className={highlight}>{row.original.firstName}</span>;
      }
    },
    {
      Accessor: "middleName",
      Header: "Middle Name",
      Cell: ({ row }) => {
        const highlight = isSearchedText(row.original.middleName) ? "highlight" : "";
        return <span className={highlight}>{row.original.middleName}</span>;
      }
    },
    {
      Accessor: "flightNumber",
      Header: "Flight Number",
      Cell: ({ row }) => {
        const highlight = isSearchedText(row.original.flightNumber) ? "highlight" : "";
        return <span className={highlight}>{row.original.flightNumber}</span>;
      }
    },
    {
      Accessor: "origin",
      Header: "Origin",
      Cell: ({ row }) => {
        const highlight = isSearchedText(row.original.origin) ? "highlight" : "";
        return <span className={highlight}>{row.original.origin}</span>;
      }
    },
    {
      Accessor: "etd",
      Header: "ETD",
      Cell: ({ row }) => {
        const highlight = isSearchedText(row.original.etd) ? "highlight" : "";
        return <span className={highlight}>{localeDate(row.original.etd)}</span>;
      }
    },
    {
      Accessor: "eta",
      Header: "ETA",
      Cell: ({ row }) => {
        const highlight = isSearchedText(row.original.eta) ? "highlight" : "";
        return <span className={highlight}>{localeDate(row.original.eta)}</span>;
      }
    }
  ];

  const pageSize = 500;
  const params = `?pageNumber=1&pageSize=${pageSize}&column=_score&dir=des&query=${searchParam}`;

  useEffect(() => {
    search.passengers(params).then(res => {
      if (hasData(res.result)) {
        setData(res.result.passengers);
        setRefreshKey(refreshKey + 1);
      }
    });
  }, [searchParam]);

  return (
    <Container fluid>
      <Title title={`Search Result for ${searchParam.toUpperCase()}`} uri={props.uri} />
      <Table
        data={data}
        id="searchTable"
        callback={cb}
        header={Headers}
        key={refreshKey}
      />
    </Container>
  );
};

export default Search;

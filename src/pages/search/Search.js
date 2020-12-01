import React, { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import Table from "../../components/table/Table";
import Main from "../../components/main/Main";
import Xl8 from "../../components/xl8/Xl8";
import { search } from "../../services/serviceWrapper";
import { asArray, hasData, localeDate } from "../../utils/utils";
import { Link, useParams } from "@reach/router";
import "./Search.scss";

const Search = props => {
  const [data, setData] = useState([]);
  const [refreshKey, setRefreshKey] = useState([]);
  const { searchParam } = useParams();
  const cb = () => {};
  const searchedTextUpper = searchParam.toUpperCase();
  const getHighlight = text => {
    return searchedTextUpper.includes(("" + text).toUpperCase()) ? "highlight" : "";
  };

  const linkToPaxdetails = (passengerId, flightId, displayText) => {
    return <Link to={`/gtas/paxDetail/${flightId}/${passengerId}`}>{displayText} </Link>;
  };
  const Headers = [
    {
      Accessor: "lastName",
      Header: "Last Name",
      Cell: ({ row }) => {
        return (
          <span className={getHighlight(row.original.lastName)}>
            {linkToPaxdetails(
              row.original.passengerId,
              row.original.flightId,
              row.original.lastName
            )}
          </span>
        );
      }
    },
    {
      Accessor: "firstName",
      Header: "First Name",
      Cell: ({ row }) => {
        return (
          <span className={getHighlight(row.original.firstName)}>
            {row.original.firstName}
          </span>
        );
      }
    },
    {
      Accessor: "middleName",
      Header: "Middle Name",
      Cell: ({ row }) => {
        return (
          <span className={getHighlight(row.original.middleName)}>
            {row.original.middleName}
          </span>
        );
      }
    },
    {
      Accessor: "flightNumber",
      Header: "Flight Number",
      Cell: ({ row }) => {
        return (
          <span className={getHighlight(row.original.flightNumber)}>
            {row.original.flightNumber}
          </span>
        );
      }
    },
    {
      Accessor: "origin",
      Header: "Origin",
      Cell: ({ row }) => {
        return (
          <span className={getHighlight(row.original.origin)}>{row.original.origin}</span>
        );
      }
    },
    {
      Accessor: "destination",
      Header: "Destination",
      Cell: ({ row }) => {
        return (
          <span className={getHighlight(row.original.destination)}>
            {row.original.destination}
          </span>
        );
      }
    },
    {
      Accessor: "etd",
      Header: "ETD",
      Cell: ({ row }) => {
        return (
          <span className={getHighlight(row.original.etd)}>
            {localeDate(row.original.etd)}
          </span>
        );
      }
    },
    {
      Accessor: "eta",
      Header: "ETA",
      Cell: ({ row }) => {
        return (
          <span className={getHighlight(row.original.eta)}>
            {localeDate(row.original.eta)}
          </span>
        );
      }
    }
  ];

  const pageSize = 500;
  const params = `?pageNumber=1&pageSize=${pageSize}&column=_score&dir=des&query=${searchParam}`;
  const parseData = items => {
    const parsedData = asArray(items).map(item => {
      return {
        ...item,
        eta: localeDate(item.eta),
        etd: localeDate(item.etd)
      };
    });
    return parsedData;
  };
  useEffect(() => {
    search.passengers(params).then(res => {
      if (hasData(res.result)) {
        setData(parseData(res.result.passengers));
        setRefreshKey(refreshKey + 1);
      }
    });
  }, [searchParam]);

  return (
    <Main className="full bg-white">
      <Title
        title={
          <>
            <Xl8 xid="srch001">Search Result for: </Xl8> {searchedTextUpper}
          </>
        }
        uri={props.uri}
      />
      <Table
        data={data}
        id="searchTable"
        callback={cb}
        header={Headers}
        key={refreshKey}
        enableColumnFilter={true}
      />
    </Main>
  );
};

export default Search;

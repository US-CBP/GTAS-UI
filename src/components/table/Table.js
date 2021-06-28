// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { hasData, titleCase, asArray, altObj } from "../../utils/utils";
import {
  useTable,
  usePagination,
  useGroupBy,
  useSortBy,
  useExpanded,
  useFilters
} from "react-table";
import { navigate } from "@reach/router";
import Xl8 from "../xl8/Xl8";
import Loading from "../../components/loading/Loading";
import { Table as RBTable, Pagination, Button } from "react-bootstrap";
import { useExportData } from "react-table-plugins";
import { getExportFileBlob, BooleanFilter, ColumnFilter } from "./table-utils";
import "./Table.css";

//Will auto-populate with data retrieved from the given uri
//Attempts to format the header from the column names, but can be passed a header array instead.

const Table = props => {
  // to show the spinner when data is loading (either from within Table or at the caller), we assume:
  // props.data === undefined ==> data is pending
  // props.data === []        ==> fetch is complete, data has no rows
  // hasData(props.data)      ==> fetch is complete, data has rows

  const [propsdata] = useState(props.data || undefined);
  const [parsedData, setParsedData] = useState();
  const [header, setHeader] = useState(props.header || []);
  const [columns, setColumns] = useState([]);
  const stateVals = props.hasOwnProperty("stateVals") ? altObj(props.stateVals()) : {};
  const [displayColumnFilter, setDisplayColumnFilter] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [isPopulated, setIsPopulated] = useState();

  useEffect(() => {
    validateProps();

    if (hasData(props.data)) parseData(props.data);
    else if (hasData(props.service)) getData();
    else parseData();
  }, []);

  useEffect(() => {
    parseData(propsdata);
  }, [propsdata]);

  const getExportFileName = ({ fileType, all }) => {
    return `${all ? "all-" : ""}${props.exportFileName || "data"}`;
  };

  const RTable = ({ columns, data }) => {
    const defaultColumn = React.useMemo(
      () => ({
        Filter: ColumnFilter
      }),
      []
    );
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      canPreviousPage,
      canNextPage,
      pageOptions,
      rows,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      exportData,
      state: { pageIndex, pageSize, sortBy }
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        initialState: {
          pageIndex: stateVals.pageIndex || 0,
          pageSize: stateVals.pageSize || 25,
          sortBy: stateVals.sortBy || [],
          hiddenColumns: props.hiddenColumns || []
        },
        getExportFileBlob,
        getExportFileName
      },
      useFilters,
      useGroupBy,
      useSortBy,
      useExpanded,
      usePagination,
      useExportData
    );

    const sortIcon = column => {
      if (hasData(props.stateCb))
        props.stateCb({ pageSize: pageSize, pageIndex: pageIndex, sortBy: sortBy });

      const icon = column.isSorted ? (
        column.isSortedDesc ? (
          <i className="fa fa-sort-down p-2" />
        ) : (
          <i className="fa fa-sort-up p-2" />
        )
      ) : (
        <i className="fa fa-sort p-2" />
      );
      return icon;
    };
    // const collator = new Intl.Collator(undefined, {
    //   numeric: true,
    //   sensitivity: 'base',
    // });

    // this is a hack. Need access to the record set displayed in outbound queries as it is sorted so we can scroll
    // through it on the query detail page **in the same order**. Issue is that the react-table version that exposes the sorted
    // recordset isn't working, so I have to mimmick the additional sorting by applying the current sort state to the data passed
    // in from the DB. Works mostly, but sorts alphanumerics differently from react-table. Can apply Intl.Collator to correct this
    // or just find the correct api to get the digested/sorted data directly from the react-table dep.
    const getLinkData = () => {
      let dt = data.slice();
      let result = dt;

      sortBy.forEach(sort => {
        // result = dt.sort(sortValues(sort.id, sort.desc));
      });

      let ids = result.map(item => {
        return [item.id];
      });

      return ids.filter(Boolean);
    };

    return (
      <>
        <div className="table-main">
          {showPending || props.isLoading ? (
            <Loading></Loading>
          ) : (
            <RBTable {...getTableProps()} striped bordered hover>
              <thead>
                {headerGroups.map((headerGroup, index) => {
                  return (
                    <Fragment key={index}>
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, idx) => {
                          let hdr = column.render("Header");

                          if (Array.isArray(hdr)) hdr = <Xl8 xid={hdr[0]}>{hdr[1]}</Xl8>;

                          return (
                            <th className="table-header" key={idx}>
                              <span
                                className="table-sort-span"
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                              >
                                {hdr} {column.canSort ? sortIcon(column) : ""}
                                {props.hasOwnProperty("disableGroupBy") &&
                                !props.disableGroupBy &&
                                column.canGroupBy ? (
                                  <span {...column.getGroupByToggleProps()}>
                                    {props.disableGroupBy ? (
                                      ""
                                    ) : column.isGrouped ? (
                                      <i className="fa fa-object-ungroup"></i>
                                    ) : (
                                      <i className="fa fa-object-group"></i>
                                    )}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </span>
                            </th>
                          );
                        })}
                      </tr>
                      {props.enableColumnFilter && displayColumnFilter ? (
                        <tr>
                          {headerGroup.headers.map(column => {
                            return (
                              <th className="table-header" key={column.id}>
                                <div>
                                  {column.canFilter ? column.render("Filter") : null}
                                </div>
                              </th>
                            );
                          })}
                        </tr>
                      ) : null}
                    </Fragment>
                  );
                })}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  const isGroupBy = row.isGrouped;
                  const link = !isGroupBy ? row.original.link : "";
                  const sendRowToLink = !isGroupBy ? row.original.sendRowToLink : "";
                  const linked = link ? "linked" : "";
                  return (
                    <tr
                      {...row.getRowProps()}
                      className={linked}
                      key={!isGroupBy ? row.original.id : row.groupByVal}
                    >
                      {row.cells.map(cell => {
                        const style = cell.column.className || "";
                        if (link) {
                          return (
                            <td
                              className={` p-1 ${style}`}
                              {...cell.getCellProps()}
                              onClick={() =>
                                navigate(link, {
                                  state: { data: getLinkData() }
                                })
                              }
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        } else if (sendRowToLink) {
                          return (
                            <td
                              className={` p-1 ${style}`}
                              {...cell.getCellProps()}
                              onClick={ev => {
                                const type = ev.target?.nodeName;

                                if (type !== "IMG") {
                                  navigate(sendRowToLink, {
                                    state: { data: row.original }
                                  });
                                }
                              }} // onclick
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        } else if (isGroupBy) {
                          return (
                            <td>
                              {cell.isGrouped ? (
                                // If it's a grouped cell, add an expander and row count
                                <>
                                  <span {...row.getToggleRowExpandedProps()}>
                                    {row.isExpanded ? "V" : ">"}
                                  </span>{" "}
                                  {cell.render("Cell")} ({row.subRows.length})
                                </>
                              ) : cell.isAggregated ? (
                                // If the cell is aggregated, use the Aggregated
                                // renderer for cell
                                cell.render("Aggregated")
                              ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                                // Otherwise, just render the regular cell
                                cell.render("Cell")
                              )}
                            </td>
                          );
                        }
                        return (
                          <td className={` p-1 ${style}`} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </RBTable>
          )}

          <Pagination>
            <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              <i className="fa fa-fast-backward"></i>
            </Pagination.First>
            <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage}>
              <i className="fa fa-backward"></i>
            </Pagination.Prev>
            <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage}>
              <i className="fa fa-forward"></i>
            </Pagination.Next>
            <Pagination.Last
              className="mr-10"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <i className="fa fa-fast-forward"></i>
            </Pagination.Last>
            <span className="pag-text mr-10">
              <Xl8 xid="tab002">Page</Xl8>
              <strong className="pag-num">
                {pageIndex + 1} <Xl8 xid="tab003"> of </Xl8> {pageOptions.length}
              </strong>{" "}
            </span>
            <select
              className="pag"
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 25, 50, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <Button
              className="export-btn"
              variant="light"
              size="sm"
              onClick={() => exportData("csv", true)}
            >
              {<Xl8 xid="tab004">Export</Xl8>}
            </Button>
            <span className="tagrightpag">
              <h3 className="title-default">
                <i>{isPopulated ? rows.length : 0}</i>
              </h3>
            </span>
          </Pagination>
        </div>
      </>
    );
  };

  const validateProps = () => {
    // Allow empty arrays for the data prop, only verify that its an array.
    // Uri and service props are tested for truthy values.
    if (!hasData(props.uri) && !Array.isArray(props.data) && !hasData(props.service)) {
      // const err = new Error("Table requires a uri, service (func), or data prop");
      // console.log("Table requires a uri, service (func), or data prop");
      // throw err;
    }
  };

  const parseData = raw => {
    if (!raw) {
      setShowPending(true);
      return;
    }

    setShowPending(false);
    const noDataFound = "No Data Found";
    const noDataFoundHeader = {
      Accessor: "NoData",
      Xl8: true,
      Header: ["nodata001", "No Data Found"]
    };

    let noDataObj = [{}];
    noDataObj[0][props.id] = noDataFound;

    let dataArray = asArray(raw);
    const hasValidData =
      hasData(dataArray) &&
      (dataArray.length > 1 || dataArray[0][props.id] !== noDataFound);
    setIsPopulated(hasValidData);
    const sdata = hasValidData ? dataArray : noDataObj;
    const sheader = hasValidData
      ? hasData(header)
        ? header
        : Object.keys(dataArray[0])
      : [noDataFoundHeader];
    let columns = [];

    (sheader || []).forEach(element => {
      const acc = element.Accessor || element;
      const isXl8 = element.Xl8 === true;

      if (!(props.ignoredFields || []).includes(acc)) {
        // Dont titlecase Xl8 headers. Casing must be done manually at the caller.
        const title = isXl8 ? element.Header : titleCase(element.Header || acc);
        let cellconfig = {
          Header: title,
          accessor: acc,
          aggregate: element.aggregate,
          Aggregated: element.Aggregated,
          disableFilters: element.disableFilters,
          disableSortBy: element.disableSortBy,
          disableExport: element.disableExport,
          disableGroupBy: element.disableGroupBy
        };

        if (element.Cell !== undefined) {
          cellconfig.Cell = element.Cell;
        }
        if (element.isBoolean) {
          cellconfig.Filter = BooleanFilter;
        }

        columns.push(cellconfig);
      }
    });

    setDisplayColumnFilter(hasValidData);
    setParsedData(sdata);
    setHeader(sheader);
    setColumns(columns);
    setShowPending(false);
  };

  const getData = (params = null) => {
    setShowPending(true);
    if (!hasData(props.service)) {
      parseData();
      return;
    }
    props
      .service(params)
      .then(response => {
        parseData(response);
        setShowPending(false);
      })
      .catch(error => {
        console.log(error);
        parseData([]);
        setShowPending(false);
      });
  };

  return (
    <>
      {props.title !== undefined && (
        <h4 className={`title ${props.style}`}>{props.title}</h4>
      )}
      {props.smalltext !== undefined && <small>{props.smalltext}</small>}
      <RTable
        columns={columns}
        data={parsedData}
        initSort={props.initSort || []}
      ></RTable>
    </>
  );
};

Table.propTypes = {
  id: PropTypes.string,
  callback: PropTypes.func.isRequired,
  service: PropTypes.func,
  uri: PropTypes.string,
  data: PropTypes.array,
  header: PropTypes.array,
  title: PropTypes.string,
  smalltext: PropTypes.string,
  style: PropTypes.string,
  stateCb: PropTypes.func,
  stateVals: PropTypes.func,
  ignoredFields: PropTypes.arrayOf(PropTypes.string),
  enableColumnFilter: PropTypes.bool,
  exportFileName: PropTypes.string
};

export default Table;

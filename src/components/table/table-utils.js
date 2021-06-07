// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.
import React from "react";
import { jsonToCSV } from "react-papaparse";
import { titleCase } from "../../utils/utils";

export const ColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <input
      className="table-filter-form"
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    />
  );
};

export const BooleanFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <select
      className="table-filter-form"
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      <option value={1}>True</option>
      <option value={0}>False</option>
    </select>
  );
};

export const getExportFileBlob = ({ columns, data, fileType, fileName }) => {
  if (fileType === "csv") {
    const headerNames = columns.map(col => titleCase(col.exportValue));
    const csvString = jsonToCSV({ fields: headerNames, data });
    return new Blob([csvString], { type: "text/csv" });
  }
};

// TODO - move hit types and statuses to db
export const hitTypeOptions = [
  {
    value: "WATCHLIST",
    label: "Watchlist"
  },
  {
    value: "USER_RULE",
    label: "User Created"
  },
  {
    value: "GRAPH_RULE",
    label: "Graph Database"
  },
  {
    value: "MANUAL",
    label: "Manual "
  },
  {
    value: "PARTIAL_WATCHLIST",
    label: "Partial Watchlist"
  }
];

export const hitStatusOptions = [
  {
    value: "NEW",
    label: "New"
  },
  {
    value: "REVIEWED",
    label: "Reviewed"
  },
  {
    value: "RE_OPENED",
    label: "Reopened"
  }
];

export const hiddenHeaders = [
  { Accessor: "flightOrigin", Header: "Origin" },
  { Accessor: "flightDestination", Header: "Destination" },
  { Accessor: "flightETADate", Header: "Arrival" },
  { Accessor: "flightETDDate", Header: "Departure" },
  { Accessor: "firstName", Header: "First Name" },
  { Accessor: "lastName", Header: "Last Name" },
  { Accessor: "document", Header: "Document Number" },
  { Accessor: "nationality", Header: "nationality" }
];

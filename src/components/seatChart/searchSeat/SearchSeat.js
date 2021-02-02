// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Form, Button } from "react-bootstrap";
import { asArray, hasData } from "../../../utils/utils";

const SearchSeat = ({ searchCallback, reservedSeats, resetFilterForm }, ref) => {
  const areEqual = (str1, str2) => {
    return str1.toUpperCase() === str2.toUpperCase();
  };

  const reset = () => {
    ref.current["firstName"].value = "";
    ref.current["lastName"].value = "";
    ref.current["middleName"].value = "";
    resetFilterForm();
  };
  const search = () => {
    const searchFields = [];
    if (hasData(ref.current["firstName"].value)) searchFields.push("firstName");
    if (hasData(ref.current["lastName"].value)) searchFields.push("lastName");
    if (hasData(ref.current["middleName"].value)) searchFields.push("middleName");

    //If we don't have any fields to compare, return an empty array.
    if (searchFields.length === 0) {
      searchCallback([]);
    } else {
      const searchResult = asArray(reservedSeats).reduce((result, currentSeat) => {
        currentSeat["middleName"] = currentSeat.middleInitial;
        let match = true;

        searchFields.forEach(searchField => {
          if (!areEqual(currentSeat[searchField], ref.current[searchField].value)) {
            match = false;
            return;
          }
        });

        if (match) {
          result.push(currentSeat.number);
        }

        return result;
      }, []);

      searchCallback(searchResult);
    }
  };

  return (
    <div className="filterform-container">
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            ref={input => (ref.current["firstName"] = input)}
            placeholder="First name"
            className="search-seats-input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            ref={input => (ref.current["middleName"] = input)}
            placeholder="Middle name"
            className="search-seats-input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            ref={input => (ref.current["lastName"] = input)}
            placeholder="Last name"
            className="search-seats-input"
          />
        </Form.Group>
        <Button variant="dark m-1 text-white outline-dark-outline" onClick={reset}>
          Reset
        </Button>
        <Button variant="primary m-1" onClick={search}>
          Search
        </Button>
      </Form>
    </div>
  );
};

const forwardedSearchPassengerForm = React.forwardRef(SearchSeat);
export default forwardedSearchPassengerForm;

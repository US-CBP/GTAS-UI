// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Form, Button } from "react-bootstrap";
import { asArray, hasData } from "../../../utils/utils";

const SearchSeat = ({ searchCallback, reservedSeats }, ref) => {
  const areEqual = (str1, str2) => {
    return str1.toUpperCase() === str2.toUpperCase();
  };

  const search = () => {
    const firstName = ref.current["firstName"].value;
    const lastName = ref.current["lastName"].value;
    const middleName = ref.current["middleName"].value;

    const searchResult = asArray(reservedSeats).reduce((result, currentSeat) => {
      const currentFirstName = currentSeat.firstName;
      const currentLastName = currentSeat.lastName;
      const currentMiddleName = currentSeat.middleInitial;

      //No value provided to search on (returns an empty array)
      if (!hasData(firstName) && !hasData(middleName) && !hasData(lastName)) {
        return result;
      }

      //Search by first, middle, and last name
      if (hasData(firstName) && hasData(middleName) && hasData(lastName)) {
        if (
          areEqual(currentFirstName, firstName) &&
          areEqual(currentMiddleName, middleName) &&
          areEqual(currentLastName, lastName)
        ) {
          result.push(currentSeat.number);
        }
      }

      //Search by first and midlle name
      else if (hasData(firstName) && hasData(middleName)) {
        if (
          areEqual(currentFirstName, firstName) &&
          areEqual(currentMiddleName, middleName)
        ) {
          result.push(currentSeat.number);
        }
      }

      //Search by first and last name
      else if (hasData(firstName) && hasData(lastName)) {
        if (
          areEqual(currentFirstName, firstName) &&
          areEqual(currentLastName, lastName)
        ) {
          result.push(currentSeat.number);
        }
      }
      //Search by middle and last name
      else if (hasData(middleName) && hasData(lastName)) {
        if (
          areEqual(currentMiddleName, middleName) &&
          areEqual(currentLastName, lastName)
        ) {
          result.push(currentSeat.number);
        }
      }
      //Search by first name
      else if (hasData(firstName)) {
        if (areEqual(currentFirstName, firstName)) {
          result.push(currentSeat.number);
        }
      }
      //Search by middle name
      else if (hasData(middleName)) {
        if (areEqual(currentMiddleName, middleName)) {
          result.push(currentSeat.number);
        }
      }
      //Search by last name
      else if (hasData(lastName)) {
        if (areEqual(currentLastName, lastName)) {
          result.push(currentSeat.number);
        }
      }

      return result;
    }, []);

    searchCallback(searchResult);
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
        <Button variant="secondary" onClick={search}>
          Search
        </Button>
      </Form>
    </div>
  );
};

const forwardedSearchPassengerForm = React.forwardRef(SearchSeat);
export default forwardedSearchPassengerForm;

// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Col } from "react-bootstrap";
import { asArray, hasData, alt } from "../../../utils/utils";
import Xl8 from "../../xl8/Xl8";
import FilterForm from "../../filterForm2/FilterForm";
import LabelledInput from "../../labelledInput/LabelledInput";

const SearchSeat = ({ searchCallback, reservedSeats, resetFilterForm }, ref) => {
  const areEqual = (str1, str2) => {
    return alt(str1).toUpperCase() === alt(str2).toUpperCase();
  };

  const cb = () => {};

  // this does nothing but it satisfies FilterForm's service fxn requirement.
  // we don't need a service since we are just filtering the data the parent provides us.
  const noop = () => {
    return new Promise((resolve, err) => {
      return resolve();
    });
  };

  // Filter the existing data and call the parent callback directly
  const search = ev => {
    const searchFields = [];
    if (hasData(ev["firstName"])) searchFields.push("firstName");
    if (hasData(ev["lastName"])) searchFields.push("lastName");
    if (hasData(ev["middleName"])) searchFields.push("middleName");

    //If we don't have any fields to compare, return an empty array.
    if (searchFields.length === 0) {
      searchCallback([]);
    } else {
      const searchResult = asArray(reservedSeats).reduce((result, currentSeat) => {
        let match = true;

        searchFields.forEach(searchField => {
          if (!areEqual(currentSeat[searchField], ev[searchField])) {
            match = false;
            return;
          }
        });

        if (match) {
          result.push(currentSeat.number);
        }

        return result;
      }, []);

      return searchCallback(searchResult);
    }
  };

  return (
    <>
      <Col className="notopmargin">
        <FilterForm service={noop} paramCallback={search} callback={cb}>
          <LabelledInput
            labelText={<Xl8 xid="fl003">First Name</Xl8>}
            name="firstName"
            datafield
            inputtype="text"
            callback={cb}
            alt="First Name"
          />
          <LabelledInput
            labelText={<Xl8 xid="fl004">Middle Name</Xl8>}
            name="middleName"
            datafield
            inputtype="text"
            callback={cb}
            alt="Middle Name"
          />
          <LabelledInput
            datafield
            name="lastName"
            labelText={<Xl8 xid="fl005">Last Name</Xl8>}
            inputtype="text"
            callback={cb}
            alt="Last Name"
          />
        </FilterForm>
      </Col>
    </>
  );
};

const forwardedSearchPassengerForm = React.forwardRef(SearchSeat);
export default forwardedSearchPassengerForm;

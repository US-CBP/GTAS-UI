/*
 *
 *  * All Application code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
 *  *
 *  * Please see LICENSE.txt for details.
 *
 */

import React, {useEffect, useState} from "react";
import GroupCheckBox from "./GroupCheckBox";
import LabelledInputDisplayWrapper from "../LabelledInputDecorator";
import {roles} from "../../../services/serviceWrapper";

const CheckboxGroup = props => {
  const [values, setValues] = useState([...props.inputVal]);

  const handleFieldChange = id => {
    const newValues = [...values];
    newValues[id] = { ...newValues[id], checked: !newValues[id].checked };
    setValues(newValues);
    const filterFormUpdate = {
      name: props.name,
      value: newValues
    };
    props.callback(filterFormUpdate);
  };

  //This is to load init values into the form the checkbox belongs to. i.e. default check values
  const init = () =>{
      const filterFormUpdate = {
          name:props.name,
          value:values
        };
    props.callback(filterFormUpdate)
  }

  //This is to trigger initial form state for default values. Otherwise they're empty if no change is ever made.
  useEffect(() => {
    if (typeof values != "undefined" && values.length >= 0) {
      init();
    }
  }, []);

  let theCheckboxes = values.map((checkBox, index) => {
    return (
      <GroupCheckBox
        key={index}
        id={index}
        name={checkBox.label}
        type={checkBox.type}
        onChange={handleFieldChange}
        value={checkBox.checked}
        checked={checkBox.checked}
        disabled={checkBox.disabled}
      />
    );
  });
  // useful debugging statement: <pre>{JSON.stringify(values, null, 2)}</pre>
  return <div>{theCheckboxes}</div>;
};

export default LabelledInputDisplayWrapper(CheckboxGroup);

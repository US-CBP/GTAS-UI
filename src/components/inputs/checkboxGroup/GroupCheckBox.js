/*
 *
 *  * All Application code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
 *  *
 *  * Please see LICENSE.txt for details.
 *
 */

import React from "react";

const GroupCheckBox = ({ value, onChange, id, name, disabled }) => {
  const handleChange = event => {
    const text = event.target.value;
    onChange(id, text);
  };

  return (
    <div className="form-inline space-between">
      <label>{name}</label>
      <input type="checkbox" disabled={disabled} onChange={handleChange} checked={value} value={value} />
    </div>
  );
};

export default GroupCheckBox;

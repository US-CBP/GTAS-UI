// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { titleCase } from "../../../utils/utils";

/**
 * **DO NOT USE**
 *
 * **Checkbox with useRef and useEffect. Will eventually be merged with Checkbox**
 */
const ICheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
      {` ${titleCase(rest.text)}`}
    </>
  );
});

export default ICheckbox;

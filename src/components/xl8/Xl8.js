// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect, useContext } from "react";
import { LiveEditContext } from "../../context/translation/LiveEditContext";
import { useTranslation } from "react-i18next";

const Xl8 = props => {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState();

  const tprops = {
    xid: props.xid,
    orig: props.children?.toString(),
    trans: t(props.xid, "")
  };

  const [translationProps] = useState(tprops);
  const { getLiveEditState, action, setShowModal } = useContext(LiveEditContext);

  const handleClick = ev => {
    ev.stopPropagation();
    ev.preventDefault();
    action({ type: "show", data: translationProps });
    setShowModal(true);
  };

  useEffect(() => {
    const editstate = getLiveEditState();
    setIsEdit(editstate.isEdit);
  }, []);

  //Force default to the default English text rather than the translation ID (xid)
  const cleanTrans = (xid, defaultText) => {
    const attemptedTrans = t(xid);
    return attemptedTrans === xid ? defaultText : attemptedTrans;
  };

  return isEdit ? (
    <span {...translationProps} onClick={handleClick} className="xid">
      {cleanTrans(props.xid, props.children)}
    </span>
  ) : (
    <span {...props}>{cleanTrans(props.xid, props.children)}</span>
  );
};

export default Xl8;

import React, { useState, useEffect, useContext } from "react";
import { hasData } from "../../utils/utils";
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

  return isEdit ? (
    <span {...translationProps} onClick={handleClick} className="xid">
      {t(props.xid, props.children)}
    </span>
  ) : (
    <span {...props}>{t(props.xid, props.children)}</span>
  );
};

export default Xl8;

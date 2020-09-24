import React, { useState, useEffect, useContext } from "react";
import LangModal from "../../pages/home/LangModal";
import { hasData } from "../../utils/utils";
import { LiveEditContext } from "../../context/translation/LiveEditContext";
import { useTranslation } from "react-i18next";

const Xid = props => {
  const [t, i18n] = useTranslation();
  const [isEdit, setIsEdit] = useState();
  const hideModal = () => setShowModal(false);
  const [xid, setXid] = useState();
  const tprops = {
    xid: props.xid,
    orig: props.children.toString(),
    trans: t(props.children),
    lang: i18n.language
  };
  const [elem, setElem] = useState(tprops);
  const [translationProps] = useState(tprops);
  const { getLiveEditState, action, setShowModal } = useContext(LiveEditContext);

  const handleClick = ev => {
    ev.stopPropagation();
    ev.preventDefault();

    const elem = ev.target?.attributes;
    const callShow = action({ type: "show", data: translationProps });
    setShowModal(true);
    // const callAction = action({ type: "edit" });

    // if (hasData(elem)) {
    //   setShowModal(true);
    //   // setElem(translationProps);
    // }
  };

  useEffect(() => {
    const editstate = getLiveEditState();
    setIsEdit(editstate.isEdit);
  }, []);

  // const initialResult = isEdit ? (
  //   <span {...translationProps} onClick={handleClick} className="xid">
  //     {t(props.children, props.children)}
  //   </span>
  // ) : (
  //   <span xid={props.xid}>{t(props.children, props.children)}</span>
  // );

  // const [result, setResult] = useState(initialResult);

  return isEdit ? (
    <span {...translationProps} onClick={handleClick} className="xid">
      {t(props.children, props.children)}
    </span>
  ) : (
    <span xid={props.xid}>{t(props.children, props.children)}</span>
  );
};

export default Xid;

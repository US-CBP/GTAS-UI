import React, { useState, useEffect } from "react";
import LangModal from "../../pages/home/LangModal";
import { hasData } from "../../utils/utils";
import { useTranslation } from "react-i18next";

const Xid = props => {
  const [t, i18n] = useTranslation();
  const [isEdit, setIsEdit] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => setShowModal(false);
  const [xid, setXid] = useState();
  const tprops = {
    xid: props.xid,
    orig: props.children.toString(),
    trans: t(props.children)
  };
  const [elem, setElem] = useState(tprops);
  const [translationProps] = useState(tprops);

  const handleClick = ev => {
    ev.preventDefault();

    const elem = ev.target?.attributes;

    if (hasData(elem)) {
      setShowModal(true);
      // setElem(translationProps);
    }
  };

  const initialResult = isEdit ? (
    <span {...translationProps} onClick={handleClick} className="xid">
      {t(props.children, props.children)}
    </span>
  ) : (
    <span xid={props.xid}>{t(props.children, props.children)}</span>
  );
  const [result, setResult] = useState(initialResult);

  return (
    <>
      {result}
      {elem && (
        <LangModal
          show={showModal}
          onHide={hideModal}
          elem={translationProps}
        ></LangModal>
      )}
    </>
  );
};

export default Xid;

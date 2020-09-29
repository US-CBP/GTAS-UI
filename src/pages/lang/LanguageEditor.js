import React, { useState, useEffect, useContext } from "react";
import { hasData } from "../../utils/utils";
import { LiveEditContext } from "../../context/translation/LiveEditContext";
import Title from "../../components/title/Title";
import Table from "../../components/table/Table";
import Main from "../../components/main/Main";
import Xl8 from "../../components/xl8/Xl8";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { translations } from "../../services/serviceWrapper";
import { useTranslation } from "react-i18next";

const LanguageEditor = () => {
  const { getLiveEditState, action } = useContext(LiveEditContext);

  const [isEdit, setIsEdit] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState();
  const [t, i18n] = useTranslation();

  const currentLanguage = window.navigator.language.split("-")[0];

  const cb = () => {};
  const handleClick = ev => {
    const actionText = ev.value ? "edit" : "read";

    action({ type: actionText });
    setIsEdit(ev.value);
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    if (refresh > 0) window.location.reload();
  }, [refresh]);

  useEffect(() => {
    const editstate = getLiveEditState();
    setIsEdit(editstate.isEdit);

    translations.get().then(res => {
      setData(res);
    });
  }, []);

  // useEffect(() => {
  //   // setKey((key || 0) + 1);
  //   console.log("ON ISEDIT CHANGE isedit", isEdit);
  // }, [isEdit]);

  // useEffect(() => {
  //   console.log("key:", key);
  // }, [key]);

  // const modeInput = (
  //   <LabelledInput
  //     inputType="text"
  //     labelText={<Xl8 xid="0">Enable Live Edit mode?</Xl8>}
  //     inputVal={isEdit}
  //     spacebetween
  //     callback={handleClick}
  //     onClick={handleClick}
  //     key={key}
  //   >
  //     {isEdit}
  //   </LabelledInput>
  // );

  return (
    <Main className="full" key={isEdit}>
      <Title
        title={<Xl8 xid="led001">Language Editor</Xl8>}
        rightChild={
          <LabelledInput
            inputType="checkbox"
            labelText={<Xl8 xid="led002">Enable Live Edit mode?</Xl8>}
            selected={isEdit}
            spacebetween
            callback={handleClick}
          ></LabelledInput>
        }
      ></Title>
      <Table
        data={data}
        id="Queries"
        callback={cb}
        key={data}
        // header={header}
      ></Table>
    </Main>
  );
};

export default LanguageEditor;

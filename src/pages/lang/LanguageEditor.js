import React, { useState, useEffect, useContext } from "react";
import { hasData } from "../../utils/utils";
import { LiveEditContext } from "../../context/translation/LiveEditContext";
import Title from "../../components/title/Title";
import Table from "../../components/table/Table";
import Main from "../../components/main/Main";
import Xid from "../../components/xid/Xid";
import LabelledInput from "../../components/labelledInput/LabelledInput";

const LanguageEditor = () => {
  const { getLiveEditState, action } = useContext(LiveEditContext);

  const [isEdit, setIsEdit] = useState(0);
  const [refresh, setRefresh] = useState(0);

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
    console.log("ONLOAD  isedit", editstate.isEdit);
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
  //     labelText={<Xid xid="0">Enable Live Edit mode?</Xid>}
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
        title={<Xid xid="0">Language Editor</Xid>}
        rightChild={
          <LabelledInput
            inputType="checkbox"
            labelText={<Xid xid="3">Enable Live Edit mode?</Xid>}
            selected={isEdit}
            spacebetween
            callback={handleClick}
          ></LabelledInput>
        }
      ></Title>
    </Main>
  );
};

export default LanguageEditor;

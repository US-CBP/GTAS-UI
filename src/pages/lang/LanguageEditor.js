// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect, useContext } from "react";
import { LiveEditContext } from "../../context/translation/LiveEditContext";
import Title from "../../components/title/Title";
import Table from "../../components/table/Table";
import Main from "../../components/main/Main";
import Xl8 from "../../components/xl8/Xl8";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { translations } from "../../services/serviceWrapper";
import { useTranslation } from "react-i18next";
import "./LanguageEditor.css";

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

  const header = [
    {
      Accessor: "id",
      Xl8: true,
      Header: ["led003", "ID"]
    },
    {
      Accessor: "code",
      Xl8: true,
      Header: ["led004", "Code"]
    },
    {
      Accessor: "language",
      Xl8: true,
      Header: ["led005", "Language"]
    },
    {
      Accessor: "translation",
      Xl8: true,
      Header: ["led006", "Translation"]
    }
  ];

  return (
    <Main className="full bg-white" key={isEdit}>
      <Title
        title={<Xl8 xid="led001">Language Editor</Xl8>}
        rightChild={
          <div className="liveedit">
            <LabelledInput
              inputType="checkbox"
              labelText={<Xl8 xid="led002">Live Edit</Xl8>}
              selected={isEdit}
              spacebetween
              callback={handleClick}
            ></LabelledInput>
          </div>
        }
      ></Title>
      <Table data={data} id="Queries" callback={cb} key={data} header={header}></Table>
    </Main>
  );
};

export default LanguageEditor;

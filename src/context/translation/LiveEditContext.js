// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { createContext, useReducer, useState } from "react";
import LangModal from "../../pages/home/LangModal";

export const LiveEditContext = createContext();
const LIVEEDITSTATE = "liveEditState";

const LiveEditProvider = ({ children }) => {
  const [showModal, setShowModal] = useState();
  const { Provider } = LiveEditContext;

  const LiveEditReducer = (state, action) => {
    let updatedState = JSON.parse(sessionStorage.getItem(LIVEEDITSTATE)) || {};

    switch (action.type) {
      case "show": {
        updatedState.data = action.data;
        sessionStorage.setItem(LIVEEDITSTATE, JSON.stringify(updatedState));
        return updatedState;
      }
      case "hide": {
        setShowModal(false);
        return updatedState;
      }
      case "edit": {
        updatedState.isEdit = true;
        sessionStorage.setItem(LIVEEDITSTATE, JSON.stringify(updatedState));
        return updatedState;
      }
      case "dataloaded": {
        updatedState.dataloaded = action.isDataLoaded;
        sessionStorage.setItem(LIVEEDITSTATE, JSON.stringify(updatedState));
        return updatedState;
      }
      case "read": {
        updatedState.isEdit = false;
        updatedState.data = null;
        sessionStorage.setItem(LIVEEDITSTATE, JSON.stringify(updatedState));
        return updatedState;
      }
      default: {
        return updatedState;
      }
    }
  };

  const initContext = {
    hideModal: () => null,
    show: false,
    showModal: () => null,
    isEdit: false,
    data: null,
    dataloaded: false
  };
  const [editState, action] = useReducer(LiveEditReducer, initContext);

  const getLiveEditState = () => {
    const stored = JSON.parse(sessionStorage.getItem(LIVEEDITSTATE));

    return stored || editState;
  };

  const onHide = () => {
    setShowModal(false);
  };

  return (
    <Provider value={{ getLiveEditState, action, setShowModal }}>
      <>
        {children}
        <LangModal show={showModal} elem={editState.data} onHide={onHide}></LangModal>
      </>
    </Provider>
  );
};

export default LiveEditProvider;

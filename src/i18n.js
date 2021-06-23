// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "./fetch";
import { preauthtranslations } from "./services/serviceWrapper";

const lang = window.navigator.language.split("-")[0];

let prefetchedData = [];

export const getI18n = () =>
  preauthtranslations.get(lang).then(data => {
    const backendOptions = {
      parse: function() {
        return prefetchedData;
      }
    };

    let keyvals = {};

    if (Array.isArray(data)) {
      data.forEach(item => {
        keyvals[item["code"]] = item["translation"];
      });
      prefetchedData = keyvals;
      setTranslationStatus(true);
    } else setTranslationStatus(false);

    return i18n
      .use(initReactI18next)
      .use(Backend)
      .init({
        lng: lang,
        fallbackLng: "en",
        backend: backendOptions,
        keySeparator: false,
        // debug: true,
        interpolation: { escapeValue: false }
      });
  });

getI18n();

i18n.on("failedLoading", function(lng, ns, msg) {
  //apb test
  console.error("Translation fetch failed");
});

const setTranslationStatus = val => {
  let initState = {
    hideModal: () => null,
    show: false,
    showModal: () => null,
    isEdit: false,
    data: null,
    dataloaded: false
  };

  const LIVEEDITSTATE = "liveEditState";
  let currentState = JSON.parse(sessionStorage.getItem(LIVEEDITSTATE)) || initState;

  currentState.dataloaded = val;
  sessionStorage.setItem(LIVEEDITSTATE, JSON.stringify(currentState));
};

export default i18n;

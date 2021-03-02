// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "./fetch";
import { translations } from "./services/serviceWrapper";
import { hasData } from "./utils/utils";

const lang = window.navigator.language;
let prefetchedData = [];

const backendOptions = {
  fxn: translations.get,
  parse: function() {
    return prefetchedData;
  }
};

translations.get(lang).then(data => {
  let keyvals = {};
  if (!hasData(data)) return [];

  data.forEach(item => {
    keyvals[item["code"]] = item["translation"];
  });

  prefetchedData = keyvals;

  i18n
    .use(initReactI18next)
    .use(Backend)
    .init({
      lng: lang,
      fallbackLng: lang,
      backend: backendOptions,
      keySeparator: false,
      // debug: true,
      interpolation: { escapeValue: false }
    });
});

export default i18n;

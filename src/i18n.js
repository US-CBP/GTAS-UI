// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import Cookies from "js-cookie";

let browserlang = window.navigator.language.split("-")[0];

const BASE_URL = process.env.REACT_APP_BASE_URL;
const loadpath = `${BASE_URL}gtas/api/translation/${browserlang}`;

const backendOptions = {
  requestOptions: {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json, text/plain, */*",
      Cookie: `JSESSIONID: ${Cookies.get("JSESSIONID")}`,
      router: "api"
    },
    credentials: "include"
  },
  loadPath: loadpath,
  parse: dataset => {
    let keyvals = {};

    JSON.parse(dataset).forEach(item => {
      keyvals[item["code"]] = item["translation"];
    });

    return keyvals;
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    // lng: "fr",
    // fallbackLng: "en",
    keySeparator: false,
    backend: backendOptions
    // debug: true
    // interpolation: { escapeValue: false }
  });

export default i18n;

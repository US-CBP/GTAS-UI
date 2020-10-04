import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import Cookies from "js-cookie";

// see translation files at '../public/locales/[lang]/translation.json'

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json, text/plain, */*",
    Cookie: `JSESSIONID: ${Cookies.get("JSESSIONID")}`
  },
  credentials: "include"
};

// let testlang = window.navigator.language; //.split("-")[0];
let testlang = window.navigator.language.split("-")[0];
// console.log(testlang);

const backendOptions = {
  requestOptions: {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json, text/plain, */*",
      Cookie: `JSESSIONID: ${Cookies.get("JSESSIONID")}`
    },
    credentials: "include"
  },
  loadPath: `http://localhost:8080/gtas/api/translation/${testlang}`,
  parse: dataset => {
    let keyvals = {};

    JSON.parse(dataset).forEach(item => {
      keyvals[item["code"]] = item["translation"];
    });

    // console.log(keyvals);

    return keyvals;
  }
  // addPath: `/locales/${testlang}/{{ns}}`
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

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

// const testFxn = (options, url, payload, callback) => {};

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
  loadPath: "http://localhost:8080/gtas/api/translation/{{lng}}",
  parse: function(data) {
    console.log(data);
    let parsed = {};
    data.forEach(item => {
      parsed[item["code"]] = item["translation"];
    });

    return parsed;
  },
  addPath: "/locales/{{lng}}/{{ns}}"
};

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    // lng: "fr",
    fallbackLng: "en",
    keySeparator: false,
    backend: backendOptions,
    debug: true,
    interpolation: { escapeValue: false }
  });

export default i18n;

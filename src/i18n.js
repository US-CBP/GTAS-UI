import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// see translation files at '../public/locales/[lang]/translation.json'

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: "fr",
    fallbackLng: "en",
    keySeparator: false,
    // debug: true,
    interpolation: { escapeValue: false }
  });

export default i18n;

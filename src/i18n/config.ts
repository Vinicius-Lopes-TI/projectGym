// Import Dependencies
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Local Imports
import { type LocaleCode, supportedLanguages } from "./langs";

// ----------------------------------------------------------------------

export const defaultLang: LocaleCode = "en";
export const fallbackLang: LocaleCode = "en";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "i18nextLng",
      lookupSessionStorage: "i18nextLng",
    },
    fallbackLng: fallbackLang,
    lng: localStorage.getItem("i18nextLng") || defaultLang,
    supportedLngs: supportedLanguages,
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
    },
    lowerCaseLng: true,
    debug: false,
  });

i18n.languages = supportedLanguages;

export default i18n;

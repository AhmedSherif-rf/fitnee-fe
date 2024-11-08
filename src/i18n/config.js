import i18n from "i18next";
import functions from "../utils/functions";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE } from "../utils/constants";
import LanguageDetector from "i18next-browser-languagedetector";

const currentLanguage = functions.getLanguageFromStorage();

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: currentLanguage === null ? DEFAULT_LANGUAGE : currentLanguage,
    lng: currentLanguage === null ? DEFAULT_LANGUAGE : currentLanguage,
    debug: true,
    detection: {
      order: ["navigator"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    resources: {
      en: {
        translations: require("./locales/en/translations.json"),
      },
      ar: {
        translations: require("./locales/ar/translations.json"),
      },
    },
    ns: ["translations"],
    defaultNS: "translations",
  });

i18n.languages = ["en", "ar"];

export default i18n;

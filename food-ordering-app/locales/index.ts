import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { I18nManager, Platform, DevSettings } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./en.json";
import fa from "./fa.json";

const supportedLanguages = ["en", "fa"] as const;
type SupportedLanguage = (typeof supportedLanguages)[number];

const deviceLanguageCode = (
  Localization.getLocales?.()[0]?.languageCode || "en"
).toLowerCase() as SupportedLanguage | string;

const initialLanguage: SupportedLanguage = supportedLanguages.includes(
  deviceLanguageCode as SupportedLanguage
)
  ? (deviceLanguageCode as SupportedLanguage)
  : "en";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources: {
    en: { translation: en },
    fa: { translation: fa },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  returnNull: false,
});

(async () => {
  try {
    const stored = await AsyncStorage.getItem("appLanguage");
    if (stored && supportedLanguages.includes(stored as SupportedLanguage)) {
      const enableRtl = stored === "fa";
      if (I18nManager.isRTL !== enableRtl) {
        I18nManager.allowRTL(enableRtl);
        I18nManager.forceRTL(enableRtl);
        if (Platform.OS === "web") {
          window?.location?.reload?.();
        } else {
          DevSettings.reload();
        }
      }
      i18n.changeLanguage(stored);
    }
  } catch {}
})();

export default i18n;

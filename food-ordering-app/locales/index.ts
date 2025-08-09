import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

import en from './en.json';
import fa from './fa.json';

const supportedLanguages = ['en', 'fa'] as const;
type SupportedLanguage = (typeof supportedLanguages)[number];

const deviceLanguageCode = (Localization.getLocales?.()[0]?.languageCode || 'en')
  .toLowerCase() as SupportedLanguage | string;

const initialLanguage: SupportedLanguage = supportedLanguages.includes(
  deviceLanguageCode as SupportedLanguage,
)
  ? (deviceLanguageCode as SupportedLanguage)
  : 'en';

if (initialLanguage === 'fa' && !I18nManager.isRTL) {
  I18nManager.allowRTL(true);
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    en: { translation: en },
    fa: { translation: fa },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  returnNull: false,
});

export default i18n;



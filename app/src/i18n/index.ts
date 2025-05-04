import EN_TRANSLATIONS from '@/assets/i18n/en.json'
import { DEFAULT_LANGUAGE } from '@/constants'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: EN_TRANSLATIONS,
    },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,

  interpolation: {
    escapeValue: false,
  },
})

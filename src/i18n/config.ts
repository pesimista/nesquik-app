import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es'
import en from './locales/en'

void i18next.use(initReactI18next).init({
  lng: 'es',
  // debug: true,
  resources: { es, en },
  defaultNS: 'common',
})

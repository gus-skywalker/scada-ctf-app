import { createI18n } from 'vue-i18n';

// Importando traduções separadas
import en from './assets/locales/en.json';
import pt from './assets/locales/pt.json';

export const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'pt',
  messages: {
    en,
    pt,
  },
});

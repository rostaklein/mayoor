import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import cs from './locales/cs/translation.json';

// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		lng: 'en',
		fallbackLng: 'en',
		debug: process.env.NODE_ENV === 'development',
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		resources: {
			en: {
				translation: en,
			},
			cs: {
				translation: cs,
			},
		},
	});

export default i18n;

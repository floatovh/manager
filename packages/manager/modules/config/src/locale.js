import { STORAGE_KEY, LOCALES } from './locale.constants';

function getUserLocale({ region }) {
  const { localStorage, navigator } = window;
  let locale = LOCALES.default;

  // fetch locale from local storage, then navigator preferences
  if (localStorage[STORAGE_KEY]) {
    locale = localStorage[STORAGE_KEY];
  } else if (navigator.language || navigator.userLanguage) {
    locale = navigator.language || navigator.userLanguage;
  }

  // normalize locale
  locale = locale.replace('-', '_');

  // extract language and country
  let [, language, country] = locale.match(/^([a-zA-Z]+)(?:_([a-zA-Z]+))?$/);

  // handle nl language special case
  if (language === 'nl') {
    language = 'en';
    country = 'GB';
  }

  // if no country is given, find the preferred country depending on region
  if (!country) {
    country = (LOCALES.preferred[language] || {})[region];
  }

  locale = `${language.toLowerCase()}_${country.toUpperCase()}`;

  // if locale is not available, find one with same language
  if (LOCALES.available.map(({ key }) => key).indexOf(locale) < 0) {
    let found = false;
    LOCALES.available.forEach((available) => {
      if (found) {
        return;
      }
      const [lang] = available.key.split('_');
      if (lang === language.toLowerCase()) {
        locale = available.key;
        found = true;
      }
    });
    if (!found) {
      locale = LOCALES.default;
    }
  }

  return locale;
}

export default getUserLocale;

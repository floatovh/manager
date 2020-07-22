import _Environment from './environment';
import {
  detectUserLocale as _detectUserLocale,
  findLanguage as _findLanguage,
} from './locale';
import { LANGUAGES as _LANGUAGES } from './locale/locale.constants';

export const Environment = _Environment;
export const detectUserLocale = _detectUserLocale;
export const findLanguage = _findLanguage;
export const LANGUAGES = _LANGUAGES;

export default {
  Environment,
  detectUserLocale,
  findLanguage,
  LANGUAGES,
};

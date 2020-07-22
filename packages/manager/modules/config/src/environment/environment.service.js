import { LANGUAGES } from '../locale/locale.constants';
import { saveUserLocale, findAvailableLocale } from '../locale';

export default class EnvironmentService {
  constructor() {
    this.region = 'EU';
    this.userLocale = LANGUAGES.defaultLoc;
    this.version = null;
  }

  setRegion(region = 'EU') {
    this.region = region;
  }

  getRegion() {
    return this.region;
  }

  setUserLocale(userLocale) {
    const locale = findAvailableLocale(userLocale, this.getRegion());
    saveUserLocale(locale);
    this.userLocale = locale;
  }

  getUserLocale(min) {
    return min ? this.userLocale.split('-')[0] : this.userLocale;
  }

  setVersion(version) {
    this.version = version;
  }

  getVersion() {
    return this.version;
  }
}

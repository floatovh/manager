import 'script-loader!jquery'; // eslint-disable-line
import 'script-loader!moment/min/moment-with-locales.min'; // eslint-disable-line

import angular from 'angular';
import ovhManagerCore from '@ovh-ux/manager-core';
import ovhManagerVeeamCloudConnect from '@ovh-ux/manager-veeam-cloud-connect';
import { Environment, detectUserLocale } from '@ovh-ux/manager-config';

Environment.setRegion(__WEBPACK_REGION__);
Environment.setUserLocale(detectUserLocale());

angular
  .module('veeamCloudConnectApp', [ovhManagerCore, ovhManagerVeeamCloudConnect])
  .config(
    /* @ngInject */ () => {
      const defaultLanguage = Environment.getUserLocale(true);
      moment.locale(defaultLanguage);
    },
  );

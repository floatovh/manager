import 'script-loader!jquery'; // eslint-disable-line
import 'script-loader!lodash'; // eslint-disable-line
import telecomDashboard from '@ovh-ux/manager-telecom-dashboard';

import angular from 'angular';
import { Environment, detectUserLocale } from '@ovh-ux/manager-config';

Environment.setUserLocale(detectUserLocale());

angular.module('telecomDashboardApp', [telecomDashboard]);

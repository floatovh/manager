import 'script-loader!jquery'; // eslint-disable-line
import 'script-loader!lodash'; // eslint-disable-line

import angular from 'angular';
import { Environment, detectUserLocale } from '@ovh-ux/manager-config';
import ovhManagerTelecomTask from '@ovh-ux/manager-telecom-task';

Environment.setUserLocale(detectUserLocale());

angular.module('telecomTaskApp', [ovhManagerTelecomTask]);

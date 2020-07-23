import angular from 'angular';

import component from './view-service-key.component';
import routing from './view-service-key.routing';

const moduleName = 'ovhCloudConnectViewServiceKey';

angular
  .module(moduleName, [])
  .config(routing)
  .component('cloudConnectViewServiceKey', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

import angular from 'angular';

import component from './service-keys.component';
import routing from './service-keys.routing';

const moduleName = 'ovhCloudConnectServiceKeys';

angular
  .module(moduleName, [])
  .config(routing)
  .component('cloudConnectServiceKeys', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

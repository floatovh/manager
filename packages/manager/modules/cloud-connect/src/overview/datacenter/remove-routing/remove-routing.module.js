import angular from 'angular';

import component from './remove-routing.component';
import routing from './remove-routing.routing';

const moduleName = 'ovhCloudConnectRemoveRouting';

angular
  .module(moduleName, [])
  .config(routing)
  .component('cloudConnectRemoveRouting', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

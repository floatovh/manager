import angular from 'angular';
import '@uirouter/angularjs';

import component from './add-routing.component';
import routing from './add-routing.routing';

const moduleName = 'ovhCloudConnectDatacenterAdd';

angular
  .module(moduleName, ['ui.router'])
  .config(routing)
  .component('cloudConnectDatacenterAddRouting', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

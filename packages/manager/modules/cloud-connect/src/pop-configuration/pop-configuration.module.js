import angular from 'angular';

import component from './pop-configuration.component';
import routing from './pop-configuration.routing';

const moduleName = 'ovhCloudConnectPopConfiguration';

angular
  .module(moduleName, [])
  .config(routing)
  .component('cloudConnectPopConfiguration', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

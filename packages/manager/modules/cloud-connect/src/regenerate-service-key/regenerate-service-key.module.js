import angular from 'angular';

import component from './regenerate-service-key.component';
import routing from './regenerate-service-key.routing';

const moduleName = 'ovhCloudConnectRegenerateServiceKey';

angular
  .module(moduleName, [])
  .config(routing)
  .component('cloudConnectRegenerateServiceKey', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

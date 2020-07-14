import angular from 'angular';

import component from './component';
import routing from './routing';
import service from './cloud-connect.service';

const moduleName = 'ovhCloudConnect';

angular
  .module(moduleName, [])
  .config(routing)
  .component(
    'cloudConnect',
    component,
  )
  .service('cloudConnectService', service)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

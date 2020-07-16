import angular from 'angular';

import associateVrack from './associate-vrack';
import component from './cloud-connect.component';
import removeVrack from './remove-vrack';
import routing from './cloud-connect.routing';
import service from './cloud-connect.service';

const moduleName = 'ovhCloudConnect';

angular
  .module(moduleName, [
    associateVrack,
    removeVrack,
  ])
  .config(routing)
  .component(
    'cloudConnect',
    component,
  )
  .service('cloudConnectService', service)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

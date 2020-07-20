import angular from 'angular';

import associateVrack from './associate-vrack';
import component from './cloud-connect.component';
import editDescription from './edit-description';
import removeVrack from './remove-vrack';
import routing from './cloud-connect.routing';
import popConfiguration from './pop-configuration';
import service from './cloud-connect.service';

import datacenterAdd from './datacenter/add';

const moduleName = 'ovhCloudConnect';

angular
  .module(moduleName, [
    associateVrack,
    editDescription,
    datacenterAdd,
    removeVrack,
    popConfiguration,
  ])
  .config(routing)
  .component('cloudConnect', component)
  .service('cloudConnectService', service)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

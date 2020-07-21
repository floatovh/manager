import angular from 'angular';

import addPopConfiguration from './add-pop-configuration';
import associateVrack from './associate-vrack';
import component from './cloud-connect.component';
import editDescription from './edit-description';
import lockPort from './lock-port';
import removePopConfiguration from './remove-pop-configuration';
import removeVrack from './remove-vrack';
import routing from './cloud-connect.routing';
import service from './cloud-connect.service';
import unlockPort from './unlock-port';

import datacenterAdd from './datacenter/add';

const moduleName = 'ovhCloudConnect';

angular
  .module(moduleName, [
    addPopConfiguration,
    associateVrack,
    editDescription,
    lockPort,
    removePopConfiguration,
    datacenterAdd,
    removeVrack,
    unlockPort,
  ])
  .config(routing)
  .component('cloudConnect', component)
  .service('cloudConnectService', service)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

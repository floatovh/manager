import angular from 'angular';

import component from './overview.component';
import routing from './overview.routing';

import addPopConfiguration from './add-pop-configuration';
import associateVrack from './associate-vrack';
import editDescription from './edit-description';
import lockPort from './lock-port';
import regenerateServiceKey from './regenerate-service-key';
import removePopConfiguration from './remove-pop-configuration';
import removeVrack from './remove-vrack';
import sendServiceKey from './send-service-key';
import unlockPort from './unlock-port';
import viewServiceKey from './view-service-key';
import datacenterAdd from './datacenter/add';
import datacenterAddRouting from './datacenter/add-routing';
import removeDatacenterConfiguration from './datacenter/remove-datacenter';

const moduleName = 'ovhCloudConnectOverview';

angular
  .module(moduleName, [
    addPopConfiguration,
    associateVrack,
    datacenterAdd,
    datacenterAddRouting,
    editDescription,
    lockPort,
    regenerateServiceKey,
    removeDatacenterConfiguration,
    removePopConfiguration,
    removeVrack,
    unlockPort,
    viewServiceKey,
    sendServiceKey,
  ])
  .config(routing)
  .component('cloudConnectOverview', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

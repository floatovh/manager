import angular from 'angular';

import component from './cloud-connect.component';
import routing from './cloud-connect.routing';
import service from './cloud-connect.service';

import editDescription from './edit-description';

const moduleName = 'ovhCloudConnect';

angular
  .module(moduleName, [editDescription])
  .config(routing)
  .component('cloudConnect', component)
  .service('cloudConnectService', service)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

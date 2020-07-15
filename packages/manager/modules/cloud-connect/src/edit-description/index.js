import angular from 'angular';
import '@uirouter/angularjs';
import component from './edit-description.component';

const moduleName = 'cloudConnectEditDescription';

angular
  .module(moduleName, ['ui.router'])
  .config(
    /* @ngInject */ ($stateProvider) => {
      $stateProvider.state('cloud-connect.edit-description', {
        url: '/edit-description',
        views: {
          modal: {
            component: 'ovhCloudConnectEditDescription',
          },
        },
        layout: 'modal',
        resolve: {
          description: /* @ngInject */ ($transition$) =>
            $transition$.params().description,
        },
      });
    },
  )
  .component('ovhCloudConnectEditDescription', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

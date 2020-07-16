import angular from 'angular';
import '@uirouter/angularjs';
import component from './edit-description.component';

const moduleName = 'ovhCloudConnectEditDescription';

angular
  .module(moduleName, ['ui.router'])
  .config(
    /* @ngInject */ ($stateProvider) => {
      $stateProvider.state('cloud-connect.edit-description', {
        url: '/edit-description',
        views: {
          modal: {
            component: 'cloudConnectEditDescription',
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
  .component('cloudConnectEditDescription', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

import angular from 'angular';

import '@ovh-ux/manager-core';
import '@uirouter/angularjs';
import 'angular-translate';
import 'oclazyload';
import ngOvhCloudUniverseComponents from '@ovh-ux/ng-ovh-cloud-universe-components';

const moduleName = 'ovhCloudConnectRemoveRoutingLazyLoading';

angular
  .module(moduleName, [
    'ovhManagerCore',
    'pascalprecht.translate',
    'ui.router',
    'oc.lazyLoad',
    ngOvhCloudUniverseComponents,
  ])
  .config(
    /* @ngInject */ ($stateProvider) => {
      $stateProvider.state('cloud-connect.remove-routing.**', {
        url: '/remove-routing',
        lazyLoad: ($transition$) => {
          const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

          return import('./remove-routing.module').then((mod) =>
            $ocLazyLoad.inject(mod.default || mod),
          );
        },
      });
    },
  );

export default moduleName;

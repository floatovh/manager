export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.lock-port', {
    url: '/port/:interfaceId/lock',
    views: {
      modal: {
        component: 'cloudConnectLockPort',
      },
    },
    layout: 'modal',
    translations: {
      value: ['.'],
      format: 'json',
    },
    resolve: {
      interfaceId: /* @ngInject */ ($transition$) =>
        $transition$.params().interfaceId,
      goBack: /* @ngInject */ (goToCloudConnectPage) => goToCloudConnectPage,
    },
  });
};

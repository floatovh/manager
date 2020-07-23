export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.overview.view-service-key', {
    url: '/service-key/:serviceKeyId/view',
    views: {
      modal: {
        component: 'cloudConnectViewServiceKey',
      },
    },
    layout: 'modal',
    translations: {
      value: ['.'],
      format: 'json',
    },
    resolve: {
      serviceKeyId: /* @ngInject */ ($transition$) =>
        $transition$.params().serviceKeyId,
      serviceKey: /* @ngInject */ (cloudConnect) =>
        cloudConnect.getActiveServiceKey(),
      goBack: /* @ngInject */ (goToCloudConnectPage) => goToCloudConnectPage,
    },
  });
};

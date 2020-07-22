export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.regenerate-service-key', {
    url: '/service-key/:serviceKeyId/regenerate',
    views: {
      modal: {
        component: 'cloudConnectRegenerateServiceKey',
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
        cloudConnect.getServiceKey(),
      goBack: /* @ngInject */ (goToCloudConnectPage) => goToCloudConnectPage,
    },
  });
};

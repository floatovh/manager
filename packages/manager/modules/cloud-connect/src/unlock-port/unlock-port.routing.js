export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.unlock-port', {
    url: '/port/:interfaceId/unlock',
    views: {
      modal: {
        component: 'cloudConnectUnlockPort',
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

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('cloud-connect.pop-configuration', {
      url: '/pop-configuration',
      views: {
        modal: {
          component: 'cloudConnectPopConfiguration',
        },
      },
      layout: 'modal',
      translations: {
        value: ['.'],
        format: 'json',
      },
      params: {
        interfaceId: null,
      },
      resolve: {
        interfaceId: /* @ngInject */ ($transition$) =>
          $transition$.params().interfaceId,
        popTypes: /* @ngInject */ (cloudConnectService) => cloudConnectService.getPopTypes(),
        goBack: /* @ngInject */ (goToCloudConnectPage) => goToCloudConnectPage
      },
    });
};

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.add-pop', {
    url: '/pop/add',
    views: {
      modal: {
        component: 'cloudConnectAddPopConfiguration',
      },
    },
    layout: 'modal',
    translations: {
      value: ['.'],
      format: 'json',
    },
    params: {
      interfaceId: null,
      isProviderService: false,
    },
    resolve: {
      interfaceId: /* @ngInject */ ($transition$) =>
        $transition$.params().interfaceId,
      isProviderService: /* @ngInject */ ($transition$) =>
        $transition$.params().isProviderService,
      popTypes: /* @ngInject */ (cloudConnectService, isProviderService) =>
        cloudConnectService.getSupportedPopTypes(isProviderService),
      goBack: /* @ngInject */ (goToCloudConnectPage) => goToCloudConnectPage,
    },
  });
};

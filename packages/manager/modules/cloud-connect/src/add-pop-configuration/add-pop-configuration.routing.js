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
      isDirectProduct: false,
    },
    resolve: {
      interfaceId: /* @ngInject */ ($transition$) =>
        $transition$.params().interfaceId,
      isDirectProduct: /* @ngInject */ ($transition$) =>
        $transition$.params().isDirectProduct,
      popTypes: /* @ngInject */ (cloudConnectService, isDirectProduct) =>
        cloudConnectService.getSupportedPopTypes(isDirectProduct),
      goBack: /* @ngInject */ (goToCloudConnectPage) => goToCloudConnectPage,
    },
  });
};

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('cloud-connect.remove-vrack', {
      url: '/remove-vrack',
      views: {
        modal: {
          component: 'cloudConnectRemoveVrack',
        },
      },
      layout: 'modal',
      translations: {
        value: ['.'],
        format: 'json',
      },
      params: {
        vRackId: null,
      },
      resolve: {
        goBack: /* @ngInject */ (goToCloudConnectPage) => goToCloudConnectPage,
        vRackId: /* @ngInject */ ($transition$) => $transition$.params().vRackId,
      },
    });
};

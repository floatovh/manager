export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.remove-pop', {
    url: '/pop/:popId/remove',
    views: {
      modal: {
        component: 'cloudConnectRemovePopConfiguration',
      },
    },
    layout: 'modal',
    translations: {
      value: ['.'],
      format: 'json',
    },
    params: {
      interfaceId: false,
    },
    resolve: {
      popId: /* @ngInject */ ($transition$) =>
        $transition$.params().popId,
      interfaceId: /* @ngInject */ ($transition$) =>
        $transition$.params().interfaceId,
      goBack: /* @ngInject */ (goToCloudConnectPage) => goToCloudConnectPage,
    },
  });
};

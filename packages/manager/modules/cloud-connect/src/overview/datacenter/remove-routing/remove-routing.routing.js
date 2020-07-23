export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.overview.remove-routing', {
    url: '/remove-routing',
    params: {
      datacenterId: null,
      extraId: null,
    },
    views: {
      modal: {
        component: 'cloudConnectRemoveRouting',
      },
    },
    layout: 'modal',
    translations: {
      value: ['.'],
      format: 'json',
    },
    resolve: {
      datacenterId: /* @ngInject */ ($transition$) =>
        $transition$.params().datacenterId,
      extraId: /* @ngInject */ ($transition$) => $transition$.params().extraId,
      goBack: /* @ngInject */ (goToCloudConnectPage) => goToCloudConnectPage,
    },
  });
};

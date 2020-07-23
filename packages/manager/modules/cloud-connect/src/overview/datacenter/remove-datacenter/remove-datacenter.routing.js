export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.overview.remove-datacenter-configuration', {
    url: '/remove-datacenter-configuration',
    params: {
      datacenterId: null,
    },
    views: {
      modal: {
        component: 'cloudConnectRemoveDatacenterConfiguration',
      },
    },
    layout: 'modal',
    translations: {
      value: ['.'],
      format: 'json',
    },
    resolve: {
      goBack: /* @ngInject */ (goToCloudConnectPage) => goToCloudConnectPage,
      datacenterId: /* @ngInject */ ($transition$) =>
        $transition$.params().datacenterId,
    },
  });
};

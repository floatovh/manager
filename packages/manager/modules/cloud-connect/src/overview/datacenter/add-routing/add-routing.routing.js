export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.overview.datacenter-add-routing', {
    url: '/datacenter-add-routing',
    views: {
      modal: {
        component: 'cloudConnectDatacenterAddRouting',
      },
    },
    params: {
      datacenterId: null,
    },
    translations: {
      value: ['.'],
      format: 'json',
    },
    layout: 'modal',
    resolve: {
      goBack: /* @ngInject */ (goToCloudConnectPage) => goToCloudConnectPage,
      datacenterId: /* @ngInject */ ($transition$) =>
        $transition$.params().datacenterId,
    },
  });
};

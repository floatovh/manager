export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.datacenter-add-routing', {
    url: '/datacenter-add-routing',
    views: {
      modal: {
        component: 'cloudConnectDatacenterAddRouting',
      },
    },
    translations: {
      value: ['.'],
      format: 'json',
    },
    layout: 'modal',
    resolve: {
      goBack: /* @ngInject */ (goToCloudConnectPage) => goToCloudConnectPage,
    },
  });
};

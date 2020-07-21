export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.datacenter-add', {
    url: '/datacenter-add',
    views: {
      modal: {
        component: 'cloudConnectDatacenterAdd',
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

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.service-keys', {
    url: '/service-keys',
    component: 'cloudConnectServiceKeys',
    translations: {
      value: ['.'],
      format: 'json',
    },
  });
};

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('cloud-connect.associate-vrack', {
      url: '/associate-vrack',
      component: 'cloudConnectAssociateVrack',
      translations: {
        value: ['.'],
        format: 'json',
      },
      resolve: {},
    });
};

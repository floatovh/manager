export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('cloud-connect.associate-vrack', {
      url: '/associate-vrack',
      views: {
        modal: {
          component: 'cloudConnectAssociateVrack',
        },
      },
      layout: 'modal',
      translations: {
        value: ['.'],
        format: 'json',
      },
      resolve: {
        vRacks: /* @ngInject */ (cloudConnectService) => cloudConnectService.getVracks(),
        goBack: /* @ngInject */ (goToCloudConnectPage) => goToCloudConnectPage
      },
    });
};

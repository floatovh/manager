export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('cloud-connect.associate-vrack', {
      url: '/vrack/associate',
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

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.edit-description', {
    url: '/edit-description',
    params: {
      description: null,
    },
    views: {
      modal: {
        component: 'cloudConnectEditDescription',
      },
    },
    layout: 'modal',
    resolve: {
      description: /* @ngInject */ ($transition$) =>
        $transition$.params().description,
      goBack: /* @ngInject */ (goToCloudConnectPage) => goToCloudConnectPage,
    },
  });
};

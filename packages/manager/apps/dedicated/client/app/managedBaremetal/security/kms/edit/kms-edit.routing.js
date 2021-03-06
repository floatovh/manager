export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.managedBaremetal.security.kms-edit', {
    url: '/kms-edit',
    params: {
      kmsToEdit: null,
    },
    views: {
      modal: {
        component: 'ovhManagerPccSecurityKmsEdit',
      },
    },
    layout: 'modal',
    resolve: {
      kmsToEdit: /* @ngInject */ ($transition$) =>
        $transition$.params().kmsToEdit,
    },
  });
};

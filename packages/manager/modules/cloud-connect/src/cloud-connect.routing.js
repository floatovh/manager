export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect', {
    url: '/cloud-connect/:ovhCloudConnectId',
    component: 'cloudConnect',
    translations: {
      value: ['.'],
      format: 'json',
    },
    resolve: {
      cloudConnectId: /* @ngInject */ ($transition$) =>
        $transition$.params().ovhCloudConnectId,
      cloudConnect: /* @ngInject */ (cloudConnectService, cloudConnectId) =>
        cloudConnectService.getCloudConnect(cloudConnectId),
      user: /* @ngInject */ (OvhApiMe) => OvhApiMe.v6().get().$promise,
      goToAssociateVrackPage: /* @ngInject */ ($state) => () =>
        $state.go('cloud-connect.associate-vrack'),
      goToRemoveVrackPage: /* @ngInject */ ($state) => (vRackId) =>
        $state.go('cloud-connect.remove-vrack', { vRackId }),
      goToUpdateDescriptionPage: /* @ngInject */ ($state) => (description) =>
        $state.go('cloud-connect.edit-description', { description }),
      goToPopConfigurationPage: /* @ngInject */ ($state) => (interfaceId) =>
        $state.go('cloud-connect.pop-configuration', { interfaceId }),
      goToDatacenterAdd: /* @ngInject */ ($state) => (cloudConnect) =>
        $state.go('cloud-connect.datacenter-add', { cloudConnect }),
      goToCloudConnectPage: /* @ngInject */ (
        $state,
        CucCloudMessage,
        cloudConnectId,
      ) => (message = false, type = 'success', reload = false) => {
        const state = 'cloud-connect';
        const promise = $state.go(
          state,
          {
            ovhCloudConnectId: cloudConnectId,
          },
          {
            reload,
          },
        );
        if (message) {
          promise.then(() => CucCloudMessage[type](message, state));
        }
        return promise;
      },
    },
  });
};

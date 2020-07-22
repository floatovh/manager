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
      goToAddPopConfigurationPage: /* @ngInject */ ($state, cloudConnect) => (
        interfaceId,
      ) =>
        $state.go('cloud-connect.add-pop', {
          interfaceId,
          isProviderService: cloudConnect.isProviderService(),
        }),
      goToRemovePopConfigurationPage: /* @ngInject */ (
        $state,
        cloudConnect,
      ) => (interfaceId) =>
        $state.go('cloud-connect.remove-pop', {
          interfaceId,
          popId: cloudConnect.getPopConfiguration(interfaceId).id,
        }),
      goToLockPortPage: /* @ngInject */ ($state) => (interfaceId) =>
        $state.go('cloud-connect.lock-port', { interfaceId }),
      goToUnlockPortPage: /* @ngInject */ ($state) => (interfaceId) =>
        $state.go('cloud-connect.unlock-port', { interfaceId }),
      goToViewServiceKeyPage: /* @ngInject */ ($state, cloudConnect) => () =>
        $state.go('cloud-connect.view-service-key', {
          serviceKeyId: cloudConnect.getServiceKey().id,
        }),
      goToRegenerateServiceKeyPage: /* @ngInject */ (
        $state,
        cloudConnect,
      ) => () =>
        $state.go('cloud-connect.regenerate-service-key', {
          serviceKeyId: cloudConnect.getServiceKey().id,
        }),
      goToSSendServiceKeyPage: /* @ngInject */ ($state, cloudConnect) => () =>
        $state.go('cloud-connect.send-service-key', {
          serviceKeyId: cloudConnect.getServiceKey().id,
        }),
      goToDatacenterAdd: /* @ngInject */ ($state) => () =>
        $state.go('cloud-connect.datacenter-add'),
      goToDatacenterAddRouting: /* @ngInject */ ($state) => (datacenterId) =>
        $state.go('cloud-connect.datacenter-add-routing', { datacenterId }),
      goToRemoveDatacenterConfiguration: /* @ngInject */ ($state) => (
        datacenterId,
      ) =>
        $state.go('cloud-connect.remove-datacenter-configuration', {
          datacenterId,
        }),
      goToRemoveRouting: /* @ngInject */ ($state) => (datacenterId, extraId) =>
        $state.go('cloud-connect.remove-routing', { datacenterId, extraId }),
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

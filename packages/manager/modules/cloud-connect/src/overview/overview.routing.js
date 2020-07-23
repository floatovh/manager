export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.overview', {
    url: '/overview',
    component: 'cloudConnectOverview',
    translations: {
      value: ['.'],
      format: 'json',
    },
    resolve: {
      goToAssociateVrackPage: /* @ngInject */ ($state) => () =>
        $state.go('cloud-connect.overview.associate-vrack'),
      goToRemoveVrackPage: /* @ngInject */ ($state) => (vRackId) =>
        $state.go('cloud-connect.overview.remove-vrack', { vRackId }),
      goToUpdateDescriptionPage: /* @ngInject */ ($state) => (description) =>
        $state.go('cloud-connect.overview.edit-description', { description }),
      goToAddPopConfigurationPage: /* @ngInject */ ($state, cloudConnect) => (
        interfaceId,
      ) =>
        $state.go('cloud-connect.overview.add-pop', {
          interfaceId,
          isDirectService: cloudConnect.isDirectService(),
          allowedPopType: cloudConnect.getAllowedPopType(),
        }),
      goToRemovePopConfigurationPage: /* @ngInject */ (
        $state,
        cloudConnect,
      ) => (interfaceId) =>
        $state.go('cloud-connect.overview.remove-pop', {
          interfaceId,
          popId: cloudConnect.getPopConfiguration(interfaceId).id,
        }),
      goToLockPortPage: /* @ngInject */ ($state) => (interfaceId) =>
        $state.go('cloud-connect.overview.lock-port', { interfaceId }),
      goToUnlockPortPage: /* @ngInject */ ($state) => (interfaceId) =>
        $state.go('cloud-connect.overview.unlock-port', { interfaceId }),
      goToViewServiceKeyPage: /* @ngInject */ (
        $state,
        cloudConnect,
      ) => () => $state.go(
        'cloud-connect.overview.view-service-key',
        { serviceKeyId: cloudConnect.getActiveServiceKey().id },
      ),
      goToRegenerateServiceKeyPage: /* @ngInject */ (
        $state,
        cloudConnect,
      ) => () => $state.go(
        'cloud-connect.overview.regenerate-service-key',
        { serviceKeyId: cloudConnect.getActiveServiceKey().id },
      ),
      goToSendServiceKeyPage: /* @ngInject */ (
        $state,
        cloudConnect,
      ) => () => $state.go(
        'cloud-connect.overview.send-service-key',
        { serviceKeyId: cloudConnect.getActiveServiceKey().id },
      ),
      goToDatacenterAdd: /* @ngInject */ ($state) => () =>
        $state.go('cloud-connect.overview.datacenter-add'),
      goToDatacenterAddRouting: /* @ngInject */ ($state) => (datacenterId) =>
        $state.go('cloud-connect.overview.datacenter-add-routing', { datacenterId }),
      goToRemoveDatacenterConfiguration: /* @ngInject */ ($state) => (
        datacenterId,
      ) =>
        $state.go('cloud-connect.overview.remove-datacenter-configuration', {
          datacenterId,
        }),
      goToRemoveRouting: /* @ngInject */ ($state) => (datacenterId, extraId) =>
        $state.go('cloud-connect.overview.remove-routing', { datacenterId, extraId }),
      goToCloudConnectPage: /* @ngInject */ (
        $state,
        CucCloudMessage,
        cloudConnectId,
      ) => (message = false, type = 'success', reload = false) => {
        const state = 'cloud-connect.overview';
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

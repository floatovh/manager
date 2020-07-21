import get from 'lodash/get';

export default class RemovePopConfigurationCtrl {
  /* @ngInject */
  constructor($translate, cloudConnectService) {
    this.$translate = $translate;
    this.cloudConnectService = cloudConnectService;
  }

  $onInit() {
    this.isLoading = false;
  }

  removePopConfigure() {
    this.isLoading = true;
    this.cloudConnectService
      .removePopConfiguration(
        this.cloudConnectId,
        this.popId,
        this.interfaceId,
      )
      .then(() => this.goBack(null, 'success', true))
      .catch((error) =>
        this.goBack(
          this.$translate.instant('cloud_connect_pop_remove_configuration_error', {
            message: get(error, 'data.message', error.message),
          }),
          'error',
        ),
      )
      .finally(() => {
        this.isLoading = false;
      });
  }
}

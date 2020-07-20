import get from 'lodash/get';

export default class PopConfigurationCtrl {
  /* @ngInject */
  constructor($translate, cloudConnectService) {
    this.$translate = $translate;
    this.cloudConnectService = cloudConnectService;
  }

  $onInit() {
    this.isLoading = false;
  }

  configurePop() {
    this.isLoading = true;
    this.cloudConnectService
      .addPopConfiguration(
        this.cloudConnectId,
        this.interfaceId,
        this.popType.id,
      )
      .then(() => this.goBack(null, 'success', true))
      .catch((error) =>
        this.goBack(
          this.$translate.instant('cloud_connect_pop_add_configuration_error', {
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

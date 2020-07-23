import find from 'lodash/find';
import get from 'lodash/get';

export default class AddPopConfigurationCtrl {
  /* @ngInject */
  constructor($translate, cloudConnectService) {
    this.$translate = $translate;
    this.cloudConnectService = cloudConnectService;
  }

  $onInit() {
    this.isLoading = false;
    this.pop = {};
    this.popType = null;
    if (this.allowedPopType) {
      this.popType = find(this.popTypes, { id: this.allowedPopType.type });
      this.popTypeSelected = this.popType ? true : false;
    }
  }

  configurePop() {
    this.isLoading = true;
    this.cloudConnectService
      .addPopConfiguration(
        this.cloudConnectId,
        this.interfaceId,
        this.popType.id,
        this.pop,
      )
      .then(() => this.goBack(
        this.$translate.instant('cloud_connect_pop_add_configuration_success'),
        'success',
        true,
      ))
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

import get from 'lodash/get';

export default class UnlockPortCtrl {
  /* @ngInject */
  constructor($translate, cloudConnectService) {
    this.$translate = $translate;
    this.cloudConnectService = cloudConnectService;
  }

  $onInit() {
    this.isLoading = false;
  }

  unlockPort() {
    this.isLoading = true;
    this.cloudConnectService
      .unlockInterface(
        this.cloudConnectId,
        this.interfaceId,
      )
      .then(() => this.goBack(
        this.$translate.instant('cloud_connect_pop_unblock_port_success'),
        'success',
        true,
      ))
      .catch((error) =>
        this.goBack(
          this.$translate.instant('cloud_connect_pop_unblock_port_error', {
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

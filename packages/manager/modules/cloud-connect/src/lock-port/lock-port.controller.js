import get from 'lodash/get';

export default class LockPortCtrl {
  /* @ngInject */
  constructor($translate, cloudConnectService) {
    this.$translate = $translate;
    this.cloudConnectService = cloudConnectService;
  }

  $onInit() {
    this.isLoading = false;
  }

  lockPort() {
    this.isLoading = true;
    this.cloudConnectService
      .lockInterface(
        this.cloudConnectId,
        this.interfaceId,
      )
      .then(() => this.goBack(null, 'success', true))
      .catch((error) =>
        this.goBack(
          this.$translate.instant('cloud_connect_pop_block_port_error', {
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

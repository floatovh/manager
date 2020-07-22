import get from 'lodash/get';

export default class RemoveVrackCtrl {
  /* @ngInject */
  constructor($translate, cloudConnectService) {
    this.$translate = $translate;
    this.cloudConnectService = cloudConnectService;
  }

  $onInit() {
    this.isLoading = false;
  }

  removeRouting() {
    this.isLoading = true;
    this.cloudConnectService
      .removeRouting(this.cloudConnect, this.datacenterId, this.extraId)
      .then(() => {
        return this.goBack(
          this.$translate.instant('cloud_connect_remove_success'),
          'success',
          true,
        );
      })
      .catch((error) =>
        this.goBack(
          this.$translate.instant('cloud_connect_remove_error', {
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

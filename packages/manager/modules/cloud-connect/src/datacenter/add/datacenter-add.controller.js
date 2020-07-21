import get from 'lodash/get';

export default class CloudConnectEditDescriptionCtrl {
  /* @ngInject */
  constructor($state, $translate, cloudConnectService) {
    this.$state = $state;
    this.$translate = $translate;
    this.cloudConnectService = cloudConnectService;
  }

  create() {
    this.isLoading = true;
    return this.cloudConnectService
      .createDatacenter(this.model, this.cloudConnectId)
      .then(() => {
        return this.goBack(
          this.$translate.instant('cloud_connect_datacenter_add_success'),
          'success',
        );
      })
      .catch((error) =>
        this.goBack(
          this.$translate.instant('cloud_connect_datacenter_add_error', {
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

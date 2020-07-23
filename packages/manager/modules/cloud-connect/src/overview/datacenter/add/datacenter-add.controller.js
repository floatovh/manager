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
      .createDatacenter(this.cloudConnect, {
        ovhBgpArea: this.ovhBgpArea,
        datacenterId: this.datacenter.id,
        subnet: this.subnet,
      })
      .then(() => {
        return this.goBack(
          this.$translate.instant('cloud_connect_datacenter_add_success'),
          'success',
          true,
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

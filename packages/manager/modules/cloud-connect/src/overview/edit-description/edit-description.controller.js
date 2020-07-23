import get from 'lodash/get';

export default class CloudConnectEditDescriptionCtrl {
  /* @ngInject */
  constructor($state, $translate, cloudConnectService) {
    this.$state = $state;
    this.$translate = $translate;
    this.cloudConnectService = cloudConnectService;
  }

  confirm() {
    this.isLoading = true;
    return this.cloudConnectService
      .saveDescription(this.cloudConnectId, this.description)
      .then(() => {
        return this.goBack(
          this.$translate.instant('cloud_connect_edit_description_success'),
          'success',
        );
      })
      .catch((error) =>
        this.goBack(
          this.$translate.instant('cloud_connect_edit_description_error', {
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

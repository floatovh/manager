import get from 'lodash/get';

export default class AssociateVrackCtrl {
  /* @ngInject */
  constructor($translate, cloudConnectService) {
    this.$translate = $translate;
    this.cloudConnectService = cloudConnectService;
  }

  $onInit() {
    this.isLoading = false;
  }

  associateVrack() {
    this.isLoading = true;
    this.cloudConnectService.associateVrack(this.vRack.id, this.cloudConnectId)
    .then(() => {
      this.cloudConnectService.getCloudConnect(this.cloudConnectId)
        .then(cloudConnect => {
          cloudConnect.vrack = this.vRack.id;
        });
      return this.goBack(
        this.$translate.instant('cloud_connect_vrack_associate_success', {
          vRackName: this.vRack.name || this.vRack.id,
        }),
        'success'
      );
    })
    .catch((error) => this.goBack(
      this.$translate.instant('cloud_connect_vrack_associate_error', {
        vRackName: this.vRack.name || this.vRack.id,
        message: get(error, 'data.message', error.message),
      }),
      'error'
    ))
    .finally(() => {
      this.isLoading = false;
    })
  }
}


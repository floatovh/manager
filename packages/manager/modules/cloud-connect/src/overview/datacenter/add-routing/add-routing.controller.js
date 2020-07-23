import get from 'lodash/get';
import { ROUTING_TYPES } from './constants';

export default class CloudConnectEditDescriptionCtrl {
  /* @ngInject */
  constructor($state, $translate, cloudConnectService) {
    this.$state = $state;
    this.$translate = $translate;
    this.cloudConnectService = cloudConnectService;
    this.ROUTING_TYPES = ROUTING_TYPES;
  }

  create() {
    this.isLoading = true;
    return this.cloudConnectService
      .createDatacenterExtra(this.cloudConnect, this.datacenterId, {
        bgpNeighborArea: this.bgpNeighborArea,
        subnet: this.subnet,
        type: this.type.id,
      })
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

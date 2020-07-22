import moment from 'moment';
import { get, map } from 'lodash';

import { GUIDELINK, POP_MAP } from './cloud-connect.constants';

export default class CloudConnectCtrl {
  /* @ngInject */
  constructor($translate, $window, CucCloudMessage, cloudConnectService) {
    this.$translate = $translate;
    this.$window = $window;
    this.CucCloudMessage = CucCloudMessage;
    this.cloudConnectService = cloudConnectService;
    this.$translate = $translate;
    this.GUIDELINK = GUIDELINK;
    this.POP_MAP = POP_MAP;
  }

  $onInit() {
    this.loadMessages();
    this.loadServiceInfo();
    if (this.cloudConnect.vrack) {
      this.loadVrackDetails(this.cloudConnect.vrack);
      this.loadPopConfiguration();
      this.loadInterface();
      this.loadDatacenter();
    }
    if (this.cloudConnect.isProviderService()) {
      this.loadServiceKeys();
    }
  }

  loadMessages() {
    this.CucCloudMessage.unSubscribe('cloud-connect');
    this.messageHandler = this.CucCloudMessage.subscribe('cloud-connect', {
      onMessage: () => this.refreshMessages(),
    });
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }

  loadVrackDetails(vrackId) {
    this.loadingVrack = true;
    this.cloudConnectService
      .getVrackDetails(vrackId)
      .then((vrack) => this.cloudConnect.setVrackName(vrack.name))
      .catch(() => this.cloudConnect.setVrackName(vrackId))
      .finally(() => {
        this.loadingVrack = false;
      });
  }

  loadServiceInfo() {
    this.cloudConnectService
      .getCloudConnectServiceInfo(this.cloudConnectId)
      .then((serviceInfos) => {
        this.serviceInfos = serviceInfos;
        this.serviceInfos.creationDate = moment(
          serviceInfos.creation,
          'YYYY/MM/DD',
        ).format('LL');
      });
  }

  loadPopConfiguration() {
    this.cloudConnectService
      .loadPopConfiguration(this.cloudConnect)
      .then(() => this.loadDatacenterConfiguration())
      .catch((error) =>
        this.CucCloudMessage.error(
          this.$translate.instant('cloud_connect_pop_get_configuration_error', {
            message: get(error, 'data.message', error.message),
          }),
        ),
      );
  }

  loadInterface() {
    this.cloudConnectService.loadInterface(this.cloudConnect).catch((error) =>
      this.CucCloudMessage.error(
        this.$translate.instant('cloud_connect_pop_get_configuration_error', {
          message: get(error, 'data.message', error.message),
        }),
      ),
    );
  }

  loadServiceKeys() {
    this.cloudConnectService.loadServiceKeys(this.cloudConnect).catch((error) =>
      this.CucCloudMessage.error(
        this.$translate.instant('cloud_connect_service_key_get_error', {
          message: get(error, 'data.message', error.message),
        }),
      ),
    );
  }

  loadDatacenter() {
    return this.cloudConnectService
      .getDatacenterList(this.cloudConnect)
      .then((res) => {
        this.datacenters = res;
        return res;
      })
      .catch((error) =>
        this.CucCloudMessage.error(
          this.$translate.instant('cloud_connect_pop_get_configuration_error', {
            message: get(error, 'data.message', error.message),
          }),
        ),
      );
  }

  loadDatacenterConfiguration() {
    map(this.cloudConnect.popIds, (id) => {
      this.cloudConnectService.getDatacenterConfigurationList(
        this.cloudConnect,
        id,
      );
    });
  }

  getBandwidth(bandwidth) {
    const array = bandwidth.split('');
    return `${array[0]} ${this.$translate.instant(
      `cloud_connect_common_${array[1]}`,
    )}`;
  }

  getPopTypeName(typeId) {
    return this.cloudConnectService.getPopTypeName(typeId);
  }

  downloadLOA() {
    this.downloadingLoa = true;
    this.cloudConnectService
      .downloadLOA(this.cloudConnectId)
      .then(url => this.$window.open(url, '_blank', 'noopener'))
      .catch((error) =>
        this.CucCloudMessage.error(
          this.$translate.instant('cloud_connect_loa_download_error', {
            message: get(error, 'data.message', error.message),
          }),
        ),
      )
      .finally(() => {
        this.downloadingLoa = false;
      });
  }
}

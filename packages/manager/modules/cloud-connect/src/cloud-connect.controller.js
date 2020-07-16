import moment from 'moment';
import get from 'lodash/get';

import { GUIDELINK, POP_MAP } from './cloud-connect.constants';

export default class CloudConnectCtrl {
  /* @ngInject */
  constructor($translate, CucCloudMessage, cloudConnectService) {
    this.$translate = $translate;
    this.CucCloudMessage = CucCloudMessage;
    this.cloudConnectService = cloudConnectService;
    this.GUIDELINK = GUIDELINK;
    this.POP_MAP = POP_MAP;
  }

  $onInit() {
    this.loadMessages();
    this.loadServiceInfo();
    if (this.cloudConnect.vrack) {
      this.loadPopConfiguration();
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
      .catch((error) => this.CucCloudMessage.error(
        this.$translate.instant('cloud_connect_get_pop_configuration_error', {
          message: get(error, 'data.message', error.message),
        })
      ));
  }
}

import moment from 'moment';
import { GUIDELINK, POP_MAP } from './cloud-connect.constants';

export default class CloudConnectCtrl {
  /* @ngInject */
  constructor($translate, CucCloudMessage, cloudConnectService) {
    this.CucCloudMessage = CucCloudMessage;
    this.cloudConnectService = cloudConnectService;
    this.$translate = $translate;
    this.GUIDELINK = GUIDELINK;
    this.POP_MAP = POP_MAP;
  }

  $onInit() {
    this.loadMessages();
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

  loadMessages() {
    this.CucCloudMessage.unSubscribe('cloud-connect');
    this.messageHandler = this.CucCloudMessage.subscribe('cloud-connect', {
      onMessage: () => this.refreshMessages(),
    });
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }

  getBandwidth(bandwidth) {
    const array = bandwidth.split('');
    return `${array[0]} ${this.$translate.instant(
      `cloud_connect_common_${array[1]}`,
    )}`;
  }
}

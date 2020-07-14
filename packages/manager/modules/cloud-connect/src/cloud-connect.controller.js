import {
  GUIDELINK,
} from './cloud-connect.constants';

export default class CloudConnectCtrl {
  /* @ngInject */
  constructor(CucCloudMessage) {
    this.CucCloudMessage = CucCloudMessage;
    this.GUIDELINK = GUIDELINK;
  }

  $onInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.CucCloudMessage.unSubscribe('cloud-connect');
    this.messageHandler = this.CucCloudMessage.subscribe(
      'cloud-connect',
      { onMessage: () => this.refreshMessages() },
    );
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }
}


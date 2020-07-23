export default class CloudConnectServiceKeysCtrl {
  /* @ngInject */
  constructor($translate, CucCloudMessage, cloudConnectService) {
    this.$translate = $translate;
    this.CucCloudMessage = CucCloudMessage;
    this.cloudConnectService = cloudConnectService;
  }

  $onInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.CucCloudMessage.unSubscribe('cloud-connect.service-keys');
    this.messageHandler = this.CucCloudMessage.subscribe('cloud-connect.service-keys', {
      onMessage: () => this.refreshMessages(),
    });
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }
}

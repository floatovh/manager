export default class CloudConnectTasksCtrl {
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
    this.CucCloudMessage.unSubscribe('cloud-connect.tasks');
    this.messageHandler = this.CucCloudMessage.subscribe('cloud-connect.tasks', {
      onMessage: () => this.refreshMessages(),
    });
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }
}

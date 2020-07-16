export default class CloudConnectEditDescriptionCtrl {
  /* @ngInject */
  constructor($state, cloudConnectService) {
    this.$state = $state;
    this.cloudConnectService = cloudConnectService;
  }

  goBack() {
    return this.$state.go('^');
  }

  confirm() {
    console.log(this.description);
    return this.cloudConnectService
      .saveDescription(this.cloudConnectId, this.description)
      .then((res) => console.log(res));
  }
}

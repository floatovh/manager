export default class CloudConnectPop {
  constructor(cloudConnectPop) {
    Object.assign(this, cloudConnectPop);
  }

  isActive() {
    return this.status === 'active';
  }

  isInProcess() {
    return this.status === 'init' || this.status === 'toDelete';
  }

  isError() {
    return this.status === 'error';
  }


}

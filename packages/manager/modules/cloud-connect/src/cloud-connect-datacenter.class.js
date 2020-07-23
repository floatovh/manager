export default class CloudConnectDatacenter {
  constructor(datacenterConfiguration) {
    Object.assign(this, datacenterConfiguration);
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

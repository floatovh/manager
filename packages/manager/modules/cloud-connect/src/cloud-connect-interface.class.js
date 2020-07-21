import moment from 'moment';

export default class CloudConnectInterface {
  constructor(cloudConnectInterface) {
    Object.assign(this, cloudConnectInterface);
    this.localeLightLastUpdate = moment(
      this.lightLastUpdate,
      'YYYY/MM/DD',
    ).format('LL');
  }

  isEnabled() {
    return this.status === 'enabled';
  }

  disable() {
    return this.status === 'disabled';
  }

  enable() {
    return this.status === 'enabled';
  }

  isOutgoingLightStatusUp() {
    return this.outgoingLightStatus === 'up';
  }

  isOutgoingLightStatusDown() {
    return this.outgoingLightStatus === 'down';
  }

  isOutgoingLightStatusUnknown() {
    return !this.isOutgoingLightStatusUp() && !this.isOutgoingLightStatusDown();
  }

  isIncomingLightStatusUp() {
    return this.incomingLightStatus === 'up';
  }

  isIncomingLightStatusDown() {
    return this.incomingLightStatus === 'down';
  }

  isIncomingLightStatusUnknown() {
    return !this.isIncomingLightStatusUp() && !this.isIncomingLightStatusDown();
  }
}

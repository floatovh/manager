import moment from 'moment';
import find from 'lodash/find';

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
    this.status === 'disabled';
  }

  enable() {
    this.status === 'enabled';
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

  isTaskPending(tasks) {
    return find(tasks, task => {
      return task.resourceId === this.id && (task.status === 'todo' || task.status === 'doing');
    });
  }
}

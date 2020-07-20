import isEmpty from 'lodash/isEmpty';

import CloudConnectPop from './cloud-connect-pop.class';
import CloudConnectInterface from './cloud-connect-interface.class';

export default class CloudConnect {
  constructor(cloudConnect) {
    Object.assign(this, cloudConnect);
    this.loadingPopConfiguration = false;
    this.loadingInterface = false;
    this.popConfiguration = {};
    this.interfaces = {};
  }

  isVrackAssociated() {
    return !isEmpty(this.vrack);
  }

  isPopConfigured(interfaceId) {
    return !isEmpty(this.popConfiguration) && this.popConfiguration[interfaceId];
  }

  setPopConfiguration(configuration) {
    if (configuration.interfaceId) {
      this.popConfiguration[configuration.interfaceId] = new CloudConnectPop(configuration);
    }
  }

  getPopConfiguration(interfaceId) {
    return this.popConfiguration[interfaceId];
  }

  setLoadingPopConfiguration(loading) {
    this.loadingPopConfiguration = loading;
  }

  isLoadingPopConfiguration() {
    return this.loadingPopConfiguration;
  }

  setInterface(ccInterface) {
    if (ccInterface.id) {
      this.interfaces[ccInterface.id] = new CloudConnectInterface(ccInterface);
    }
  }

  getInterface(interfaceId) {
    return this.interfaces[interfaceId];
  }

  setLoadingInterface(loading) {
    this.loadingInterface = loading;
  }

  isLoadingInterface() {
    return this.loadingInterface;
  }

  isActive() {
    return this.status === 'active';
  }

  isLoadingPop() {
    return this.isLoadingPopConfiguration() || this.isLoadingInterface();
  }
}

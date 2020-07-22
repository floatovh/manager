import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

import CloudConnectPop from './cloud-connect-pop.class';
import CloudConnectInterface from './cloud-connect-interface.class';

export default class CloudConnect {
  constructor(cloudConnect) {
    Object.assign(this, cloudConnect);
    this.datacenterConfigurations = [];
    this.loadingPopConfiguration = false;
    this.loadingInterface = false;
    this.loadingServiceKeys = false;
    this.loadingDatacenterConfig = false;
    this.popConfiguration = {};
    this.interfaces = {};
  }

  isDirectProduct() {
    return this.provider === 'OVHcloud';
  }

  isVrackAssociated() {
    return !isEmpty(this.vrack);
  }

  isPopConfigured(interfaceId) {
    return (
      !isEmpty(this.popConfiguration) && this.popConfiguration[interfaceId]
    );
  }

  setPopConfiguration(configuration) {
    if (configuration.interfaceId) {
      this.popConfiguration[configuration.interfaceId] = new CloudConnectPop(
        configuration,
      );
    }
  }

  removePopConfiguration(interfaceId) {
    if (interfaceId) {
      this.popConfiguration[interfaceId] = null;
    }
  }

  getPopConfiguration(interfaceId) {
    return this.popConfiguration[interfaceId];
  }

  setLoadingPopConfiguration(loading) {
    this.loadingPopConfiguration = loading;
  }

  setLoadingServiceKeys(loading) {
    this.loadingServiceKeys = loading;
  }

  isLoadingServiceKeys() {
    return this.loadingServiceKeys;
  }

  setServiceKeys(serviceKeys) {
    this.serviceKeys = serviceKeys;
  }

  getServiceKeys() {
    return this.serviceKeys;
  }

  getActiveServiceKey() {
    return find(this.getServiceKeys(), { status: 'active' });
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

  setPopIds(ids) {
    this.popIds = ids;
  }

  setDatacenterConfigurations(configuration) {
    this.datacenterConfigurations.push(configuration);
  }

  setLoadingDatacenters(loading) {
    this.loadingDatacenterConfig = loading;
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

  setVrackName(name) {
    this.vrackName = name;
  }
}

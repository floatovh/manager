import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import values from 'lodash/values';

import CloudConnectPop from './cloud-connect-pop.class';
import CloudConnectInterface from './cloud-connect-interface.class';
import CloudConnectDatacenter from './cloud-connect-datacenter.class';

export default class CloudConnect {
  constructor(cloudConnect) {
    Object.assign(this, cloudConnect);
    this.datacenterConfigurations = {};
    this.datacenterConfigurationIds = [];
    this.loadingPopConfiguration = false;
    this.loadingInterface = false;
    this.loadingServiceKeys = false;
    this.loadingDatacenterConfig = false;
    this.popConfiguration = {};
    this.interfaces = {};
  }

  isDirectService() {
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

  isPopConfigurationExists() {
    return !isEmpty(this.popConfiguration);
  }

  getAllowedPopType() {
    if (this.isPopConfigurationExists()) {
      return head(values(this.popConfiguration));
    }

    return null;
  }

  setPopConfiguration(configuration) {
    if (configuration.interfaceId) {
      this.popType = configuration.type;
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
    return find(
      this.getServiceKeys(),
      (key) => key.status === 'active' || key.status === 'doing',
    );
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
    this.datacenterConfigurations[
      configuration.id
    ] = new CloudConnectDatacenter(configuration);
    this.datacenterConfigurationIds.push(configuration.id);
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

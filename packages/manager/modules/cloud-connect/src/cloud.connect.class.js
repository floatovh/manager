import isEmpty from 'lodash/isEmpty';

export default class CloudConnect {
  constructor(cloudConnect) {
    Object.assign(this, cloudConnect);
    this.loadingConfiguration = false;
    this.popConfiguration = {};
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
      this.popConfiguration[configuration.interfaceId] = configuration;
    }
  }

  getPopConfiguration(interfaceId) {
    return this.popConfiguration[interfaceId];
  }

  setLoadingConfiguration(loading) {
    this.loadingConfiguration = loading;
  }

  isLoadingConfiguration() {
    return this.loadingConfiguration;
  }

  isActive() {
    return this.status === 'active';
  }
}

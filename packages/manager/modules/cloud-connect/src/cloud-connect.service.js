import forOwn from 'lodash/forOwn';

export default class CloudConnectService {
  /* @ngInject */
  constructor($cacheFactory, $http, $q) {
    this.$cacheFactory = $cacheFactory;
    this.$http = $http;
    this.$q = $q;
    this.cache = {
      serviceInfo: 'CLOUD_CONNECT_SERVICE_INFOS',
    };
  }

  getCloudConnect(cloudConnectId) {
    if (this.cloudConnect) {
      return this.$q.when(this.cloudConnect);
    }
    return this.$http.get(`/ovhCloudConnect/${cloudConnectId}`).then((res) => {
      this.cloudConnect = res.data;
      return this.cloudConnect;
    });
  }

  getCloudConnectServiceInfo(serviceName) {
    return this.$http
      .get(`/ovhCloudConnect/${serviceName}/serviceInfos`, {
        cache: this.cache.serviceInfo,
      })
      .then((res) => {
        return res.data;
      });
  }

  saveDescription(serviceName, description) {
    return this.$http.put(`/ovhCloudConnect/${serviceName}`, {
      description,
    });
  }

  clearCache() {
    forOwn(this.cache, (cacheName) => {
      const cacheInstance = this.$cacheFactory.get(cacheName);
      if (cacheInstance) {
        cacheInstance.removeAll();
      }
    });
  }
}

import filter from 'lodash/filter';
import forOwn from 'lodash/forOwn';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

export default class CloudConnectService {
  /* @ngInject */
  constructor($cacheFactory, $q, $http, OvhApiVrack) {
    this.$cacheFactory = $cacheFactory,
    this.$q = $q;
    this.$http = $http;
    this.OvhApiVrack = OvhApiVrack;
    this.cache = {
      serviceInfo: 'CLOUD_CONNECT_SERVICE_INFOS',
    };
  }

  getCloudConnect(cloudConnectId) {
    // return this.OvhHttp.get('/ovhCloudConnect/{serviceName}', {
    //   rootPath: 'apiv6',
    //   cache: cache.cloudConnect,
    //   urlParams: {
    //     serviceName: cloudConnectId,
    //   },
    // });
    if(!cloudConnectId) {
      return this.$q.reject('Unknown Cloud Connect');
    } else if(this.cloudConnect && this.cloudConnect.uuid === cloudConnectId) {
      return this.$q.when(this.cloudConnect);
    } else {
      return this.$http.get(`/ovhCloudConnect/${cloudConnectId}`)
        .then((res) => {
          this.cloudConnect = res.data;
          return this.cloudConnect;
        });
    }
  }

  getCloudConnectServiceInfo(serviceName) {
    return this.$http
      .get(`/ovhCloudConnect/${serviceName}/serviceInfos`, {
        cache: this.cache.serviceInfo,
      })
      .then((res) => res.data);
  }

  getVracks() {
    return this.OvhApiVrack.v6().query()
      .$promise.then(vRacks => {
        return this.$q.all(map(
          vRacks,
          vRackId => this.getVrackDetails(vRackId)),
        );
      })
  }

  getVrackDetails(vRackId) {
    return this.OvhApiVrack.v6().get({ serviceName: vRackId })
      .$promise.then(vRack => {
        return {
          name: vRack.name || vRackId,
          id: vRackId,
        }
      });
  }

  getVrackAllowedServices(vRackId) {
    return this.OvhApiVrack.v6()
      .allowedServices({ serviceName: vRackId });
  }

  associateVrack(vRackId, ovhCloudConnectId) {
    return this.$http.post(`/vrack/${vRackId}/ovhCloudConnect`,{
      ovhCloudConnect: ovhCloudConnectId,
    });
  }

  removeVrack(vRackId, ovhCloudConnectId) {
    return this.$http.delete(`/vrack/${vRackId}/ovhCloudConnect/${ovhCloudConnectId}`);
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

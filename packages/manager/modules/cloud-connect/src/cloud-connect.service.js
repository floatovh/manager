import filter from 'lodash/filter';
import forOwn from 'lodash/forOwn';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

import CloudConnect from './cloud.connect.class';

import { POP_TYPES } from './cloud-connect.constants';

export default class CloudConnectService {
  /* @ngInject */
  constructor($cacheFactory, $q, $http, OvhApiVrack) {
    this.$cacheFactory = $cacheFactory,
    this.$q = $q;
    this.$http = $http;
    this.OvhApiVrack = OvhApiVrack;
    this.cache = {
      serviceInfo: 'CLOUD_CONNECT_SERVICE_INFOS',
      popConfiguration: 'CLOUD_CONNECT_POP_CONFIGURATION',
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
          this.cloudConnect = new CloudConnect(res.data);
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

  getPopTypes() {
    return POP_TYPES;
  }

  loadPopConfiguration(cloudConnect) {
    cloudConnect.setLoadingConfiguration(true);
    return this.$http
      .get(`/ovhCloudConnect/${cloudConnect.uuid}/config/pop`, {
        cache: this.cache.popConfiguration,
      })
      .then((res) => {
        return this.$q.all(map(res.data, popConfigId => {
          return this.$http
            .get(`/ovhCloudConnect/${cloudConnect.uuid}/config/pop/${popConfigId}`)
            .then((res) => {
              cloudConnect.setPopConfiguration(res.data);
              return res.data;
            });
        }))
        .then(() => cloudConnect)
        .finally(() => {
          cloudConnect.setLoadingConfiguration(false);
        })
      })
      .finally(() => {
        cloudConnect.setLoadingConfiguration(false);
      });
  }

  addPopConfiguration(ovhCloudConnectId, interfaceId, type) {
    return this.$http
      .post(`/ovhCloudConnect/${ovhCloudConnectId}/config/pop`, {
        type,
        interfaceId,
      })
      .then((res) => {
        this.clearCache(this.cache.popConfiguration);
        return res.data;
      });
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

  clearCache(cacheName) {
    const cacheInstance = this.$cacheFactory.get(cacheName);
    if (cacheInstance) {
      cacheInstance.removeAll();
    }
  }

  clearAllCache() {
    forOwn(this.cache, (cacheName) => {
      this.clearCache(cacheName);
    });
  }
}

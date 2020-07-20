import find from 'lodash/find';
import forOwn from 'lodash/forOwn';
import map from 'lodash/map';

import CloudConnect from './cloud.connect.class';

import { POP_TYPES } from './cloud-connect.constants';

export default class CloudConnectService {
  /* @ngInject */
  constructor($cacheFactory, $q, $http, OvhApiVrack) {
    this.$cacheFactory = $cacheFactory;
    this.$q = $q;
    this.$http = $http;
    this.OvhApiVrack = OvhApiVrack;
    this.POP_TYPES = POP_TYPES;
    this.cache = {
      serviceInfo: 'CLOUD_CONNECT_SERVICE_INFOS',
      popConfigurationList: 'CLOUD_CONNECT_POP_CONFIGURATION_LIST',
      popConfiguration: 'CLOUD_CONNECT_POP_CONFIGURATION',
      interface: 'CLOUD_CONNECT_INTERFACE',
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
    if (!cloudConnectId) {
      return this.$q.reject('Unknown Cloud Connect');
    }
    if (this.cloudConnect && this.cloudConnect.uuid === cloudConnectId) {
      return this.$q.when(this.cloudConnect);
    }
    return this.$http.get(`/ovhCloudConnect/${cloudConnectId}`).then((res) => {
      this.cloudConnect = new CloudConnect(res.data);
      return this.cloudConnect;
    });
  }

  getCloudConnectServiceInfo(serviceName) {
    return this.$http
      .get(`/ovhCloudConnect/${serviceName}/serviceInfos`, {
        cache: this.cache.serviceInfo,
      })
      .then((res) => res.data);
  }

  getVracks() {
    return this.OvhApiVrack.v6()
      .query()
      .$promise.then((vRacks) => {
        return this.$q.all(
          map(vRacks, (vRackId) => this.getVrackDetails(vRackId)),
        );
      });
  }

  getVrackDetails(vRackId) {
    return this.OvhApiVrack.v6()
      .get({ serviceName: vRackId })
      .$promise.then((vRack) => {
        return {
          name: vRack.name || vRackId,
          id: vRackId,
        };
      });
  }

  getVrackAllowedServices(vRackId) {
    return this.OvhApiVrack.v6().allowedServices({ serviceName: vRackId });
  }

  getPopTypes() {
    return this.POP_TYPES;
  }

  getPopTypeName(typeId) {
    const type = find(this.getPopTypes(), type => type.id === typeId);
    return type ? type.name : typeId;
  }

  loadPopConfiguration(cloudConnect) {
    cloudConnect.setLoadingPopConfiguration(true);
    return this.$http
      .get(`/ovhCloudConnect/${cloudConnect.uuid}/config/pop`, {
        cache: this.cache.popConfigurationList,
      })
      .then((res) => {
        return this.$q
          .all(
            map(res.data, (popConfigId) => {
              return this.$http
                .get(
                  `/ovhCloudConnect/${cloudConnect.uuid}/config/pop/${popConfigId}`, {
                  cache: this.cache.popConfiguration,
                })
                .then((config) => {
                  cloudConnect.setPopConfiguration(config.data);
                  return config.data;
                });
            }),
          )
          .then(() => cloudConnect)
          .finally(() => {
            cloudConnect.setLoadingPopConfiguration(false);
          });
      })
      .finally(() => {
        cloudConnect.setLoadingPopConfiguration(false);
      });
  }

  loadInterface(cloudConnect) {
    cloudConnect.setLoadingInterface(true);
    return this.$q
      .all(
        map(cloudConnect.interfaceList, (interfaceId) => {
          return this.$http
            .get(
              `/ovhCloudConnect/${cloudConnect.uuid}/interface/${interfaceId}`, {
              cache: this.cache.interface,
            })
            .then((res) => {
              cloudConnect.setInterface(res.data);
              return res.data;
            });
        }),
      )
      .then(() => cloudConnect)
      .finally(() => {
        cloudConnect.setLoadingInterface(false);
      });
  }

  addPopConfiguration(ovhCloudConnectId, interfaceId, type) {
    return this.$http
      .post(`/ovhCloudConnect/${ovhCloudConnectId}/config/pop`, {
        type,
        interfaceId,
      })
      .then((res) => {
        this.clearCache(this.cache.popConfigurationList);
        this.clearCache(this.cache.popConfiguration);
        return res.data;
      });
  }

  associateVrack(vRackId, ovhCloudConnectId) {
    return this.$http.post(`/vrack/${vRackId}/ovhCloudConnect`, {
      ovhCloudConnect: ovhCloudConnectId,
    });
  }

  removeVrack(vRackId, ovhCloudConnectId) {
    return this.$http.delete(
      `/vrack/${vRackId}/ovhCloudConnect/${ovhCloudConnectId}`,
    );
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

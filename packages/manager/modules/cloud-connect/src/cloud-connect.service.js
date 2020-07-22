import { find, filter, forOwn, map, omit, set } from 'lodash';

import CloudConnect from './cloud.connect.class';

import { POP_TYPES } from './cloud-connect.constants';

export default class CloudConnectService {
  /* @ngInject */
  constructor($cacheFactory, $q, $http, Poller, OvhApiVrack) {
    this.$cacheFactory = $cacheFactory;
    this.$q = $q;
    this.$http = $http;
    this.Poller = Poller;
    this.OvhApiVrack = OvhApiVrack;
    this.POP_TYPES = POP_TYPES;
    this.cache = {
      cloudConnect: this.$cacheFactory('CLOUD_CONNECT'),
      serviceInfo: this.$cacheFactory('CLOUD_CONNECT_SERVICE_INFOS'),
      popConfigurationList: this.$cacheFactory(
        'CLOUD_CONNECT_POP_CONFIGURATION_LIST',
      ),
      popConfiguration: this.$cacheFactory('CLOUD_CONNECT_POP_CONFIGURATION'),
      interface: this.$cacheFactory('CLOUD_CONNECT_INTERFACE'),
      serviceKeys: this.$cacheFactory('SERVICE_KEYS'),
      serviceKeyIds: this.$cacheFactory('SERVICE_KEY_IDS'),
      datacenter: this.$cacheFactory('CLOUD_CONNECT_DATACENTER'),
      datacenterList: this.$cacheFactory('CLOUD_CONNECT_DATACENTER_LIST'),
    };
  }

  getCloudConnect(cloudConnectId) {
    return this.$http
      .get(`/ovhCloudConnect/${cloudConnectId}`, {
        cache: this.cache.cloudConnect,
      })
      .then((res) => {
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

  getAllPopTypes() {
    return this.POP_TYPES;
  }

  getSupportedPopTypes(isProviderService) {
    if (isProviderService) {
      return filter(this.getAllPopTypes(), (type) => type.id !== 'l2');
    }
    return this.getAllPopTypes();
  }

  getPopTypeName(typeId) {
    const type = find(this.getAllPopTypes(), (pop) => pop.id === typeId);
    return type ? type.name : typeId;
  }

  loadPopConfiguration(cloudConnect) {
    cloudConnect.setLoadingPopConfiguration(true);
    return this.$http
      .get(`/ovhCloudConnect/${cloudConnect.uuid}/config/pop`, {
        cache: this.cache.popConfigurationList,
      })
      .then((res) => {
        this.cloudConnect.setPopIds(res.data);
        return this.$q
          .all(
            map(res.data, (popConfigId) => {
              return this.$http
                .get(
                  `/ovhCloudConnect/${cloudConnect.uuid}/config/pop/${popConfigId}`,
                  {
                    cache: this.cache.popConfiguration,
                  },
                )
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
              `/ovhCloudConnect/${cloudConnect.uuid}/interface/${interfaceId}`,
              {
                cache: this.cache.interface,
              },
            )
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

  addPopConfiguration(ovhCloudConnectId, interfaceId, type, pop) {
    let options = {
      type,
      interfaceId,
    };
    if (type === 'l3') {
      options = {
        ...options,
        ...pop,
      };
    }
    return this.$http
      .post(`/ovhCloudConnect/${ovhCloudConnectId}/config/pop`, options)
      .then((task) => this.checkTaskStatus(ovhCloudConnectId, task.data.id))
      .then((res) => {
        this.clearCache(this.cache.popConfigurationList);
        this.clearCache(this.cache.popConfiguration);
        return res.data;
      });
  }

  removePopConfiguration(ovhCloudConnectId, popId) {
    return this.$http
      .delete(`/ovhCloudConnect/${ovhCloudConnectId}/config/pop/${popId}`)
      .then((task) => this.checkTaskStatus(ovhCloudConnectId, task.data.id))
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

  lockInterface(serviceName, interfaceId) {
    return this.$http
      .post(`/ovhCloudConnect/${serviceName}/interface/${interfaceId}/lock`)
      .then((task) => this.checkTaskStatus(serviceName, task.data.id))
      .then(() => this.clearCache(this.cache.interface));
  }

  unlockInterface(serviceName, interfaceId) {
    return this.$http
      .post(`/ovhCloudConnect/${serviceName}/interface/${interfaceId}/unlock`)
      .then((task) => this.checkTaskStatus(serviceName, task.data.id))
      .then(() => this.clearCache(this.cache.interface));
  }

  getServiceKey(serviceName) {
    return this.$http.get(`/ovhCloudConnect/${serviceName}/serviceKey`, {
      cache: this.cache.serviceKey,
    });
  }

  loadServiceKeys(cloudConnect) {
    cloudConnect.setLoadingServiceKeys(true);
    return this.$http
      .get(`/ovhCloudConnect/${cloudConnect.uuid}/serviceKey`, {
        cache: this.cache.serviceKeyIds,
      })
      .then((serviceKeyIds) =>
        this.$q.all(
          map(serviceKeyIds.data, (serviceKeyId) =>
            this.$http
              .get(
                `/ovhCloudConnect/${cloudConnect.uuid}/serviceKey/${serviceKeyId}`,
                {
                  cache: this.cache.serviceKeys,
                },
              )
              .then((serviceKey) => serviceKey.data),
          ),
        ),
      )
      .then((serviceKeys) => cloudConnect.setServiceKeys(serviceKeys))
      .finally(() => {
        cloudConnect.setLoadingServiceKeys(false);
      });
  }

  regenerateServiceKey(serviceName, serviceKeyId) {
    return this.$http.post(`/ovhCloudConnect/${serviceName}/serviceKey/${serviceKeyId}/regenerate`)
    .then(() => this.clearCache(this.cache.serviceKeys));
  }

  sendServiceKey(serviceName, serviceKeyId, email) {
    return this.$http.post(`/ovhCloudConnect/${serviceName}/serviceKey/${serviceKeyId}/send`, {
      email,
    });
  }

  downloadLOA(serviceName) {
    return this.$http.post(`/ovhCloudConnect/${serviceName}/loa`)
    .then(res => res.data);
  }

  createDatacenter(cloudConnect, data) {
    set(data, 'datacenterId', data.datacenter.id);
    omit(data, 'datacenter');
    return this.$http
      .post(
        `/ovhCloudConnect/${cloudConnect.uuid}/config/pop/${cloudConnect.popIds[0]}/datacenter`,
        {
          ...data,
        },
      )
      .then((res) => {
        this.clearCache(this.cache.datacenter);
        return res.data;
      });
  }

  deleteDatacenterConfiguration(serviceName, popId, datacenterId) {
    return this.$http.delete(
      `/ovhCloudConnect/${serviceName}/config/pop/${popId}/datacenter/${datacenterId}`,
    );
  }

  getDatacenterConfigurationList(cloudConnect, popId) {
    cloudConnect.setLoadingDatacenters(true);
    return this.$http
      .get(
        `/ovhCloudConnect/${cloudConnect.uuid}/config/pop/${popId}/datacenter`,
        {
          cache: this.cache.datacenter,
        },
      )
      .then(({ data }) => {
        return this.$q
          .all(
            map(data, (datacenterId) => {
              return this.$http
                .get(
                  `/ovhCloudConnect/${cloudConnect.uuid}/config/pop/${popId}/datacenter/${datacenterId}`,
                )
                .then((res) =>
                  this.cloudConnect.setDatacenterConfigurations(res.data),
                );
            }),
          )
          .finally(() => {
            cloudConnect.setLoadingDatacenters(false);
          });
      });
  }

  getDatacenterList(cloudConnect) {
    return this.$http
      .get(`/ovhCloudConnect/${cloudConnect.uuid}/datacenter`, {
        headers: {
          'X-Pagination-Mode': 'CachedObjectList-Pages',
        },
        cache: this.cache.datacenterList,
      })
      .then((res) => res.data);
  }

  checkTaskStatus(serviceName, taskId) {
    return this.Poller.poll(
      `/ovhCloudConnect/${serviceName}/task/${taskId}`,
      {},
      {
        method: 'get',
        retryMaxAttempts: 10,
        successRule: {
          status: 'done',
        },
      },
    );
  }

  clearCache(cacheName) {
    cacheName.removeAll();
  }

  clearAllCache() {
    forOwn(this.cache, (cacheName) => {
      this.clearCache(cacheName);
    });
  }
}

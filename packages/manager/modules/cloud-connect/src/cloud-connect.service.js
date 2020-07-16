import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

export default class CloudConnectService {
  /* @ngInject */
  constructor($q, $http, OvhApiVrack) {
    // this.$cacheFactory = $cacheFactory,
    this.$q = $q;
    // this.OvhHttp = OvhHttp;
    this.$http = $http;
    this.OvhApiVrack = OvhApiVrack;
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
}

export default class CloudConnectService {
  /* @ngInject */
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  getCloudConnect(cloudConnectId) {
    if(this.cloudConnect) {
      return this.$q.when(this.cloudConnect);
    }
    return this.$http.get(`/ovhCloudConnect/${cloudConnectId}`)
      .then((res) => {
        this.cloudConnect = res.data
        return this.cloudConnect;
      });
  }
}

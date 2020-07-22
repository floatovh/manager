import controller from './remove-datacenter.controller';
import template from './template.html';

export default {
  bindings: {
    cloudConnect: '<',
    datacenterId: '<',
    goBack: '<',
  },
  controller,
  template,
};

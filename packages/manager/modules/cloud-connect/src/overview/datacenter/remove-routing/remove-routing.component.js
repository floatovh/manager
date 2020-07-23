import controller from './remove-routing.controller';
import template from './template.html';

export default {
  bindings: {
    cloudConnect: '<',
    datacenterId: '<',
    extraId: '<',
    goBack: '<',
  },
  controller,
  template,
};

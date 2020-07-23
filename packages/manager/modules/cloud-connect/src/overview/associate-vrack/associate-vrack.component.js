import controller from './associate-vrack.controller';
import template from './template.html';

export default {
  bindings: {
    cloudConnectId: '<',
    goBack: '<',
    vRacks: '<',
  },
  controller,
  template,
};

import controller from './remove-vrack.controller';
import template from './template.html';

export default {
  bindings: {
    cloudConnectId: '<',
    goBack: '<',
    vRackId: '<',
  },
  controller,
  template,
};

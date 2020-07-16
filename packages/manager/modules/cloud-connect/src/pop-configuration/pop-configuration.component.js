import controller from './pop-configuration.controller';
import template from './template.html';

export default {
  bindings: {
    cloudConnectId: '<',
    goBack: '<',
    interfaceId: '<',
    popTypes: '<',
  },
  controller,
  template,
};

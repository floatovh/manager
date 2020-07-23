import controller from './remove-pop-configuration.controller';
import template from './template.html';

export default {
  bindings: {
    cloudConnectId: '<',
    goBack: '<',
    interfaceId: '<',
    popId: '<',
  },
  controller,
  template,
};

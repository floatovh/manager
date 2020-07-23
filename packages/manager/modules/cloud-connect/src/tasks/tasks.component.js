import controller from './tasks.controller';
import template from './template.html';

export default {
  bindings: {
    cloudConnect: '<',
    cloudConnectId: '<',
  },
  controller,
  template,
};

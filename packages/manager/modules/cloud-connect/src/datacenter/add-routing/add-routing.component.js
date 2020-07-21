import controller from './add-routing.controller';
import template from './template.html';

export default {
  bindings: {
    cloudConnect: '<',
    goBack: '<',
  },
  controller,
  template,
};

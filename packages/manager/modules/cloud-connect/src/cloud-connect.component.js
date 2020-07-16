import controller from './cloud-connect.controller';
import template from './template.html';

export default {
  bindings: {
    cloudConnect: '<',
    goToAssociateVrackPage: '<',
    goToRemoveVrackPage: '<',
    user: '<',
  },
  controller,
  template,
};

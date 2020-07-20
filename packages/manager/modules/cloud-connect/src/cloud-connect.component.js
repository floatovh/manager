import controller from './cloud-connect.controller';
import template from './template.html';

export default {
  bindings: {
    cloudConnect: '<',
    cloudConnectId: '<',
    goToAssociateVrackPage: '<',
    goToDatacenterAdd: '<',
    goToRemoveVrackPage: '<',
    goToPopConfigurationPage: '<',
    goToUpdateDescriptionPage: '<',
    user: '<',
  },
  controller,
  template,
};

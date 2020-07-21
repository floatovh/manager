import controller from './cloud-connect.controller';
import template from './template.html';

export default {
  bindings: {
    cloudConnect: '<',
    cloudConnectId: '<',
    goToAssociateVrackPage: '<',
    goToLockPortPage: '<',
    goToAddPopConfigurationPage: '<',
    goToRemovePopConfigurationPage: '<',
    goToDatacenterAdd: '<',
    goToRemoveVrackPage: '<',
    goToUnlockPortPage: '<',
    goToUpdateDescriptionPage: '<',
    user: '<',
  },
  controller,
  template,
};

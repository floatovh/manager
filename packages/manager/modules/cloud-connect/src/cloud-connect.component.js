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
    goToDatacenterAddRouting: '<',
    goToRemoveVrackPage: '<',
    goToUnlockPortPage: '<',
    goToUpdateDescriptionPage: '<',
    goToViewServiceKeyPage: '<',
    goToRegenerateServiceKeyPage: '<',
    goToSSendServiceKeyPage: '<',
    user: '<',
  },
  controller,
  template,
};

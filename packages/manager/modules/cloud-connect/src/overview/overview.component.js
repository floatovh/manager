import controller from './overview.controller';
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
    goToRemoveDatacenterConfiguration: '<',
    goToRemoveRouting: '<',
    goToRemoveVrackPage: '<',
    goToUnlockPortPage: '<',
    goToUpdateDescriptionPage: '<',
    goToViewServiceKeyPage: '<',
    goToRegenerateServiceKeyPage: '<',
    goToSendServiceKeyPage: '<',
    user: '<',
  },
  controller,
  template,
};

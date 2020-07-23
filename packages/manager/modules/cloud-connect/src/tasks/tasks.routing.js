export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.tasks', {
    url: '/tasks',
    component: 'cloudConnectTasks',
    translations: {
      value: ['.'],
      format: 'json',
    },
  });
};

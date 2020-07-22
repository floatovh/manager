import AutoRenew from '../../../../../tools/testcafe/pages/billing/autorenew';
import config from '../../../../../tools/testcafe/config';
import {
  userRole,
  userRoleDisconnect,
} from '../../../../../tools/testcafe/roles/index';
import HubPage from '../../../../../tools/testcafe/pages/hub/hubPage';

const user = userRole(config);

fixture('check hub page')
  .meta({
    team: 'BU.Ops.SU.DigitalTools.Product',
    service: config.allowedServices(['ovh.com-manager', 'ca.ovh.com-manager']),
    type: 'regression',
    severity: 'critical',
    priority: 'high',
    scope: 'hub',
  })
  .beforeEach(async (t) => {
    await t.useRole(user);
  });

test(`go to ${config.dataset.hubProduct} renew page`, async () => {
  const hubPage = new HubPage();
  const autorenew = new AutoRenew();
  await hubPage.confirmCurrentPage();
  await hubPage.selectProductToRenew(config.dataset.hubProduct);
  await autorenew.confirmCurrentPage();
  await AutoRenew.confirmRenewUrlWithProductParameter(
    config.dataset.hubProduct,
  );
}).after(async () => {
  await userRoleDisconnect(config);
});

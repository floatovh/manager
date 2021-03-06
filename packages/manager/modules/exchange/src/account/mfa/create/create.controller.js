export default class ExchangeAccountsMfaCreateController {
  /* @ngInject */
  constructor(
    $translate,
    $q,
    Exchange,
    exchangeAccount,
    messaging,
    navigation,
  ) {
    this.$translate = $translate;
    this.$q = $q;
    this.exchangeAccount = exchangeAccount;
    this.exchangeService = Exchange.value;
    this.messaging = messaging;
    this.navigation = navigation;
  }

  cancel() {
    this.navigation.resetAction();
  }

  submit() {
    this.isLoading = true;

    return this.exchangeAccount
      .createMfaOnAllAccount(this.exchangeService.domain)
      .then(() => {
        this.messaging.writeSuccess(
          this.$translate.instant('exchange_account_mfa_create_success'),
        );
      })
      .catch((error) => {
        this.messaging.writeError(
          this.$translate.instant('exchange_account_mfa_create_error', {
            errorMessage: error.message,
          }),
        );
      })
      .finally(() => this.navigation.resetAction());
  }
}

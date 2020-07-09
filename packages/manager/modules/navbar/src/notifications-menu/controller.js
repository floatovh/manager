import groupBy from 'lodash/groupBy';
import filter from 'lodash/filter';

import { Environment } from '@ovh-ux/manager-config';
import { MAX_NOTIFICATIONS } from './constants';

export default class NotificationsCtrl {
  /* @ngInject */
  constructor(
    $document,
    $element,
    $q,
    $timeout,
    $translate,
    atInternet,
    NavbarNotifications,
    ovhManagerNavbarMenuHeaderBuilder,
    ouiNavbarConfiguration,
    TranslateService,
  ) {
    this.$document = $document;
    this.$element = $element;
    this.$q = $q;
    this.$timeout = $timeout;
    this.$translate = $translate;
    this.atInternet = atInternet;
    this.NavbarBuilder = ovhManagerNavbarMenuHeaderBuilder;
    this.NavbarNotifications = NavbarNotifications;
    this.TranslateService = TranslateService;
    this.translations = ouiNavbarConfiguration.translations;

    this.REGION = Environment.getRegion();
  }

  $onInit() {
    this.isLoading = true;
    this.numberOfActiveNotifications = 0;

    // Will be bind to the click event on $document
    this.readAllNotifications = () => {
      // Automatically set all unread messages to read
      // When we close the notifications menu
      this.NavbarNotifications.readAllNotifications(
        this.getActiveNotifications(),
      ).then(() => {
        this.numberOfActiveNotifications = this.getNumberOfActiveNotifications();
      });

      this.$document.off('click', this.readAllNotifications);
    };

    return this.$translate
      .refresh()
      .then(() =>
        this.$q.all({
          menuTitle: this.getMenuTitle(),
          sublinks: this.getSublinks(),
        }),
      )
      .then(({ menuTitle, sublinks }) => {
        this.NavbarNotifications.setRefreshTime(sublinks);
        this.menuTitle = menuTitle;
        if (sublinks.length > MAX_NOTIFICATIONS) {
          this.sublinks = sublinks.slice(0, MAX_NOTIFICATIONS);
        } else {
          this.sublinks = sublinks;
        }
        this.numberOfActiveNotifications = this.getNumberOfActiveNotifications();
        this.groupedSublinks = groupBy(this.sublinks, 'time');
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  $postLink() {
    // Avoid click propagation inside the menu
    // Since we're binding a click function of the document
    this.$timeout(() => {
      this.$element.on('click', (e) => {
        e.stopPropagation();
      });
    });
  }

  $onDestroy() {
    this.$document.off('click', this.readAllNotifications);
  }

  getActiveNotifications() {
    return filter(this.sublinks, (notification) => notification.isActive);
  }

  getNumberOfActiveNotifications() {
    return filter(this.sublinks, (notification) => notification.isActive)
      .length;
  }

  toggleSublinkAction(toUpdate, linkClicked) {
    this.NavbarNotifications.toggleSublinkAction(toUpdate, linkClicked).then(
      (notification) => {
        this.numberOfActiveNotifications = this.getNumberOfActiveNotifications();
        return notification;
      },
    );
  }

  getMenuTitle() {
    return this.NavbarBuilder.buildMenuHeader(
      this.$translate.instant('navbar_notification_title'),
    );
  }

  getSublinks() {
    return this.NavbarNotifications.getNotifications(
      this.TranslateService.getUserLocale(),
      this.REGION,
    )
      .then((notifications) =>
        notifications.map((notification) =>
          this.NavbarNotifications.constructor.convertToSubLink(notification),
        ),
      )
      .catch(() => undefined);
  }

  onTriggerClick(open) {
    if (open) {
      // Handle the click outside the menu
      this.$document.on('click', this.readAllNotifications);

      this.atInternet.trackClick({
        name: 'navbar::action::notifications',
        type: 'action',
      });
    } else {
      // We unbind the click event in this function
      this.readAllNotifications();
    }
  }
}

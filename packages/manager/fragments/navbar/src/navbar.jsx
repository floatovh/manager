import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { listen } from '@ovh-ux/ufrontend/communication';
import Universes from './universes.jsx';
import Notifications from './notifications.jsx';
import Account from './account.jsx';
import Search from './search.jsx';

function fetchLanguageComponent() {
  return import('./language.jsx').then(({ default: component }) => component);
}

// note: since the language component is dynamically imported
// we need to pass it the i18next instance
function Navbar({
  i18next,
  language,
  user,
  toggleNotifications,
  toggleAccountSidebar,
  changeLocale,
}) {
  const [LanguageMenu, setLanguageMenu] = useState();
  const [searchURL, setSearchURL] = useState();

  useEffect(() => {
    listen(({ id, url }) => {
      if (id === 'navbar.search') {
        setSearchURL(url);
      }
    });
    fetchLanguageComponent().then((component) => {
      setLanguageMenu(component({ language, changeLocale, i18next }));
    });
  }, []);

  return (
    <div className="fragment-navbar">
      <div className="oui-navbar">
        <Universes />
        <div className="oui-navbar-list oui-navbar-list_aside oui-navbar-list_end">
          {searchURL && (
            <div className="oui-navbar-list__item">
              <Search targetURL={searchURL} />
            </div>
          )}
          <div className="oui-navbar-list__item">{LanguageMenu}</div>
          <div className="oui-navbar-list__item">
            <Notifications onToggle={toggleNotifications} />
          </div>
          <div className="oui-navbar-list__item">
            <Account user={user} onToggle={toggleAccountSidebar} />
          </div>
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  i18next: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  toggleNotifications: PropTypes.func.isRequired,
  toggleAccountSidebar: PropTypes.func.isRequired,
  changeLocale: PropTypes.func.isRequired,
};

export default Navbar;
